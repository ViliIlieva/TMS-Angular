const jwt = require("./jwt");
const { authCookieName } = require("../app-config");
const { User } = require("../models/user.model");
const { TokenBlacklist } = require("../models/tokenBlacklistModel");

function auth(redirectUnauthenticated = true) {
  
  return function (req, res, next) {
    const token = req.cookies[authCookieName] || "";
    Promise.all([
      jwt.verifyToken(token),
      TokenBlacklist.findOne({ token }),
    ])
      .then(([data, blacklistedToken]) => {
        if (blacklistedToken) {
          return Promise.reject(new Error("blacklisted token"));
        }
        User.findById(data.id).then((user) => {
          req.user = user;
          req.isLogged = true;
          next();
        });
      })
      .catch((err) => {
        if (!redirectUnauthenticated) {
          next();
          return;
        }
        if (
          [
            "token expired",
            "blacklisted token",
            "jwt must be provided",
          ].includes(err.message)
        ) {
          console.error(err);
          res.status(401).send({ message: "Invalid token!" });
          return;
        }
        next(err);
      });
  };
}

module.exports = auth;
