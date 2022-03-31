const userModel = require("../models/UserModel");
const { roleModel } = require("../models/RoleModel");
const jwt = require("jsonwebtoken");
const config = require("../config");

const signUp = async (req, res) => {
  try {
    const { userName, email, password, roles } = req.body;
    const newUser = new userModel({
      userName,
      email,
      password: await userModel.encryptPassword(password),
      roles,
    });
    if (roles) {
      const foundRoles = await roleModel.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((roles) => roles._id);
    } else {
      const role = await roleModel.findOne({ name: "user" }); //findOne->retorna un json //find->retorna un array
      console.log(role);
      newUser.roles = [role._id];
    }
    console.log(newUser);
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, config.SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    res.status(201).json(token);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};
const signIn = async (req, res) => {
  const userFounded = await userModel
    .findOne({ email: req.body.email })
    .populate("roles");
  if (!userFounded) return res.status(400).json({ message: "User not found" });
  const comparePassword = await userModel.comparePassword(
    req.body.password,
    userFounded.password
  );
  if (!comparePassword)
    return res.status(401).json({ token: null, message: "Invalid password" });
  console.log(comparePassword);
  const token = jwt.sign({ id: userFounded._id }, config.SECRET, {
    expiresIn: 86400,
  });
  res.status(200).json({ userFounded, token });
};
module.exports = {
  signUp,
  signIn,
};
