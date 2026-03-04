import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="hero">
        <h1>Find Your Dream Rental 🏠</h1>
        <p>Search from thousands of verified properties across India.</p>
        <button
          className="hero-btn"
          onClick={() => navigate("/properties")}
        >
          Browse Properties
        </button>
      </section>

      <section className="features">
        <h2>Why Choose HouseHunt?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Verified Listings</h3>
            <p>All properties are verified for safety and trust.</p>
          </div>

          <div className="feature-card">
            <h3>Easy Search</h3>
            <p>Filter by price, location, and amenities easily.</p>
          </div>

          <div className="feature-card">
            <h3>Direct Contact</h3>
            <p>Connect directly with property owners instantly.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;