import Expense from "../models/Expense.js";

// CREATE EXPENSE
export const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL EXPENSES
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET EXPENSE BY ID
export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE EXPENSE
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE EXPENSE
export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// TOTAL EXPENSE
export const getTotalExpense = async (req, res) => {
  try {
    const result = await Expense.aggregate([
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$amount" },
        },
      },
    ]);

    const total = result.length > 0 ? result[0].totalExpense : 0;
    res.status(200).json({ totalExpense: total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// MONTHLY EXPENSE
export const getMonthlyExpense = async (req, res) => {
  try {
    const year = parseInt(req.query.year);

    if (!year) {
      return res.status(400).json({ message: "Year is required" });
    }

    const result = await Expense.aggregate([
      { $match: { year } },
      {
        $group: {
          _id: { $month: "$date" },
          totalAmount: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};