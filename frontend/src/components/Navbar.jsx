import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <h1 className="logo">PERSONAL EXPENSE TRACKER</h1>
      <Link to="/create" className="web-btn">
        +
      </Link>
    </div>
  );
}