import express from "express";
import { addGrocery, availableGroceries, deleteGrocery, listGroceries, updateGrocery } from "../../controller/grocery/groceryController";
import { verifyToken } from "../../middleware/verifyToken";
import { checkPermission } from "../../middleware/checkPermission";
const router = express.Router();

router.get('/list',verifyToken,checkPermission,listGroceries);
router.post('/add',verifyToken,checkPermission,addGrocery);
router.put('/update/:groceryId',verifyToken,checkPermission,updateGrocery);
router.delete('/delete/:groceryId',verifyToken,checkPermission,deleteGrocery)
router.get('/view',verifyToken,checkPermission,availableGroceries)

export default router;