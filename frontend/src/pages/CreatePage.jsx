import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export default function CreatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "food",
    paymentMode: "cash",
    date: new Date().toISOString(),
  });

  useEffect(() => {
    if (isEdit) {
      const fetchExpense = async () => {
        try {
          const res = await axiosInstance.get(`/expenses/${id}`);
          setForm(res.data);
        } catch (err) {
          toast.error("Failed to load expense");
        }
      };
      fetchExpense();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axiosInstance.put(`/expenses/${id}`, {
          ...form,
          amount: Number(form.amount),
        });
        toast.success("Expense Updated");
      } else {
        await axiosInstance.post("/expenses", {
          ...form,
          amount: Number(form.amount),
          year: new Date(form.date).getFullYear(),
        });
        toast.success("Expense Added");
      }

      navigate("/");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="form-bg">
      <div style={{ width: "320px" }}>
        {/* FORM */}
        <form className="form-card" onSubmit={handleSubmit}>
          
          {/* Heading + Back Button */}
          <div className="flex items-center justify-between mb-3">
            <h2>{isEdit ? "Edit Expense" : "Add Expense"}</h2>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-3 py-1.5 bg-red-500 hover:bg-red-600 
                         text-white text-sm font-semibold 
                         rounded-md transition"
            >
              ← Back
            </button>
          </div>

          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>

          <select
            value={form.paymentMode}
            onChange={(e) =>
              setForm({ ...form, paymentMode: e.target.value })
            }
          >
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
          </select>

          <button type="submit">
            {isEdit ? "Update Expense" : "Save Expense"}
          </button>

        </form>
      </div>
    </div>
  );
}
