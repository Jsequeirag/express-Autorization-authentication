const userModel = require("../models/UserModel");
const { roleModel } = require("../models/RoleModel");
const createUser = async (req, res) => {
  try {
    const { userName, email, password, roles } = req.body;
    const rolesFound = await roleModel.find({ name: { $in: roles } });

    /* ---------------------------- creating new user --------------------------- */
    const newUser = new userModel({
      userName,
      email,
      password,
      roles: rolesFound.map((role) => role.id),
    });
    /* --------------------------- encrypting password -------------------------- */
    newUser.password = await userModel.encryptPassword(newUser.password);

    /* --------------------------- saving the new user -------------------------- */
    const savedUser = await newUser.save();
    return res.status(200).json({
      savedUser,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: "500" });
  }
};

module.exports = {
  createUser,
};
