const router = require("express").Router();
const { response } = require("express");
const Celebrity = require("../models/Celebrity.model");

/* GET home page */
router.get("/", async (req, res, next) => {
  const celebrities = await Celebrity.find({}, { name: 1 });
  res.status(200).json({ celebrities });
});

router.get("/:id", async (req, res, next) => {
  const celebrity = await Celebrity.findById(req.params.id);
  res.status(200).json({ celebrity });
});

router.post("/create", async (req, res, next) => {
  Celebrity.create(req.body).then((createdCeleb) => {
    console.log(createdCeleb);
    res.json({ createdCeleb });
  });
});

// creating Celebrity separately from uploading img to Cloudinary
router.post("/celebrity", async (req, res, next) => {
  const newCeleb = await Celebrity.create(req.body);
  res.json({ newCeleb });
});

router.post("/:id/edit", (req, res, next) => {
  const id = req.params.id;
  const { name, occupation, catchphrase } = req.body;
  Celebrity.findByIdAndUpdate(
    id,
    { name, occupation, catchphrase },
    { new: true }
  ).then((response) => {
    console.log("response", response);
    res.json({ celebrity: response });
  });
});

module.exports = router;
