import express from "express";

import {addKart, showKart, deleteKart} from "../controllers/kartController.js";

const router = express.Router();

router.post("/addToKart", addKart);
router.get("/showKart", showKart);   
router.delete("/deleteKart/:id", deleteKart)

export default router;