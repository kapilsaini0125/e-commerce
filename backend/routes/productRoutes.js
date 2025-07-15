import express from "express";

import {dashboardProducts} from '../controllers/productController.js';
import {productDetails} from '../controllers/productController.js';

const router = express.Router()

router.get("/dashboard", dashboardProducts);
router.get("/details", productDetails)

export default router;
