import productModel from '../models/productModel.js';
import fs from 'fs';
import slugify from 'slugify';
import { parseArgs } from 'util';
import categoryModel from '../models/CategoryModel.js'
import braintree from 'braintree';
import orderModel from '../models/orderModel.js';
import e from 'express';

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: 'kkvt89q4dpmv6bk7',
    publicKey: 'zg2fhbf7qgsj8c8w',
    privateKey: '722ba43fa25e1fec080b4768d7f4e0a2',
  });

export const createProductController = async (req,res) => {
    try{
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        switch(true){
            case !name:
                return res.send({error:"name is required"})
            case !description:
                return res.send({error:"description is required"})
            case !price:
                return res.send({error:"price is required"})
            case !category:
                return res.send({error:"category is required"})
            case !quantity:
                return res.send({error:"quantity is required"})
            case photo && photo.size>1000000:
                return res.send({
                    error:"Photo is required under 1MB"
                })
        }
        const products = new productModel({...req.fields,slug:slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }
        await products.save();
        res.send({
            success:true,
            message:"Product saved successfully",
            products
        });

    }catch(error){
        console.log(error);
        res.send({
            success:false,
            message:"Error in creating product",
            error
        })
    }
}

export const getProductController = async(req,res) => {
    try{
        const products = await productModel.find({}).select("-photo").limit(12).sort({createdAt:-1}).populate("category");
        res.send({
            success:true,
            counTotal : products.length,
            message:"Got all the products successfully",
            products,   
        })
    }catch(error){
        console.log(error);
        res.send({
            success:false,
            message:"Error while getting all the products",
            error
        })
    }
};

export const getSingleProduct = async(req,res) => {
    try{
        const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category");
        res.send({
            success:true,
            message:'Single product fetched',
            product,
        })
    }catch(error){
        console.log(error);
        res.send({
            success:false,
            message:"Error while getting the product",
            error
        })
    }
};

export const getPhotoController = async(req,res) => {
    try{
        const product = await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType);
            return res.send(product.photo.data);
        }

    }catch(error){
        console.log(error);
        res.send({
            success:false,
            message:"Error while getting photo",
            error
        })
    }
}

export const deleteProductController = async(req,res) => {
    try{
        const product = await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.send({
            success:true,
            message:"Deleted the product successfully",
        })
    }catch(error){
        console.log(error);
        res.send({
            success:false,
            message:"Error while deleting",
            error
        })
    }
}

export const updateProductController = async(req,res) => {
    try{
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        switch(true){
            case !name:
                return res.send({error:"name is required"})
            case !description:
                return res.send({error:"description is required"})
            case !price:
                return res.send({error:"price is required"})
            case !category:
                return res.send({error:"category is required"})
            case !quantity:
                return res.send({error:"quantity is required"})
            case photo && photo.size>1000000:
                return res.send({
                    error:"Photo is required under 1MB"
                })
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields,slug:slugify(name)},{new:true}
        )
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }
        await products.save();
        res.send({
            success:true,
            message:"Product updated successfully",
            products
        });

    }catch(error){
        console.log(error);
        res.send({
            success:false,
            message:"Error in updating product",
            error
        })
    }

}

export const productFilterController = async (req,res) => {
    try{
        const {checked,radio} = req.body
        let args = {}
        if(checked.length > 0)
            args.category = checked
        if(radio.length)
            args.price = {$gte: radio[0] ,$lte:radio[1]}
        const products = await productModel.find(args);
        res.send({
            success:true,
            products,
        })
    }
    catch(error){
        console.log(error);
        res.send({
            success:false,
            message:"Error while filtering",
            error
        })
    }

}

export const productCountController = async(req,res) => {
    try{
        const total = await productModel.find({}).estimatedDocumentCount();
        res.send({
            success:true,
            total,
        })
    }catch(error){
        console.log(error);
        res.send({
            success:false,
            message:"Failure in product count controller",
            error
        })
    }
}

export const productListCOntroller = async(req,res) => {
    try{
        const perPage = 6
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select("-photo").skip((page-1)*perPage).sort({createdAt:-1});
        res.send({
            success:true,
            products,
        })
    }
    catch(error){
        console.log(error);
        res.send({
            success:false,
            message:"Error while getting the list",
            error
        })
    }
}

export const searchProductController = async (req,res) => {
    try{
        const {keyword} = req.params;
        const products = await productModel().find({
            $or:[
                {name: {$regex :keyword, $options:"i"}},
                {description: {$regex :keyword, $options:"i"}}

            ]
        }).select("-photo")
        res.json(products);
    }
    catch(error){
        console.log(error);
        res.send({
            success:false,
            message:"Error in searching",
            error
        })
    }
}

export const relatedProductController = async(req,res) => {
    try{
        const {pid,cid} = req.params;
        const products = await productModel.find({
            category:cid,
            _id:{$ne:pid}
        }).select("-photo").limit(3).populate("category");
        res.send({
            success:true,
            products,
        })
    }catch(error){
        console.log(error);
        res.send({
            success:false,
            message:"Error in getting similar products",
            error
        })
    }
}

export const productCategoryController = async(req,res) => {
    try{
        const category = await categoryModel.findOne({slug:req.params.slug})
        const products = await productModel.find({category}).populate('category')
        res.send({
            success:true,
            category,
            products,
        })
    }catch(error){
        console.log(error)
        res.send({
            success:false,
            message:"Error while getting category wise products",
            error
        })
    }
}

export const braintreeTokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          //console.log("Error generating client token:", err);
          res.send(err);
        } else {
          //console.log("Generated client token:", response.clientToken);
          res.send(response);
        }
      });
    } catch (error) {
      console.log("Error in generating Braintree client token:", error);
      res.send({
        success: false,
        message: "Error in generating Braintree client token",
        error,
      });
    }
  };
  
  

export const brainTreePaymentsController = async (req, res) => {
    console.log("did not enter");
    try {
        console.log("in try");
      const { cart, nonce } = req.body;
      let total = 0;
      cart.map((i) => {
        total = total + i.price;
      });
  
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order = new orderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            res.json({ ok: true });
          } else {
            res.send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  