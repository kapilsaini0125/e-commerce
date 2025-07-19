import express from "express";

import {addKart, showKart, deleteKart, updateKart} from "../controllers/kartController.js";

const router = express.Router();

router.post("/addToKart", addKart);
router.put("/updateKart", updateKart); 
router.get("/showKart", showKart);   
router.delete("/deleteKart/:id", deleteKart)

export default router;