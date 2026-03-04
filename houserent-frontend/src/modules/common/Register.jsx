import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [form, setForm] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/auth/register", form);
        navigate("/login");
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input className="form-control mb-2" name="name" placeholder="Name" onChange={handleChange} />
                <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} />
                <input className="form-control mb-2" name="password" placeholder="Password" type="password" onChange={handleChange} />
                <select className="form-control mb-2" name="userType" onChange={handleChange}>
                    <option value="">Select Role</option>
                    <option value="tenant">Tenant</option>
                    <option value="owner">Owner</option>
                </select>
                <button className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;