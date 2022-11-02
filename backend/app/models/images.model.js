const sql = require("./db.js");

// constructor
const Images = function(images) {
  this.image = images.image;
  this.file_original_name = images.file_original_name;
  this.featured = images.featured;
};

Images.create = (newimages, result) => {
  sql.query("INSERT INTO gallery_images SET ?", newimages, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created images: ", { id: res.insertId, ...newimages });
    result(null, { id: res.insertId, ...newimages });
  });
};


Images.findAllFeatured = result => {
    sql.query("SELECT * FROM gallery_images WHERE featured = 1", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("images: ", res);
      result(null, res);
    });
  };

Images.updateById = (id, images, result) => {
    sql.query(
      "UPDATE gallery_images SET featured = ? WHERE id = ?",
      [ images.featured, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {

          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated images: ", { id: id, ...images });
        result(null, { id: id, ...images });
      }
    );
  };  
  



Images.getAll = (title, result) => {
  let query = "SELECT * FROM gallery_images";

  if (title) {
    query += ` WHERE image LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("imagess: ", res);
    result(null, res);
  });
};


Images.remove = (id, result) => {
  sql.query("DELETE FROM gallery_images WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found images with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted images with id: ", id);
    result(null, res);
  });
};

module.exports = Images;
