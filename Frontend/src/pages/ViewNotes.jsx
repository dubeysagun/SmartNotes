import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ViewNotes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    // Load notes from localStorage
    const allNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(allNotes);
  }, []);

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setSelectedNote(null);
  };

  if (selectedNote !== null) {
    const note = notes[selectedNote];
    return (
      <div className="container">
        <div className="card">
          <div className="notes-header">
            <h1 className="section-title mb-0">{note.title}</h1>
            <button className="btn-gray button-no-margin" onClick={() => setSelectedNote(null)}>
              ← Back
            </button>
          </div>

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
            <button className="btn-gray button-flex" onClick={() => deleteNote(selectedNote)}>
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
              {notes.map((note, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedNote(index)}
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
