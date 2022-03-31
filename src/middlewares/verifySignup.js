const userModel = require("../models/UserModel");
const { ROLES } = require("../models/RoleModel");

const checkDuplicateUserOrEmail = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ userName: req.body.userName });
    console.log(user);
    if (user)
      return res.status(400).json({ message: "The user already exists" });

    const email = await userModel.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "the email already exists" });
    next();
  } catch (e) {
    res.status(500).json({ message: error });
    console.log(e);
  }
};
const checkRolesExisted = (req, res, next) => {
  console.log(req.body.roles.length);
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }
  next();
};
module.exports = {
  checkDuplicateUserOrEmail,
  checkRolesExisted,
};
