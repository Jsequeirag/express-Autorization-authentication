/* -------------------------------------------------------------------------- */
/*                                   packages                                 */
/* -------------------------------------------------------------------------- */
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
/* -------------------------------------------------------------------------- */
/*                              archives imported                             */
/* -------------------------------------------------------------------------- */
const pkg = require("../package.json");
const createRoles = require("./libs/initSetup");
/* -------------------------------------------------------------------------- */
/*                                 middleware                                 */
/* -------------------------------------------------------------------------- */
const app = express();
app.use(morgan("dev"));
app.use(express.json());
/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productsRoutes = require("./routes/productsRoutes");
/* ------------------------------- authroutes ------------------------------- */

/* ----------------------------- productsRoutes ----------------------------- */
app.use("/products", productsRoutes);
/* ------------------------------- userRoutes ------------------------------- */
app.use("/user", userRoutes);
/* ------------------------------- authRoutes ------------------------------- */
app.use("/auth", authRoutes);
/* ---------------------------------- index --------------------------------- */
app.get("/", (req, res) => {
  res.json({
    name: pkg.name,
    author: pkg.author,
    description: pkg.description,
    version: pkg.version,
  });
});
/* ------------------------------ server ------------------------------ */
mongoose
  .connect("mongodb://localhost:27017/jwt-authentication-autorizathion", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen("3000", () => {
      console.log("server:3000");
    });
    /* ------------------------------ create roles ------------------------------ */
    createRoles();
  })
  .catch((e) => {
    console.log(e);
  });
