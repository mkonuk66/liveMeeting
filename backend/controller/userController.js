let userManager = require("../dataManager/userManager");
let jwt = require("jsonwebtoken");
let coreConfig = require("../config/projectConfig").coreConfig;

var userController = {
  loginControl: (user) => {
    var promise = userManager.getUserByNameAndPassword(user);
    return promise.then((result) => {
      if (result.success) {
        var token = jwt.sign(result.user, coreConfig.secretKey, {
          expiresIn: "1h",
        });
        console.log(`Oluşturulan token ${token}`);
        console.log(`Rol : ${result.user.role}`);
        return {
          success: true,
          message: `${result.user.role},${result.user.name}`,
          token: token,
        };
      } else {
        return {
          success: false,
          message: result.message,
        };
      }
    });
  },
  verifyToken: (token) => {
    try {
      var verification = jwt.verify(token, coreConfig.secretKey);
      if (verification)
        return {
          success: true,
          message: "Geçerli Token!",
          decoded: verification._doc,
        };
      else return { success: false, message: "token ile giriş başarısız" };
    } catch (error) {
      return { success: false, message: `token ile giriş başarısız ${error}` };
    }
  },
  register: (user) => {
    var promise = userManager.addUser(user);
    return promise.then((result) => {
      if (result.success) {
        return { success: true, user: result.user };
      } else {
        return { success: false, message: result.message };
      }
    });
  },
  getAllUser: () => {
    var promise = userManager.getAllUsers();
    return promise.then((users) => {
      if (users.success) {
        return { success: true, users: users.users };
      } else {
        return { success: false, message: users.message };
      }
    });
  },
};
module.exports = userController;
