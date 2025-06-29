// routes/dashboard.route.js
import express from "express";
import { getDashboardData } from "../controllers/DashboardController";


const router = express.Router();
router.get("/dashboard", getDashboardData);
export default router;
