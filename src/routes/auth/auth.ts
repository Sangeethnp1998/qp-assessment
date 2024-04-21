import express,{Request,Response} from "express";
import { comparePassword } from "../../util/util";
import User from "../../model/user/user";
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from "../../util/config";

const router = express.Router();

router.post('/login',async (req : Request, res:Response)=>{
    const {userName, password} = req.body;

    const validUser : any = await User.findOne({ where: { userName : userName} });
    if(validUser === null){
        res.status(404).json({message : 'User not found'})
    }
    
    const isMatch = await comparePassword(password,validUser.password);
    if(!isMatch){
        res.status(401).json({message : 'Unauthorized,please provide right password!!'})
    }
    
    let token  = jwt.sign({userId: validUser.userId ,userName: validUser.userName},JWT_SECRET_KEY,{
        expiresIn:'30m'
    })
    
    res.status(201).json({
        statusCode : 201,
        token:token,
        message:'Logged in successfully'
    })
})

export default router;