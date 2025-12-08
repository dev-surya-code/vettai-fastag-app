import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaCar,
  FaMoneyBill,
  FaSearch,
  FaSignOutAlt,
  FaTimes,
  FaTruckLoading,
  FaUserTie,
  FaRegMoneyBillAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import "../css/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [role, setRole] = useState("worker");

  // Detect if user is logged in as owner or worker
  const isOwnerLoggedIn = !!localStorage.getItem("ownerToken");
  const isWorkerLoggedIn = !!localStorage.getItem("workerToken");

  // Detect dashboard type
  const isOwnerDashboard = location.pathname.startsWith("/owner/dashboard");
  const isWorkerDashboard = location.pathname.startsWith("/worker/dashboard");

  const toggleRole = () => {
    const newRole = role === "worker" ? "owner" : "worker";
    setRole(newRole);
    navigate(`/${newRole}/login`);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.clear();
        setMobileSidebarOpen(false);

        navigate("/owner/login");
      }
    });
  };

  return (
    <>
      <nav className="custom-navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <FaCar className="brand-icon" />
            <span>VETTAI FASTAG</span>
          </Link>

          {/* ⭐ SHOW ROLE TOGGLE ONLY ON LOGIN PAGES */}
          {!isOwnerDashboard &&
            !isWorkerDashboard &&
            !isOwnerLoggedIn &&
            !isWorkerLoggedIn && (
              <button className="role-toggle-btn" onClick={toggleRole}>
                <FaUserTie className="toggle-icon" />
                {role === "owner" ? "Worker" : "Owner"}
              </button>
            )}

          {/* ⭐ MENU BUTTON — SHOW INSIDE OWNER OR WORKER DASHBOARD ONLY */}
          {(isOwnerDashboard || isWorkerDashboard) && (
            <button
              className="navbar-menu-btn"
              onClick={() => setMobileSidebarOpen(true)}
            >
              ☰
            </button>
          )}
        </div>
      </nav>

      {/* SIDEBAR */}
      <div
        className={`sidebar-overlay ${mobileSidebarOpen ? "show" : ""}`}
        onClick={(e) => {
          if (e.target.classList.contains("sidebar-overlay")) {
            setMobileSidebarOpen(false);
          }
        }}
      >
        <div className="sidebar-glass animated-sidebar">
          <div className="sidebar-header">
            <h3 className="sidebar-title">Menu</h3>
            <button
              className="close-sidebar-btn"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <FaTimes size={22} />
            </button>
          </div>

          <ul className="sidebar-menu">
            {/* ⭐ OWNER DASHBOARD MENU */}
            {isOwnerDashboard && (
              <>
                <li
                  onClick={() => {
                    navigate("/owner/dashboard", {
                      state: { open: "transport" },
                    });
                    setMobileSidebarOpen(false);
                  }}
                >
                  <FaTruckLoading /> Transport
                </li>

                <li
                  onClick={() => {
                    navigate("/owner/dashboard", { state: { open: "search" } });
                    setMobileSidebarOpen(false);
                  }}
                >
                  <FaSearch /> Search Vehicle
                </li>

                <li
                  onClick={() => {
                    navigate("/owner/dashboard", {
                      state: { open: "transactions" },
                    });
                    setMobileSidebarOpen(false);
                  }}
                >
                  <FaMoneyBill /> Transactions
                </li>

                <li
                  onClick={() => {
                    navigate("/owner/dashboard", { state: { open: "worker" } });
                    setMobileSidebarOpen(false);
                  }}
                >
                  <FaUserTie /> Worker Login
                </li>

                <li className="logout-btn" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </li>
              </>
            )}

            {/* ⭐ WORKER DASHBOARD MENU */}
            {isWorkerDashboard && (
              <>
                <li
                  onClick={() => {
                    navigate("/worker/dashboard", { state: { open: "banks" } });
                    setMobileSidebarOpen(false);
                  }}
                >
                  <FaRegMoneyBillAlt /> Bank Balances
                </li>

                <li
                  onClick={() => {
                    navigate("/worker/dashboard", {
                      state: { open: "totals" },
                    });
                    setMobileSidebarOpen(false);
                  }}
                >
                  <FaMoneyBill /> Totals Summary
                </li>
                <li
                  onClick={() => {
                    navigate("/worker/dashboard", {
                      state: { open: "transactions" },
                    });
                    setMobileSidebarOpen(false);
                  }}
                >
                  <FaSearch /> View Transactions
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
