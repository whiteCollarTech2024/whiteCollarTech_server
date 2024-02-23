const jwt = require("jsonwebtoken");

const authorizeUser = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  console.log("token", token);
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      console.log("[DEBUG`] JWT Middleware Error :-", err);
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    } else {
      req.userId = decoded.id;
      next();
    }
  });
};

module.exports = authorizeUser;
