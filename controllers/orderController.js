import Order from '../models/order.js';

export async function createorder(req,res){

    // if(req.user==null){
    //     res.json(
    //         {
    //             message:"you are not authorized please login"
    //         }
    //     )
    //     return;
    // }

    try{

        const user=req.user
        if(user==null){
            res.status(401).json({message:"Unauthorized"});
            return;
        }

        const orderList=await Order.find().sort({date:-1}).limit(1)

        let newOrderId="CBC00001"

        if(orderList.length!=0){
            let lastOrderIdInString=orderList[0].orderId; 
            let lastOrderIdString=lastOrderIdInString.replace("CBC","");  
            let lastOrderNumber=parseInt(lastOrderIdString);
            let newOrderNumber=lastOrderNumber+1;

            let newOrderNumberInString=newOrderNumber.toString().padStart(7,"0");

            newOrderId="CBC"+newOrderNumberInString;
            
        }
        let customerName=req.body.customerName;
        if(customerName==null)
            {
                customerName=user.firstName+" "+user.lastName;
            }
        
        let phone=req.body.phone;
        if(phone==null){
            phone="not provided";
        }

        const itemsInRequest=req.body.items

        if(itemsInRequest==null){
            res.status(400).json({message:"Items are required to create an order"});
            return;
        }

        if(!Array.isArray(itemsInRequest)){
            res.status(400).json({message:"Items should be an array"});
            return;
        }

        const itemToBeAdded=[];
        let total=0

        
        for(let i=0;i<itemsInRequest.length;i++){
            const item=itemsInRequest[i];

            const product=await Product.findOne({productId:item.productId});
            if(product==null){
                res.status(400).json({
                    code:"not-found",
                    message:`Product with ID ${item.productId} not found`,
                    productId:item.productId
                    })
                return;
                
            }
            if(product.stock<item.quantity){
                res.status(400).json(
                    {
                        code:"stock",
                        message:`Insufficient stock for product ID ${item.productId}`, productId:item.productId, availableStock:product.stock
                    })
                return;
            }

            itemToBeAdded.push({
                productId:product.productId,
                productName:product.productName,
                quantity:item.quantity,
                price:product.price,
                image:product.image[0]
            });

            total+=product.price*item.quantity;
        }

        const newOrder=new Order({
            orderId:newOrderId,
            Items:[itemToBeAdded],
            customerName:customerName,
            email:user.email,
            phone:phone,
            address:req.body.customerAddress,
            total:total,
             
        })

        const savedOrder =await  newOrder.save()

        // for(let i=0;i<itemsToBeAdded.length;i++){
        //     const item=itemsToBeAdded[i];
        //     await Product.updateOne(
        //         {productId:item.productId},
        //         {$inc:{stock:-item.quantity}}
        //     );
        // }

        res.status(201).json(
            {
                message:"Order created successfully",
                order:order
            });

    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }


}

export async function getOrders(req,res){
    if(isAdmin(req)){
        const orders =await Order.find().sort({date:-1});
        res.json(orders);
    }else if(isCustomer(req)){
        const user=req.user;
        const orders=await Order.find({email:user.email}).sort({date:-1});
        res.json(orders);
    }else{
        res.status(403).json(
            {
                message:"Forbidden"
            });
    }
}

export async function updateOrderStatus(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message:"Forbidden"
        });
        return;
    }
    const orderId=req.params.orderId;
    const newStatus=req.body.status;

    try
    {
        await Order.updateOne(
        {orderId:orderId},
        {status:newStatus}
    )

    res.json({
        message:"Order status updated successfully"
    })
    }
            
       
    catch(error){
        res.status(500).json({
            message:"Internal server error"
        });
        return;
    }
    
}