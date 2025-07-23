import express from "express";

import {dashboardProducts} from '../controllers/productController.js';
import {productDetails} from '../controllers/productController.js';
import {addProduct} from '../controllers/productController.js';


const router = express.Router()

router.get("/dashboard", dashboardProducts);
router.get("/details", productDetails);
router.post("/addNewProducts", addProduct);

export default router;
