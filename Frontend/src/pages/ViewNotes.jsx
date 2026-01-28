import { useNavigate } from "react-router-dom";

function ViewNotes() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "600px" }}>
        <h1 className="section-title mb-4">View Notes</h1>
        
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          Your notes will appear here
        </p>

        <button className="btn-blue" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ViewNotes;
