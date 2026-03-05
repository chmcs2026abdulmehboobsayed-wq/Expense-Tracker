import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import ExpenseCard from "../components/ExpenseCard";
import toast from "react-hot-toast";

export default function HomePage() {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchExpenses = async () => {
    try {
      const res = await axiosInstance.get("/");
      setExpenses(res.data);
    } catch {
      toast.error("Fetch failed");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmDelete) return;
    try {
      await axiosInstance.delete(`/${deleteId}`);
      setDeleteId(null);
      fetchExpenses();
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put(`/${editing._id}`, editing);
      setEditing(null);
      fetchExpenses();
      toast.success("Updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const total = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  // MONTHLY ANALYSIS
  const monthlyTotals = {};
  expenses.forEach((item) => {
    const month = new Date(item.date).toLocaleString("default", {
      month: "short",
    });
    monthlyTotals[month] =
      (monthlyTotals[month] || 0) + item.amount;
  });

  return (
    <div className="home-container">
      <h1>Personal Expense Tracker</h1>

      <div className="total-card">
        <h2>Total: ₹ {total}</h2>
      </div>

      {/* Monthly Analysis */}
      <div className="monthly-analysis">
        {Object.entries(monthlyTotals).map(([month, amount]) => (
          <div key={month} className="month-card">
            {month}: ₹ {amount}
          </div>
        ))}
      </div>

      {/* Expense Grid */}
      <div className="expense-grid">
        {expenses.map((item) => (
          <ExpenseCard
            key={item._id}
            item={item}
            onEdit={(item) => setEditing(item)}
            onDelete={(id) => setDeleteId(id)}
          />
        ))}
      </div>

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="edit-overlay">
          <div className="form-card">
            <h3 className="text-lg font semibold mb-4">Are you sure you want to delete this Expense? </h3>
            <div className="form-btns">
              <button onClick={handleDelete}>
                Yes Delete
              </button>
              <button onClick={() => setDeleteId(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editing && (
        <div className="edit-overlay">
          <form className="form-card" onSubmit={handleUpdate}>
            <h3>Edit Expense</h3>

            <input
              value={editing.title}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  title: e.target.value,
                })
              }
            />

            <input
              type="number"
              value={editing.amount}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  amount: Number(e.target.value),
                })
              }
            />

            <div className="form-btns">
              <button type="submit">Save</button>
              <button
                type="button"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}