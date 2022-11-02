module.exports = app => {
  const images = require("../controllers/images.controller.js");


  const multer = require('multer')
  const upload = multer({
    dest: 'uploads/',
    limits: {
      fileSize: 5242880
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
        return cb(new Error('Please upload a Image'))
      }
      cb(undefined, true)
    }
  })

  var router = require("express").Router();

  router.post("/create", upload.array('uploadimages'), images.create);

  router.get("/all-images", images.findAll);

  router.get("/favourite", images.findAllFeatured);

  router.delete("/delete/:id", images.delete);

  router.put("/update/:id", images.update);

  app.use(require('express').static('public'));

  app.use('/uploads', require('express').static('uploads'));

  app.use('/api/module', router);
  
};
