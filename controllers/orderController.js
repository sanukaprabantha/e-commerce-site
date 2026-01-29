import Order from '../models/order.js';

export async function createorder(req,res){

    if(req.user==null){
        res.json(
            {
                message:"you are not authorized please login"
            }
        )
        return;
    }

    try{

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
        const newOrder=new Order({
            orderId:newOrderId,
            Items:[],
            customerName:req.body.customerName,
            customerEmail:req.body.customerEmail,
            phone:req.body.phone,
            customerAddress:req.body.customerAddress,
            total:req.body.total,
            status:"Pending"   
        })

        const savedOrder =await  newOrder.save()

        res.status(201).json(
            {
                message:"Order created successfully",
                order:order
            });

    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }


}