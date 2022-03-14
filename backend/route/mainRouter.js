const express = require("express");
const userModel = require("../model/user");
const Port = require("../config/projectConfig").coreConfig.port;
const userController = require("../controller/userController");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send(`Merhaba!`);
});

router.post("/register", (req, res, next) => {
  var promise = userController.register(req.body);
  promise.then((registerResult) => {
    if (registerResult.success) {
      res.send({
        message: `${registerResult.user.username} kullanıcısı başarılı bir şekilde oluşturuldu.`,
        success: true,
      });
    } else {
      res.send({
        message: `Kullanıcı ekleme esnasında bir hata oluştu. ${registerResult.message}`,
        success: false,
      });
    }
  });
});

router.post("/login", (req, res, next) => {
  var promise = userController.loginControl(req.body);
  promise.then((loginControlResult) => {
    if (loginControlResult.success) {
      res.send({
        token: loginControlResult.token,
        message: loginControlResult.message,
        success: true,
      });
    } else {
      res.send({ message: loginControlResult.message, success: false });
    }
  });
});
module.exports = router;
