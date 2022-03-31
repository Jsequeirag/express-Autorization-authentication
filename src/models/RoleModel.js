const { Schema, model } = require("mongoose");
const ROLES = ["user", "admin", "moderator"];
const rolSchema = new Schema(
  {
    name: String,
  },
  { versionKey: false }
);
const roleModel = model("rol", rolSchema);
module.exports = { roleModel, ROLES };
