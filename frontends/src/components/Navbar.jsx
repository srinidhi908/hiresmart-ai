import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        padding: "15px 40px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <h2
        style={{
          color: "#2563eb",
          fontWeight: "700",
        }}
      >
        🚀 HireSmart AI
      </h2>

      <div
        style={{
          display: "flex",
          gap: "25px",
        }}
      >
        <Link to="/" style={linkStyle}>
          Home
        </Link>

        <Link to="/applicant" style={linkStyle}>
          Applicant
        </Link>

        <Link to="/recruiter" style={linkStyle}>
          Recruiter
        </Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#333",
  fontWeight: "600",
};

export default Navbar;