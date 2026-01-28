import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="header-content">
          <h1 className="header-title">📚 SmartNotes</h1>
          <p className="header-greeting">
            Welcome back, <span className="user-name">{user?.firstName || "User"}</span>!
          </p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="container">
        <div className="card">
          <h2 className="section-title">Your Personal Notes Vault</h2>
          
          <p className="home-subtitle">
            Master DSA problems with organized, structured notes
          </p>

          <div className="button-container">
            <button 
              className="btn-blue" 
              onClick={() => navigate("/add-note")}
            >
              ✏️ Add New Note
            </button>

            <button 
              className="btn-gray" 
              onClick={() => navigate("/view-notes")}
            >
              👁️ View All Notes
            </button>
          </div>

          <div className="home-info-box">
            <p className="home-info-text">
              <i>Perfect for preparing for interviews and mastering data structures</i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;