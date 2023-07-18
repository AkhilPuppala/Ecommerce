import express from 'express';
import { brainTreePaymentsController, braintreeTokenController, createProductController, deleteProductController, getPhotoController, getProductController,getSingleProduct,productCategoryController,productCountController,productFilterController,productListCOntroller,relatedProductController,searchProductController,updateProductController } from '../controllers/ProductControllers.js';
import { Admin,requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';

const router = express.Router();

//routes
router.post('/create-product',requireSignIn,Admin,formidable(),createProductController);

//get products
router.get('/get-product',getProductController);

//single product
router.get('/get-product/:slug',getSingleProduct);

//get photo
router.get('/product-photo/:pid',getPhotoController);

//delete product
router.delete('/delete-product/:pid',deleteProductController);

//update product
router.put('/update-product/:pid',requireSignIn,Admin,formidable(),updateProductController);

//filter product
router.post("/product-filters",productFilterController);

//product count
router.get("/product-count",productCountController);

//product per page
router.get('/product-page/:page',productListCOntroller);

//search product
router.get('/search',searchProductController);

//similar products
router.get("/related-product/:pid/:cid",relatedProductController)

//category wise product
router.get('/product-category/:slug',productCategoryController);

//payment routes
//token
router.get('/braintree/token',braintreeTokenController);

//payments
router.post('/braintree/payment',requireSignIn,brainTreePaymentsController);

export default router;