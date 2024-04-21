import { NextFunction, Request,Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from "../util/config";

export interface AuthenticatedRequest extends Request {
    user?: {userid:number ,userName:string} ,
    permission ?: {
        viewPermission : boolean,
        addPermission : boolean,
        updatePermission : boolean,
        deletePermission : boolean
    }
}

interface Token {
    userId: number,
    userName: string,
    iat: number,
    exp: number
}
export const verifyToken = (req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
    try {
        let token : string = "";
        if(req.headers.authorization){
            token = req.headers.authorization.split(" ")[1];
        }
        else{
            res.status(401).send({
                message:"No token provided!"
            })
        }

        const decodedToken  = jwt.verify(token,JWT_SECRET_KEY) as Token
        req.user = {userid : decodedToken.userId ,userName : decodedToken.userName}
        next();
    } catch (error: any) {
        res.status(500).send({
            message:`Error occured in verify token - ${error.message}`
        })
    }
    
}