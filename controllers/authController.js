import { comaprePassword, hashPassword } from "../helpers/authHelper.js";
import usermodel from "../models/usermodel.js";
import jwt from 'jsonwebtoken';


 export const registerController = async(req,res) =>{
     try{
        const {name,email,password,phone,address,answer} = req.body;
        if(!name)
        {
            return res.send({message:"Name is required"});
        }
        if(!email)
        {
            return res.send({message:"email is required"});
        }
        if(!password)
        {
            return res.send({message:"password is required"});
        }
        if(!phone)
        {
            return res.send({message:"phone is required"});
        }       
        if(!address)
        {
            return res.send({message:"address is required"});
        }
        if(!answer)
        {
            return res.send({message:"answer is requires"});
        }
        //check user 
        const existinguser = await usermodel.findOne({email})
        if(existinguser)
        {
            return res.send({
                success:false,
                message:"Already Registered"
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new usermodel({name,email,password,phone,address,answer}).save();

        res.send({
            success:true,
            message:"User registered successfully",
            user
        })

     }catch(error)
     {
         console.log(error);
         res.send({
             success:false,
             message:'Error in Registration',
             error
         })
     }
 };

//post login
export const loginController = async (req,res) =>{
    try{
        const {email,password} = req.body;
        if(!email)
        {
            return res.send({
                success:false,
                message:'Invalid email'
            })
        }
        if(!password)
        {
            return res.send({
                success:false,
                message:'Invalid password'
            })
        }
        //check user
        const user = await usermodel.findOne({email});
        if(!user)
        {
            return res.send({
                success:false,
                message:'Give correct email',
                error
            })
        }
        const match = await comaprePassword(password,user.password);
        if(!match)
        {
            return res.send({
                success:false,
                message:'Wrong password',
            })
        };
        //token
        const token = jwt.sign({_id:user._id},process.env.jwt_secret,{
            expiresIn: "7d",
        });
        res.send({
            success:true,
            message:"Logged in",
            user: {
                name : user.name,
                email : user.email,
                phone : user.phone,
                address : user.address,
                role : user.role
            },
            token,
        });
    } catch(error)
    {
        console.log(error);
        res.send({
            success:false,
            message:"error in login",
            error
        })
    }
}

//forgot password


export const ForgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.send({ message: "Email is required" }); // Use return to exit the function after sending the response
    }
    if (!answer) {
      return res.send({ message: "Answer is required" }); // Use return to exit the function after sending the response
    }
    if (!newPassword) {
      return res.send({ message: "New password is required" }); // Use return to exit the function after sending the response
    }

    // Check if the user exists and the answer is correct
    const user = await usermodel.findOne({ email, answer });
    if (!user) {
      return res.send({
        success: false,
        message: "Wrong email or answer",
      });
    }

    const hash = await hashPassword(newPassword); // Hash the new password
    await usermodel.findByIdAndUpdate(user._id,{password:newPassword});
    console.log(hash);

    res.send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


//test controller

export const testController = (req,res) => {
    console.log('protected route');
}

export const updateProfileController = async(req,res) => {
    try{
        const {name,email,password,address,phone} = req.body
        const user = await usermodel.findById(req.user._id)

        if (!password || password.length < 6) {
            return res.json({ error: "Password is required with more than 6 characters" });
          }
          
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await usermodel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
          }, { new: true });
          
          res.send({
              success:true,
              message:"Profile Updated",
              updatedUser
          })

    }catch(error){
        console.log(error);
        res.send({
            success:false,
            message:"Error while updating profile",
            error
        })
    }
}
