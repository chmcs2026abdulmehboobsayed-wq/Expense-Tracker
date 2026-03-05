import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExpenseCard({ item, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="expense-card">
      <h3>{item.title}</h3>

      <p><strong>₹ {item.amount}</strong></p>

      <p>Category: {item.category}</p>

      <p>Payment: {item.paymentMode}</p>

      <p>
        {item.date
          ? new Date(item.date).toLocaleDateString()
          : ""}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "10px",
        }}
      >
        {/* ✏ EDIT */}
        <Pencil
          size={18}
          style={{ cursor: "pointer", color: "#facc15" }}
          onClick={() => navigate(`/edit/${item._id}`)}
        />

        {/* 🗑 DELETE */}
        <Trash2
          size={18}
          style={{ cursor: "pointer", color: "#e11d48" }}
          onClick={() => onDelete(item._id)}
        />
      </div>
    </div>
  );
}