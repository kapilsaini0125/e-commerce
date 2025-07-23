import express from 'express';

import { addAdmin } from '../controllers/adminController.js';
import { newAdmin } from '../controllers/adminController.js';

const router= express.Router();

router.post('/admin', addAdmin);
router.post('/newAdmin', newAdmin);

export default router;