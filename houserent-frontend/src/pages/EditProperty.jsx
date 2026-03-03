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

  useEffect(() => {
    const fetchProperty = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/properties`
      );

      const property = res.data.find((p) => p._id === id);
      setFormData(property);
    };

    fetchProperty();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/properties/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Updated ✅");
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        name="title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
      />

      <input
        name="price"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: e.target.value })
        }
      />

      <input
        name="location"
        value={formData.location}
        onChange={(e) =>
          setFormData({ ...formData, location: e.target.value })
        }
      />

      <button type="submit">Update</button>
    </form>
  );
}

export default EditProperty;