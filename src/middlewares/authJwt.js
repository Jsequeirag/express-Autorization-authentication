const jwt = require("jsonwebtoken");
const config = require("../config");
const userModel = require("../models/UserModel");
const { roleModel } = require("../models/RoleModel");
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "No token provided" });
    const decoded = jwt.verify(token, config.SECRET);
    console.log("token information:", decoded);
    req.userId = decoded.id;
    const user = await userModel.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "no user found" });
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const isModerator = async (req, res, next) => {
  const user = await userModel.findById(req.userId);
  const roles = await roleModel.find({ _id: { $in: user.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name == "moderator") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Rol doesn't authorize" });
};

const isAdmin = async (req, res, next) => {
  const user = await userModel.findById(req.userId);
  const roles = await roleModel.find({ _id: { $in: user.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name == "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Rol doesn't authorize" });
};
module.exports = { verifyToken, isModerator, isAdmin };
