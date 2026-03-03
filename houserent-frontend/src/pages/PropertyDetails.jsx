// import { useParams } from "react-router-dom";
// import "./PropertyDetails.css";

// function PropertyDetails() {
//   const { id } = useParams();

//   const properties = [
//     {
//       id: "1",
//       title: "2BHK Apartment",
//       location: "Delhi",
//       price: "₹18,000 / month",
//       image: "https://source.unsplash.com/800x500/?apartment",
//       description:
//         "Spacious 2BHK apartment in central Delhi with parking and security.",
//       phone: "9876543210",
//       email: "owner1@email.com",
//     },
//     {
//       id: "2",
//       title: "3BHK Luxury Flat",
//       location: "Mumbai",
//       price: "₹35,000 / month",
//       image: "https://source.unsplash.com/800x500/?flat",
//       description:
//         "Luxury flat with sea view, gym and swimming pool access.",
//       phone: "9123456780",
//       email: "owner2@email.com",
//     },
//     {
//       id: "3",
//       title: "1BHK Studio",
//       location: "Bangalore",
//       price: "₹12,000 / month",
//       image: "https://source.unsplash.com/800x500/?house",
//       description:
//         "Affordable studio apartment perfect for students.",
//       phone: "9988776655",
//       email: "owner3@email.com",
//     },
//   ];

//   const property = properties.find((p) => p.id === id);

//   if (!property) {
//     return <h2 style={{ padding: "40px" }}>Property Not Found</h2>;
//   }

//   return (
//     <div className="details-container">
//       <img src={property.image} alt={property.title} />
//       <div className="details-info">
//         <h1>{property.title}</h1>
//         <p className="location">{property.location}</p>
//         <p className="price">{property.price}</p>
//         <p className="description">{property.description}</p>

//         <div className="contact-box">
//           <h3>Contact Details</h3>
//           <p>📞 {property.phone}</p>
//           <p>📧 {property.email}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PropertyDetails;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PropertyDetails.css";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/properties/${id}`
        );

        setProperty(res.data);
      } catch (error) {
        console.log("Error fetching property");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

  if (!property) {
    return <h2 style={{ padding: "40px" }}>Property Not Found</h2>;
  }

  return (
    <div className="details-container">
      {/* ✅ Property Image */}
      {property.image && (
        <img src={property.image} alt={property.title} />
      )}

      <div className="details-info">
        <h1>{property.title}</h1>

        <p className="location">{property.location}</p>

        <p className="price">₹ {property.price}</p>

        <p className="description">{property.description}</p>

        {/* ✅ Owner Details */}
        {property.owner && (
          <div className="contact-box">
            <h3>Contact Owner</h3>
            <p>👤 {property.owner.name}</p>
            <p>📧 {property.owner.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyDetails;