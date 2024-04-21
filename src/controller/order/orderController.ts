import express,{Request,Response} from "express";
import { AuthenticatedRequest } from "../../middleware/verifyToken";
import Grocery from "../../model/grocery/grocery";
import { Op } from "sequelize";
import Order from "../../model/order/order";

export const createOrder = async (req : AuthenticatedRequest, res : Response) =>{
     try {
        const permission = req.permission?.viewPermission;
        if(permission){
            const orderArr =  req.body ;
            const promiseArray = orderArr.map(async (item :any)=>{
                    try {
                        return (Grocery.findOne({
                            where : { 
                                groceryId : item.groceryId ,
                                [Op.and]: [
                                    { quantity: { [Op.gt]: 0 } }, 
                                    { quantity: { [Op.gt]: item.quantity } }  
                                ]
                            }
                        }))
                       
                    } catch (error) {
                        console.error(error);
                        return
                    }
                
                
            })
            let orderItem :any[] =  [];

           // Waiting for all promises to resolve
            Promise.all(promiseArray)
                .then(async(responses) => {
                    let isError = false
                    for (const [key, data] of responses.entries()){
                        if(!data){
                            //no data some thing wrong with item given or no stock available also the quantity is more
                            isError = true;
                            res.status(500).send({
                                message : 'Something went wrong!!'
                            })
                            break;
                        }
                        else{
                            const newGrocery = await data.decrement('quantity',{by : orderArr[key].quantity });

                            //for getting the updated value
                            await data.reload();

                            let orderItemObj = {
                                groceryId : data.dataValues.groceryId,
                                quantity : data.dataValues.quantity
                            }
                            orderItem.push(orderItemObj)
                        }
                       
                    }
                    if(!isError){
                        let orderObj = {
                            orderItems : JSON.stringify(orderItem)
                        }
                        const order:any = await Order.create(orderObj)
                        res.status(201).json({
                            data : {
                                orderId : order.orderId,
                                data: JSON.parse(order.orderItems.toString('utf8').replace(/\\/g, ''))
                            }
                        })
                    }
                    
                })
                .catch(error => {
                   
                    console.error("Error in adding order:", error);
                });
        }
        else{
            res.status(403).send({
                message : 'Permission denied'
            })}
        }

    catch (error:any) {
        res.status(500).send({
            message:`Error occured in ordering groceries - ${error.message}`
        })
    }
}
