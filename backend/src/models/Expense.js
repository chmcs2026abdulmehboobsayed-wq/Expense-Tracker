import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["food", "travel", "shopping", "other"],
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["cash", "upi", "card"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);