import { useState, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [form, setForm] = useState({});
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await api.post("/auth/login", form);
        login(res.data);

        if (res.data.userType === "tenant") navigate("/renter");
        if (res.data.userType === "owner") navigate("/owner");
        if (res.data.userType === "admin") navigate("/admin");
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} />
                <input className="form-control mb-2" name="password" type="password" placeholder="Password" onChange={handleChange} />
                <button className="btn btn-success">Login</button>
            </form>
        </div>
    );
};

export default Login;