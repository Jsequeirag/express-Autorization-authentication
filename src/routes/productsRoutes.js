const { Router } = require("express");
const productsCtrl = require("../controllers/productsController");
const { authJwt } = require("../middlewares/index");
const router = Router();
router.get(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  productsCtrl.getProducts
);
router.post("/", productsCtrl.createProduct);
router.get(
  "/:productId",
  [authJwt.verifyToken, authJwt.isModerator],
  productsCtrl.getProductById
);
router.put(
  "/:productId",
  [authJwt.isModerator, authJwt.isAdmin],
  productsCtrl.updateProductsById
);
router.delete(
  "/:productsId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtrl.deleteProductsById
);
module.exports = router;
