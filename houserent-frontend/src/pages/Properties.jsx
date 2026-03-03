// // import "./Properties.css";

// // function Properties() {
// //   const properties = [
// //     {
// //       id: 1,
// //       title: "2BHK Apartment",
// //       location: "Delhi",
// //       price: "₹18,000 / month",
// //       image: "https://theneerajgangaheights.com/wp-content/uploads/2024/10/2bhk.png"
// //     },
// //     {
// //       id: 2,
// //       title: "3BHK Luxury Flat",
// //       location: "Mumbai",
// //       price: "₹35,000 / month",
// //       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSi9mth77FEIjgFUb9UxDkfRJmMJk0tcj0Zw&s"
// //     },
// //     {
// //       id: 3,
// //       title: "1BHK Studio",
// //       location: "Bangalore",
// //       price: "₹12,000 / month",
// //       image: "https://www.booking.com/hotel/in/1bhk-with-lift-401-near-by-techmahindra.en-gb.html"
// //     }
// //   ];

// //   return (
// //     <div className="properties">
// //       <h1>Available Properties</h1>

// //       <div className="property-grid">
// //         {properties.map((property) => (
// //           <div key={property.id} className="property-card">
// //             <img src={property.image} alt={property.title} />
// //             <div className="property-info">
// //               <h3>{property.title}</h3>
// //               <p>{property.location}</p>
// //               <p className="price">{property.price}</p>
// //               <button>View Details</button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Properties;





// // import "./Properties.css";
// // import { useNavigate } from "react-router-dom";

// // function Properties() {
// //   const navigate = useNavigate();

// //   const properties = [
// //     {
// //       id: 1,
// //       title: "2BHK Apartment",
// //       location: "Delhi",
// //       price: "₹18,000 / month",
// //       image: "https://source.unsplash.com/400x300/?apartment",
// //       description: "Spacious 2BHK apartment in central Delhi."
// //     },
// //     {
// //       id: 2,
// //       title: "3BHK Luxury Flat",
// //       location: "Mumbai",
// //       price: "₹35,000 / month",
// //       image: "https://source.unsplash.com/400x300/?flat",
// //       description: "Luxury flat with sea view in Mumbai."
// //     },
// //     {
// //       id: 3,
// //       title: "1BHK Studio",
// //       location: "Bangalore",
// //       price: "₹12,000 / month",
// //       image: "https://source.unsplash.com/400x300/?house",
// //       description: "Affordable studio apartment in Bangalore."
// //     }
// //   ];

// //   return (
// //     <div className="properties">
// //       <h1>Available Properties</h1>

// //       <input
// //   placeholder="Search..."
// //   onChange={(e) => setSearch(e.target.value)}
// // />

// // <button onClick={fetchProperties}>Search</button>
// //       <div className="property-grid">
// //         {properties.map((property) => (
// //           <div key={property.id} className="property-card">
// //             <img src={property.image} alt={property.title} />
// //             <div className="property-info">
// //               <h3>{property.title}</h3>
// //               <p>{property.location}</p>
// //               <p className="price">{property.price}</p>
// //               <button
// //                 onClick={() => navigate(`/properties/${property.id}`)}
// //               >
// //                 View Details
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Properties;


import "./Properties.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Properties() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);

  // ✅ Search & Filter States
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // ✅ Fetch Properties From Backend
  const fetchProperties = async () => {
    const res = await axios.get("http://localhost:5000/api/properties", {
      params: {
        search,
        location,
        minPrice,
        maxPrice,
      },
    });

    setProperties(res.data);
  };

  // ✅ Load Properties On Page Load
  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="properties">
      <h1>Available Properties</h1>

      {/* ✅ SEARCH + FILTER SECTION */}
      <div className="filters">
        <input
          placeholder="Search Title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button onClick={fetchProperties}>
          Apply Filter
        </button>
      </div>

      {/* ✅ PROPERTY GRID */}
      <div className="property-grid">
        {properties.map((property) => (
          <div key={property._id} className="property-card">
            <img src={property.image} alt={property.title} />

            <div className="property-info">
              <h3>{property.title}</h3>
              <p>{property.location}</p>
              <p className="price">₹ {property.price}</p>

              <button
                onClick={() =>
                  navigate(`/properties/${property._id}`)
                }
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Properties;



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function MyProperties() {
//   const [properties, setProperties] = useState([]);
//   const navigate = useNavigate();

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
//     const token = localStorage.getItem("token");

//     await axios.delete(
//       `http://localhost:5000/api/properties/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     alert("Deleted ✅");
//     fetchProperties(); // refresh list
//   };

//   return (
//     <div>
//       <h2>My Properties</h2>

//       <h3>Total Properties: {properties.length}</h3>

//       {properties.length === 0 && (
//         <p>You have not added any properties yet.</p>
//       )}

//       <div>
//         {properties.map((property) => (
//           <div
//             key={property._id}
//             style={{
//               border: "1px solid gray",
//               padding: "15px",
//               marginBottom: "15px",
//             }}
//           >
//             <h3>{property.title}</h3>
//             <p>Price: ₹{property.price}</p>
//             <p>Location: {property.location}</p>

//             {property.image && (
//               <img
//                 src={property.image}
//                 width="200"
//                 alt="property"
//               />
//             )}

//             <br />

//             <button
//               onClick={() =>
//                 navigate(`/edit-property/${property._id}`)
//               }
//             >
//               Edit
//             </button>

//             <button
//               onClick={() => handleDelete(property._id)}
//               style={{ marginLeft: "10px", color: "red" }}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MyProperties;