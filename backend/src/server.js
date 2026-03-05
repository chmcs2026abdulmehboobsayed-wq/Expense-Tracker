import express from "express";
import dotenv from "dotenv";
import dns from "node:dns";
import cors from "cors";

import connectDB from "./config/db.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/expenses", expenseRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});