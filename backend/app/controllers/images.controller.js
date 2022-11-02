const Images = require("../models/images.model.js");
const path = require("path");
const fs = require("fs")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if (req.files.length > 0) {
    for (i = 0; i < req.files.length; i++) {
      //extension
      let additionalFiles = "";
      let profile_image_original_name = "";
      if (req.files[i]) {
        const extension = req.files[i]["mimetype"].split('/')[1]
        additionalFiles = req.files[i]["filename"] + '.' + extension
        profile_image_original_name = req.files[i]["originalname"]
      }

      const images = new Images({
        image: additionalFiles,
        file_original_name: profile_image_original_name,
        featured: 0,
      });

      Images.create(images, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the images."
          });
      });

      const currentPath = path.join(process.cwd(), "uploads", req.files[i]["filename"]);
      const destinationPath = path.join(process.cwd(), "uploads/images", additionalFiles);

      const baseUrl = process.cwd() + '/uploads/images'
      fs.mkdirSync(baseUrl, { recursive: true })
      fs.rename(currentPath, destinationPath, function (err) {
        if (err) {
          throw err
        } else {
          console.log("Successfully moved the file!")
        }
      })
    }
    res.send("Successfully Inserted")
  }
};

exports.findAllFeatured = (req, res) => {
    Images.findAllFeatured((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving images."
        });
      else res.send(data);
    });
  };
// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Images.updateById(
    req.params.id,
    new Images(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Images with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Images with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};  

exports.findAll = (req, res) => {
  const title = req.query.title;

  Images.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving imagess."
      });
    else res.send(data);
  });
};


exports.delete = (req, res) => {
    Images.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found images with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete images with id " + req.params.id
        });
      }
    } else res.send({ message: `images was deleted successfully!` });
  });
};