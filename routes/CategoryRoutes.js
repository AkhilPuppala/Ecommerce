import express from "express";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryControllers.js";
import { Admin, requireSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router();

//routes
//create category
router.post('/create-category',requireSignIn,Admin,createCategoryController);

//update category
router.put('/update-category/:id',requireSignIn,Admin,updateCategoryController);

//get all category
router.get('/get-category',categoryController);

//single category
router.get('/single-category/:slug',singleCategoryController);

//delete category
router.delete('/delete-category/:id',requireSignIn,Admin,deleteCategoryController);
export default router;