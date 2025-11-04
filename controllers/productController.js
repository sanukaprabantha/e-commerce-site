import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req,res)
{
    if(!isAdmin(req))
    {
        res.status(403).json({
            message:"you are not authorized to create a product"
        })
        return
    }
    try{
        const productData=req.body;
        const product=new Product(productData);

        await product.save();

        res.json({
            message:"product created successfully",
            product:product,
        });
    }catch(err)
    {
        console.error(err);
        res.status(500).json({
            message:"failed to create product",
        })
    }
}


export async function getProduct(req,res)
{
    try{
        const products=await Product.find()
        res.json(products)
    }catch(err){
        console.error(err);
        res.status(500).json({
            message:"Failed to retrieve products"
        })
    }
}

export async function deleteProduct(req,res)
{
    if(!isAdmin(req))
    {
        res.status(403).json({
            message:"you are not authorized to delete a product"
        })
        return;
    }
    try{
        const productId=req.params.productId

        await Product.deleteOne({
            productId:productId
        })

        res.json({
            message:"product deleted successfully"
        });
    }catch(err)
    {
        console.error(err);
        res.status(500).json({
            message:"failed to delete product",
        })
    }
    
}

export async function updateProduct(req,res)
{
    if(!isAdmin(req)){
        res.status(403).json({
            message:"you are not authorized to update a product"
        });
        return;
    }
    try{
        const productId=req.params.productId;
        const updateData=req.body;
        await Product.updateOne(
            {
                productId:productId
            },
            updateData
        );
        res.json({
            message:"Product updated successfully"
        });
    }catch(err)
    {
        console.error(err);
        res.status(500).json({
            message:"failed to update product",
        })
    }
    
}

export async function getProductId(req,res)
{
    try{
        const productId=req.params.productId;
        const product=await Product.findOne(
            {
                productId:productId
            }
        )

        if(productId==null)
        {
            res.status(404).json({
                message:"product not found"
            })
        }
        else{
            res.json(product);
        }
    }catch(err){
        console.error(err);
        res.status(500).json({
            message:"failed to retrive product by Id"
        });
    }
    
}