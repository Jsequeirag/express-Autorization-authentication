const { roleModel } = require("../models/RoleModel");
module.exports = async () => {
  try {
    const count = await roleModel.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new roleModel({ name: "user" }).save(),
      new roleModel({ name: "moderator" }).save(),
      new roleModel({ name: "admin" }).save(),
    ]);
    console.log(values);
  } catch (err) {
    console.log(err);
  }
};
