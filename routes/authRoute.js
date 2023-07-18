import express from 'express';
import {registerController,loginController,testController,ForgotPasswordController, updateProfileController} from '../controllers/authController.js';
import { Admin, requireSignIn } from '../middlewares/authMiddleware.js';

//router object
const router = express.Router();
//register || post
router.post('/register',registerController)

//login || post
router.post('/login',loginController);

//test route
router.get('/test',requireSignIn,Admin,testController);

//protected route auth
router.get('/user-auth',requireSignIn,(req,res) => {
    res.send({ok: true});
});

//admin route
router.get('/admin-auth',requireSignIn,Admin,(req,res) => {
    res.send({ok: true});
});

//Forgot password
router.post('/forgot-password',ForgotPasswordController);

//update profile
router.put('/profile',requireSignIn,updateProfileController);
export default router;