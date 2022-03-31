const productSchema = require("../models/ProductModel");
const createProduct = async (req, res) => {
  try {
    const newProducts = new productSchema(req.body); //Simplemente paso el json
    await newProducts.save();
    res.status(201).json(newProducts);
  } catch (e) {
    res.status(500);
  }
};
const getProducts = async (req, res) => {
  try {
    const allProducts = await productSchema.find();

    res.status(200).json(allProducts);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await productSchema.findById(req.params.productId);
    res.json(product);
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};
const updateProductsById = async (req, res) => {
  try {
    const productUptated = await productSchema.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );

    res.status(204).json(productUptated); // status 204 no include response body
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};
const deleteProductsById = async (req, res) => {
  try {
    await productSchema.findByIdAndDelete(req.params.productsId);
    res.status(204).json(productDeleted); // status 204 no include response body
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductsById,
  deleteProductsById,
};
