import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import apiClient from "../services/api";

function ViewNotes() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch notes from backend
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/api/notes");
      if (response.data.success) {
        setNotes(response.data.notes);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notes");
      console.error("Error loading notes:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      const response = await apiClient.delete(`/api/notes/${noteId}`);
      if (response.data.success) {
        setNotes(notes.filter(note => note._id !== noteId));
        setSelectedNote(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete note");
      console.error("Error deleting note:", err);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p style={{ textAlign: "center", padding: "40px" }}>Loading notes...</p>
        </div>
      </div>
    );
  }

  if (selectedNote !== null) {
    const note = selectedNote;
    return (
      <div className="container">
        <div className="card">
          <div className="notes-header">
            <h1 className="section-title mb-0">{note.title}</h1>
            <button className="btn-gray button-no-margin" onClick={() => setSelectedNote(null)}>
              ← Back
            </button>
          </div>

          {error && (
            <div style={{
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #fecaca"
            }}>
              {error}
            </div>
          )}

          {/* Topic */}
          {note.topic && (
            <div className="section-box-light">
              <h3 className="section-title-sm">Topic:</h3>
              <p className="text-muted">{note.topic}</p>
            </div>
          )}

          {/* Problem Link */}
          {note.link && (
            <div className="section-box-light">
              <h3 className="section-title-sm">Problem Link:</h3>
              <a href={note.link} target="_blank" rel="noopener noreferrer" className="text-link">
                {note.link}
              </a>
            </div>
          )}

          {/* Problem Statement */}
          {note.statement && (
            <div className="section-box-light">
              <h3 className="section-title-sm">Problem Statement:</h3>
              <p className="text-muted">{note.statement}</p>
            </div>
          )}

          {/* Approach */}
          {(note.approach.brute || note.approach.optimized || note.approach.notes) && (
            <div className="section-box">
              <h3 className="section-title-md">Approach:</h3>
              {note.approach.brute && (
                <div className="subsection-content">
                  <h4 className="subsection-title">Brute Force:</h4>
                  <p className="text-muted">{note.approach.brute}</p>
                </div>
              )}
              {note.approach.optimized && (
                <div className="subsection-content">
                  <h4 className="subsection-title">Optimized:</h4>
                  <p className="text-muted">{note.approach.optimized}</p>
                </div>
              )}
              {note.approach.notes && (
                <div className="subsection-content">
                  <h4 className="subsection-title">Notes / Edge Cases:</h4>
                  <p className="text-muted">{note.approach.notes}</p>
                </div>
              )}
            </div>
          )}

          {/* Code Blocks */}
          {note.codeBlocks && note.codeBlocks.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 className="section-title-md">Code Blocks:</h3>
              {note.codeBlocks.map((block, i) => (
                <div key={i} className="code-display-box">
                  <div className="code-display-header">
                    <span className="code-display-tag">Tag: {block.tag}</span>
                    <span className="code-display-language">Language: {block.language.toUpperCase()}</span>
                  </div>
                  <pre className="code-display-pre">
                    <code>{block.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* Summary */}
          {(note.summary.takeaways || note.summary.tricks || note.summary.mistakes) && (
            <div className="section-box">
              <h3 className="section-title-md">Summary:</h3>
              {note.summary.takeaways && (
                <div className="subsection-content">
                  <h4 className="subsection-title">Takeaways:</h4>
                  <p className="text-muted">{note.summary.takeaways}</p>
                </div>
              )}
              {note.summary.tricks && (
                <div className="subsection-content">
                  <h4 className="subsection-title">Key Tricks:</h4>
                  <p className="text-muted">{note.summary.tricks}</p>
                </div>
              )}
              {note.summary.mistakes && (
                <div className="subsection-content">
                  <h4 className="subsection-title">Common Mistakes:</h4>
                  <p className="text-muted">{note.summary.mistakes}</p>
                </div>
              )}
            </div>
          )}

          {/* Complexity */}
          {(note.complexity.time || note.complexity.space || note.complexity.explanation) && (
            <div className="section-box">
              <h3 className="section-title-md">Complexity:</h3>
              {note.complexity.time && (
                <div className="subsection-content">
                  <h4 className="subsection-title">Time Complexity:</h4>
                  <p className="text-muted">{note.complexity.time}</p>
                </div>
              )}
              {note.complexity.space && (
                <div className="subsection-content">
                  <h4 className="subsection-title">Space Complexity:</h4>
                  <p className="text-muted">{note.complexity.space}</p>
                </div>
              )}
              {note.complexity.explanation && (
                <div className="subsection-content">
                  <h4 className="subsection-title">Explanation:</h4>
                  <p className="text-muted">{note.complexity.explanation}</p>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="notes-list">
            <button 
              className="btn-gray button-flex" 
              onClick={() => deleteNote(note._id)}
            >
              Delete Note
            </button>
            <button className="btn-blue button-flex" onClick={() => navigate("/add-note")}>
              Add Another Note
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="notes-header">
          <h1 className="section-title mb-0">View Notes</h1>
          <button className="btn-gray button-no-margin" onClick={() => navigate("/")}>
            ← Home
          </button>
        </div>

        {error && (
          <div style={{
            backgroundColor: "#fee2e2",
            color: "#dc2626",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #fecaca"
          }}>
            {error}
          </div>
        )}

        {notes.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state-text">
              No notes yet. Create your first DSA note!
            </p>
            <button className="btn-blue" onClick={() => navigate("/add-note")} style={{ maxWidth: "300px", margin: "0 auto" }}>
              Create First Note
            </button>
          </div>
        ) : (
          <div>
            <p className="notes-count">
              Total Notes: <strong>{notes.length}</strong>
            </p>
            <div className="notes-list-container">
              {notes.map((note) => (
                <div
                  key={note._id}
                  onClick={() => setSelectedNote(note)}
                  className="note-card"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#667eea";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#f0f0f0";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <h3 className="note-card-title">
                    {note.title || "Untitled"}
                  </h3>
                  <p className="note-card-topic">
                    📌 <strong>{note.topic || "No topic"}</strong>
                  </p>
                  <p className="note-card-date">
                    Created: {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewNotes;
