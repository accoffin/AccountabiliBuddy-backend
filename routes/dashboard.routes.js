const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", isLoggedIn, async (req, res, next) => {
  const testString = "this is the dashboard route";
  res
    .status(200)
    .json({ landing: testString })
    .catch((error) => {
      console.log(error, "Promise error");
    });
});


module.exports = router;
