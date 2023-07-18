import react from 'react';
import slugify from 'slugify';
import CategoryModel from '../models/CategoryModel.js';

export const createCategoryController = async (req,res) => {
    try{
        const {name} = req.body;
        if(!name){
            return res.send({message:'Name is required'});
        }
        const existingCategory = await CategoryModel.findOne({name});
        if(existingCategory){
            res.send({
                success:false,
                message:'Category already exists'
            })
        }
        const category = await new CategoryModel({name,slug:slugify(name)}).save();
        res.send({
            success:true,
            message: 'New category created',
            category
        });


    }catch(error){
        console.log(error);
        res.send({
            success:false,
            message: 'Error in category',
            error
        })
    }
};

export const updateCategoryController = async(req,res) => {
    try{
        const {name} = req.body;
        const {id} = req.params;
        const category = await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.send({
            success: true,
            message: 'Category updated successfully',
            category
        })
    }catch(error){
        console.log(error);
        res.send({
            success: false,
            message: 'Error while updating category',
            error
        })
    }

}

export const categoryController = async(req,res) => {
    try{
        const category = await CategoryModel.find({});
        res.send({
            success: true,
            message: 'All categories list',
            category,
        });

    }catch(error){
        console.log(error);
        res.send({
            success: false,
            message: 'Error while getting all categories',
            error
        })
    }
}


export const singleCategoryController = async(req,res) => {
    try{
        const category = await CategoryModel.findOne({slug:req.params.slug});
        res.send({
            success: true,
            message: 'Get single category success',
            category
        })
    }catch(error){
        console.log(error);
        res.send({
            success: false,
            message: "Error while getting the single category",
            error
        });
    };
}

export const deleteCategoryController = async(req,res) => {
    try{
        const {id} = req.params;
        await CategoryModel.findByIdAndDelete(id);
        res.send({
            success: true,
            message: 'Deleted category successfully',
        })
    }catch(error){
        console.log(error);
        res.send({
            success: false,
            message: "Error while deleting category",
            error
        });
    };
}