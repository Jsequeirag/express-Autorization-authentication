const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [{ ref: "rol", type: Schema.Types.ObjectId }],
  },
  { timestamps: true, versionKey: false }
);
userSchema.statics.encryptPassword = async (password) => {
  const saltRounds = await bcrypt.genSalt(10);
  const passwordEncrypted = await bcrypt.hash(password, saltRounds);
  console.log(passwordEncrypted);
  return passwordEncrypted;
};

userSchema.statics.comparePassword = async (password, hashedPassword) => {
  const paswordVerified = await bcrypt.compare(password, hashedPassword);
  return paswordVerified;
};
const userModel = model("user", userSchema);
module.exports = userModel;
