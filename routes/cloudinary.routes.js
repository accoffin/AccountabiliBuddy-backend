const router = require("express").Router();

const uploader = require("../config/cloudinary.config");

const Celebrity = require("../models/Celebrity.model");

/* Image upload example */
router.post("/image-upload", uploader.single("image"), (req, res, next) => {
  console.log(req.file);
  res.json({ fileURL: req.file.path });
});

// creating Celebrity at the same time as uploading img to Cloudinary(don't use, just an example)
router.post(
  "/celeb-with-img",
  uploader.single("image"),
  async (req, res, next) => {
    console.log(req.body);
    const newCeleb = await Celebrity.create({
      ...req.body,
      imgUrl: req.file.path,
    });
    res.json({ newCeleb });
  }
);

module.exports = router;
