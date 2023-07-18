import jwt from 'jsonwebtoken';
import usermodel from '../models/usermodel.js';


// admin access

const Admin = async (req,res,next) => {
    try{
        const user = await usermodel.findById(req.user._id)
        if(user.role != 1)
        {
            return res.send({
                success : false,
                message : "unauthorized access"
            })
        }
        else
            next();
    }catch(error){
        console.log(error);
        res.send({
            success:false,
            message:"Error in admin middleware",
            error
        })
    }
}

const requireSignIn = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed: No token provided',
      });
    }

    const token = authorizationHeader.split(' ')[1]; // Extract token from Authorization header
    console.log(token);
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed: No token provided',
      });
    }

    const decode = jwt.verify(token, process.env.jwt_secret);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Authentication failed: Invalid token',
    });
  }
};

export {Admin,requireSignIn};