import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card">
        <h1 className="section-title">
          📚 Smart Notes
        </h1>
        
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
  );
}

export default Home;