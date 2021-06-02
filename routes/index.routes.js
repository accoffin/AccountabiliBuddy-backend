const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.json({ index: "This is index page" });
});

module.exports = router;
