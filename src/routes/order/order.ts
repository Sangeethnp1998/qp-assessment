import express from "express";
import { createOrder } from "../../controller/order/orderController";
import { verifyToken } from "../../middleware/verifyToken";
import { checkPermission } from "../../middleware/checkPermission";
const router = express.Router();

router.get('/add',verifyToken,checkPermission,createOrder);


export default router;