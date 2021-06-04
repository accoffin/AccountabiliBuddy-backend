const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.json({ index: "This is our landing page" });
});

module.exports = router;
