import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true,
        unique:true
    },

    name:{
        type:String,
        required:true
    },

    altNames:{
        type:[String],
        default:[],
        required:true
    },

    description:{
        type:String,
        required:true
    },

    images:{
        type:[String],
        default:[],
        required:true
    },
    
    labelPrice:{
        type:Number,
        required:true
    },

    category:{
        type:String,
        required:true
    }
})

const Product=mongoose.model("Product",productSchema);
export default Product 