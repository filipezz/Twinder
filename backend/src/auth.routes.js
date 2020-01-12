const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/logout", (req, res) => {
  console.log(req.cookies);
  res.redirect("/");
});

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter"),
  (req, res) => {
    const userId = req.user._id;
    const token = jwt.sign({ id: userId }, "secret");
    res.cookie("token", token);
    res.redirect(`http://localhost:3000/dev/${userId}`);
  }
);

module.exports = router;
