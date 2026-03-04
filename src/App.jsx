// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Properties from "./pages/Properties";
// import PropertyDetails from "./pages/PropertyDetails";



// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/properties" element={<Properties />} />
//         <Route path="/properties/:id" element={<PropertyDetails />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import AddProperty from "./pages/AddProperty";
import MyProperties from "./pages/MyProperties";
import PropertyDetails from "./pages/PropertyDetails";
import EditProperty from "./pages/EditProperty";

/* ✅ Simple Protected Route */
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    console.log("User already logged in ✅");
  }
}, []);


  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <>
      <Navbar />

      <div className="main-content">
        <Routes>

          {/* Public Routes */}
          <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <MyProperties />
    </ProtectedRoute>
  }
/>
<Route
  path="/edit-property/:id"
  element={
    <ProtectedRoute>
      <EditProperty />
    </ProtectedRoute>
  }
/>
          <Route
  path="/add-property"
  element={
    <ProtectedRoute>
      <AddProperty />
    </ProtectedRoute>
  }
/>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Public Property Pages */}
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />

          {/* Example Protected Route (If Needed Later) */}
          {/* 
          <Route
            path="/add-property"
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            }
          />
          */}

        </Routes>
      </div>
    </>
  );
}

export default App;