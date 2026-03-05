import express from "express";
import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getTotalExpense,
  getMonthlyExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

router.post("/", createExpense);
router.get("/", getExpenses);

// STATIC ROUTES
router.get("/total", getTotalExpense);
router.get("/monthly", getMonthlyExpense);

// DYNAMIC ROUTES
router.get("/:id", getExpenseById);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;