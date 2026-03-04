// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// function EditProperty() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     price: "",
//     location: "",
//     image: "",
//   });

//   useEffect(() => {
//     const fetchProperty = async () => {
//       const res = await axios.get(
//         `http://localhost:5000/api/properties`
//       );

//       const property = res.data.find((p) => p._id === id);
//       setFormData(property);
//     };

//     fetchProperty();
//   }, [id]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");

//     await axios.put(
//       `http://localhost:5000/api/properties/${id}`,
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     alert("Updated ✅");
//     navigate("/dashboard");
//   };

//   return (
//     <form onSubmit={handleUpdate}>
//       <input
//         name="title"
//         value={formData.title}
//         onChange={(e) =>
//           setFormData({ ...formData, title: e.target.value })
//         }
//       />

//       <input
//         name="price"
//         value={formData.price}
//         onChange={(e) =>
//           setFormData({ ...formData, price: e.target.value })
//         }
//       />

//       <input
//         name="location"
//         value={formData.location}
//         onChange={(e) =>
//           setFormData({ ...formData, location: e.target.value })
//         }
//       />

//       <button type="submit">Update</button>
//     </form>
//   );
// }

// export default EditProperty;







import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/properties`
        );

        const property = res.data.find((p) => p._id === id);

        if (property) {
          setFormData(property);
        }
      } catch (error) {
        console.error(error);
        alert("Failed to fetch property ❌");
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/properties/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Updated Successfully ✅");
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Update Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Edit Property</h2>

      <form onSubmit={handleUpdate}>
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
}

export default EditProperty;