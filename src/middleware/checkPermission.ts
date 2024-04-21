import { NextFunction,Response } from "express";
import User from "../model/user/user";
import Role from "../model/role/role";
import { AuthenticatedRequest } from "./verifyToken";


export const checkPermission = async (req: AuthenticatedRequest ,res: Response, next: NextFunction)=>{
    try {
        const user :any = await User.findOne({
            where:{userName : req.user?.userName},
            include: [Role]
        });
        req.permission = {
            viewPermission : user.Role.dataValues.viewPermission,
            addPermission : user.Role.dataValues.addPermission,
            updatePermission : user.Role.dataValues.updatePermission,
            deletePermission : user.Role.dataValues.deletePermission
        } ;
        next()
    } catch (error: any) {
        res.status(500).send({
            message:`Error occured in verify token - ${error.message}`
        })
    }
}