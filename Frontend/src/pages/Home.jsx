import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div className="card" style={{ maxWidth: "400px", margin: "auto" }}>
        <h1 className="section-title mb-4">DSA Notes</h1>

        <button className="btn-blue mb-4" onClick={() => navigate("/add-note")}>
          Add Note
        </button>

        <br />

        <button className="btn-gray" onClick={() => navigate("/view-notes")}>
          View Notes
        </button>
      </div>
    </div>
  );
}

export default Home;