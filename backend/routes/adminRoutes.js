import express from 'express';
import {
  getDashboardStats,
  getProjectsData,
  getReportsData
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/stats', getDashboardStats);
router.get('/projects', getProjectsData);
router.get('/reports', getReportsData);

export default router;
