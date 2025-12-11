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
  FaUserShield,
  FaUserCircle,
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
  const isLoginPage =
    location.pathname === "/owner/login" ||
    location.pathname === "/worker/login";

  return (
    <>
      <nav className="custom-navbar">
        <div className="navbar-container">
          {/* ⭐ MENU BUTTON ON LEFT ALWAYS (only in dashboards) */}
          {(isOwnerDashboard || isWorkerDashboard) && (
            <button
              className="navbar-menu-btn"
              onClick={() => setMobileSidebarOpen(true)}
              style={{ marginRight: "10px" }}
            >
              ☰
            </button>
          )}

          {/* ⭐ CENTER TITLE LIKE FASTag App */}
          <Link to="/" className="navbar-brand">
            <span>VETTAI FASTAG</span>
          </Link>

          {/* ⭐ RIGHT SIDE ICON (OPTIONAL FUTURE PROFILE) */}
          <FaCar
            className="navbar-profile-icon"
            onClick={() => {
              if (isOwnerDashboard) navigate("/owner/login");
            }}
          />

          {/* ⭐ SHOW ROLE TOGGLE ONLY ON LOGIN PAGES */}
          {!isOwnerDashboard &&
            !isWorkerDashboard &&
            !isOwnerLoggedIn &&
            !isWorkerLoggedIn && (
              <button className="role-toggle-btn" onClick={toggleRole}>
                {role === "owner" ? <FaUserCircle /> : <FaUserShield />}
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
            <h3 className="sidebar-title text-black">Menu</h3>
            <button
              className="close-sidebar-btn"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <FaTimes size={22} />
            </button>
          </div>

          <ul className="sidebar-menu-fastag">
            {/* OWNER MENU */}
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
                  <div className="menu-card fw-bold">
                    <FaTruckLoading className="menu-icon" />
                    <span>Transport</span>
                  </div>
                </li>

                <li
                  onClick={() => {
                    navigate("/owner/dashboard", { state: { open: "search" } });
                    setMobileSidebarOpen(false);
                  }}
                >
                  <div className="menu-card fw-bold">
                    <FaSearch className="menu-icon" />
                    <span>Search Vehicle</span>
                  </div>
                </li>

                <li
                  onClick={() => {
                    navigate("/owner/dashboard", {
                      state: { open: "transactions" },
                    });
                    setMobileSidebarOpen(false);
                  }}
                >
                  <div className="menu-card fw-bold">
                    <FaMoneyBill className="menu-icon" />
                    <span>Transactions</span>
                  </div>
                </li>

                <li
                  onClick={() => {
                    navigate("/owner/dashboard", { state: { open: "worker" } });
                    setMobileSidebarOpen(false);
                  }}
                >
                  <div className="menu-card fw-bold">
                    <FaUserTie className="menu-icon" />
                    <span>Worker Login</span>
                  </div>
                </li>

                <li className="logout-btn-fastag" onClick={handleLogout}>
                  <div className="menu-card logout fw-bold">
                    <FaSignOutAlt className="menu-icon logout" />
                    <span>Logout</span>
                  </div>
                </li>
              </>
            )}

            {/* WORKER MENU */}
            {isWorkerDashboard && (
              <>
                <li
                  onClick={() => {
                    navigate("/worker/dashboard", { state: { open: "banks" } });
                    setMobileSidebarOpen(false);
                  }}
                >
                  <div className="menu-card fw-bold">
                    <FaRegMoneyBillAlt className="menu-icon" />
                    <span>Bank Balances</span>
                  </div>
                </li>

                <li
                  onClick={() => {
                    navigate("/worker/dashboard", {
                      state: { open: "totals" },
                    });
                    setMobileSidebarOpen(false);
                  }}
                >
                  <div className="menu-card fw-bold">
                    <FaMoneyBill className="menu-icon" />
                    <span>Totals Summary</span>
                  </div>
                </li>

                <li
                  onClick={() => {
                    navigate("/worker/dashboard", {
                      state: { open: "transactions" },
                    });
                    setMobileSidebarOpen(false);
                  }}
                >
                  <div className="menu-card fw-bold">
                    <FaSearch className="menu-icon" />
                    <span>View Transactions</span>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
