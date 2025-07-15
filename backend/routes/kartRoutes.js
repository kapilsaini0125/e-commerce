import express from "express";

import {addKart, showKart} from "../controllers/kartController.js";

const router = express.Router();

router.post("/addToKart", addKart);
router.get("/showKart", showKart);   

export default router;