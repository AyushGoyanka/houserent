// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import "./Navbar.css";

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation(); // 👈 Important
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   /* ✅ Check token whenever page changes */
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, [location]); // 👈 Runs every route change

//   /* ✅ Logout */
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo">HouseHunt 🏠</div>

//       <div className={`nav-links ${menuOpen ? "active" : ""}`}>
//         <NavLink to="/" className="nav-item">
//           Home
//         </NavLink>

//         <NavLink to="/properties" className="nav-item">
//           Properties
//         </NavLink>

//         {/* ✅ Show Login/Register if NOT logged in */}
//         {!isLoggedIn && (
//           <>
//             <NavLink to="/login" className="nav-item">
//               Login
//             </NavLink>

//             <NavLink to="/register" className="nav-item register-btn">
//               Register
//             </NavLink>
//           </>
//         )}

//         {/* ✅ Show Logout if Logged In */}
//         {isLoggedIn && (
//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         )}
//       </div>

//       <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
//         {menuOpen ? <FaTimes /> : <FaBars />}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Correct
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* ✅ Check token whenever route changes */
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  /* ✅ Logout */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">HouseHunt 🏠</div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" className="nav-item">
          Home
        </NavLink>

        <NavLink to="/properties" className="nav-item">
          Properties
        </NavLink>

        {!isLoggedIn && (
          <>
            <NavLink to="/login" className="nav-item">
              Login
            </NavLink>

            <NavLink to="/register" className="nav-item register-btn">
              Register
            </NavLink>
          </>
        )}

        {isLoggedIn && (
  <>
    <NavLink to="/add-property" className="nav-item">
      Add Property
    </NavLink>

    <NavLink to="/dashboard" className="nav-item">
      Dashboard
    </NavLink>

    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  </>
)}
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}

export default Navbar;