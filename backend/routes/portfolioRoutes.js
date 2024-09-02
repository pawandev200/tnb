// routes/portfolioRoutes.js
import express from "express";
import {
  createPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolioController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createPortfolio).get(isAuthenticated, getPortfolio);
router.route("/:id").put(isAuthenticated, updatePortfolio).delete(isAuthenticated, deletePortfolio);

export default router;
