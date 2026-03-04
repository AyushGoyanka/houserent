// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // function MyProperties() {
// //   const [properties, setProperties] = useState([]);
// //   const navigate = useNavigate();
// //   const fetchProperties = async () => {
// //     try {
// //       const token = localStorage.getItem("token");

// //       const res = await axios.get(
// //         "http://localhost:5000/api/properties/my-properties",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setProperties(res.data);
// //     } catch (error) {
// //       console.log("Error fetching properties");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProperties();
// //   }, []);

// //   return (
// //     <div>
// //       <h2>My Properties Dashboard</h2>

// //       {properties.length === 0 && <p>No Properties Found</p>}

// //       {properties.map((property) => (
// //         <div key={property._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
// //           <h3>{property.title}</h3>
// //           <p>{property.description}</p>
// //           <p>Price: {property.price}</p>
// //           <p>Location: {property.location}</p>
          

// //           {property.image && (
// //             <img
// //               src={property.image}
// //               alt="property"
// //               width="200"
// //             />
// //           )}
// //           <button
// //   onClick={() => navigate(`/edit-property/${property._id}`)}
// //   style={{ marginRight: "10px" }}
// // >
// //   Edit
// // </button>

// //         </div>
// //       ))}
// //       <button
// //   onClick={async () => {
// //     const token = localStorage.getItem("token");

// //     await axios.delete(
// //       `http://localhost:5000/api/properties/${property._id}`,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }
// //     );

// //     alert("Deleted ✅");
// //     window.location.reload();
// //   }}
// // >
// //   Delete
// // </button>
// //     </div>
// //   );
// // }

// // export default MyProperties;




// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function MyProperties() {
//   const [properties, setProperties] = useState([]);
//   const navigate = useNavigate();

//   /* ✅ Fetch Properties */
//   const fetchProperties = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         "http://localhost:5000/api/properties/my-properties",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setProperties(res.data);
//     } catch (error) {
//       console.log("Error fetching properties");
//     }
//   };

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   /* ✅ Delete Property */
//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.delete(
//         `http://localhost:5000/api/properties/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Deleted ✅");

//       // Refresh dashboard after delete
//       fetchProperties();

//     } catch (error) {
//       alert("Delete Failed ❌");
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h2>My Properties Dashboard</h2>

//       {properties.length === 0 && <p>No Properties Found</p>}

//       {properties.map((property) => (
//         <div
//           key={property._id}
//           style={{
//             border: "1px solid gray",
//             margin: "10px",
//             padding: "10px",
//           }}
//         >
//           <h3>{property.title}</h3>
//           <p>{property.description}</p>
//           <p>Price: {property.price}</p>
//           <p>Location: {property.location}</p>

//           {property.image && (
//             <img
//               src={property.image}
//               alt="property"
//               width="200"
//             />
//           )}

//           {/* ✅ Edit Button */}
//           <button
//             onClick={() =>
//               navigate(`/edit-property/${property._id}`)
//             }
//             style={{ marginRight: "10px" }}
//           >
//             Edit
//           </button>

//           {/* ✅ Delete Button */}
//           <button
//             onClick={() => handleDelete(property._id)}
//             style={{ color: "red" }}
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MyProperties;


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ✅ Fetch Properties */
  const fetchProperties = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/properties/my-properties`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProperties(res.data);

    } catch (error) {
      console.log("Error fetching properties ❌", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  /* ✅ Delete Property */
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/properties/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Deleted Successfully ✅");

      // Refresh dashboard
      fetchProperties();

    } catch (error) {
      alert("Delete Failed ❌");
      console.log(error);
    }
  };

  return (
    <div>
      <h2>My Properties Dashboard</h2>

      {loading && <p>Loading...</p>}

      {!loading && properties.length === 0 && (
        <p>No Properties Found</p>
      )}

      {properties.map((property) => (
        <div
          key={property._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{property.title}</h3>
          <p>{property.description}</p>
          <p>Price: {property.price}</p>
          <p>Location: {property.location}</p>

          {property.image && (
            <img
              src={property.image}
              alt="property"
              width="200"
            />
          )}

          {/* ✅ Edit Button */}
          <button
            onClick={() =>
              navigate(`/edit-property/${property._id}`)
            }
            style={{ marginRight: "10px" }}
          >
            Edit
          </button>

          {/* ✅ Delete Button */}
          <button
            onClick={() => handleDelete(property._id)}
            style={{ color: "red" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyProperties;