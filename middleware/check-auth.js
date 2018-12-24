const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_key_yaha_hai_near_to_u_ki");
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
