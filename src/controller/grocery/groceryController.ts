import express,{Request,Response} from "express";
import { AuthenticatedRequest } from "../../middleware/verifyToken";
import Grocery from "../../model/grocery/grocery";
import { Op } from "sequelize";


export const listGroceries = async (req : AuthenticatedRequest,res :Response)=>{
    try {
        const permission = req.permission?.addPermission;
        if(permission){
            const groceries =  await Grocery.findAll(
                {
                    attributes:{exclude: ['groceryId']}
                }
            );
            res.status(201).json({
                message : 'Successfully listed grocery',
                data : groceries
            })
        }
        else{
            res.status(403).send({
                message : 'Permission denied'
            })
        }
    } catch (error:any) {
        res.status(500).send({
            message:`Error occured in listing groceries - ${error.message}`
        })
    }
}
export const addGrocery = async (req : AuthenticatedRequest,res :Response)=>{
    try {
        const permission = req.permission?.addPermission;
        const {groceryName , price, quantity} = req.body
        if(permission){
            const groceryObj = {
                groceryName : groceryName,
                price : price,
                quantity : quantity
            }
            const groceries :any =  await Grocery.create(groceryObj);
          
            res.status(201).json({
                message : 'Successfully added grocery',
                data : groceries
            })
        }
        else{
            res.status(403).send({
                message : 'Permission denied'
            })
        }
    } catch (error:any) {
        res.status(500).send({
            message:`Error occured in adding groceries - ${error.message}`
        })
    }
}
export const updateGrocery = async (req : AuthenticatedRequest,res :Response)=>{
    try {
        const permission = req.permission?.updatePermission;
        const { groceryName , price, quantity } = req.body;
        const { groceryId } = req.params
        if(permission){
            const groceryObj = {
                groceryName : groceryName,
                price : price,
                quantity : quantity
            }
            const groceries : any =  await Grocery.update(groceryObj,{
                where : { groceryId : groceryId }
            });
          
            res.status(201).json({
                message : 'Successfully updated grocery'
            })
        }
        else{
            res.status(403).send({
                message : 'Permission denied'
            })
        }
    } catch (error:any) {
        res.status(500).send({
            message:`Error occured in updating groceries - ${error.message}`
        })
    }
}
export const deleteGrocery = async (req : AuthenticatedRequest,res :Response)=>{
    try {
        const permission = req.permission?.deletePermission;
        const { groceryId } = req.params
        if(permission){
            
            await Grocery.destroy({
                where : { groceryId : groceryId }
            });
          
            res.status(201).json({
                message : 'Successfully deleted grocery'
            })
        }
        else{
            res.status(403).send({
                message : 'Permission denied'
            })
        }
    } catch (error:any) {
        res.status(500).send({
            message:`Error occured in deleting groceries - ${error.message}`
        })
    }
}
export const availableGroceries = async (req : AuthenticatedRequest,res :Response)=>{
    try {
        const permission = req.permission?.viewPermission;
        if(permission){
            const groceries =  await Grocery.findAll(
                {
                    where:{ quantity:{ [Op.gt] : 0} },
                    attributes: { exclude: ['groceryId'] }
                }
            );
            res.status(201).json({
                message : 'Successfully listed grocery',
                data : groceries
            })
        }
        else{
            res.status(403).send({
                message : 'Permission denied'
            })
        }
    } catch (error:any) {
        res.status(500).send({
            message:`Error occured in listing groceries - ${error.message}`
        })
    }
}