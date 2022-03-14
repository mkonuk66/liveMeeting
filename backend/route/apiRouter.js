const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.use((req, res, next) => {
  var token =
    req.body.token || req.param("token") || req.headers["x-access-token"];
  if (token) {
    var verifyResult = userController.verifyToken(token);
    if (verifyResult.success) {
      req.decoded = verifyResult.decoded;
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: verifyResult.message });
    }
  } else {
    return res
      .status(403)
      .send({ success: false, message: "Token bulunamadı!" });
  }
});

router.get("/", (req, res) => {
  res.send({ message: "çalışıyor..." });
});

router.get("/users", (req, res, next) => {
  console.log(`Token sahibi ${req.decoded.username}`);
  var userPromise = userController.getAllUser().then((users) => {
    if (users.success) {
      res.send({ users: users, success: true });
    } else {
      res.send({ message: users.message, success: false });
    }
  });
  console.log("Kullanıcılar getirildi!");
});

module.exports = router;
