import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import apiClient from "../services/api";
import Section from "../components/Section";
import ApproachBlock from "../components/ApproachBlock";
import CodeBlock from "../components/CodeBlock";

function AddNote() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [statement, setStatement] = useState("");

  const [approach, setApproach] = useState({
    brute: "",
    optimized: "",
    notes: "",
  });

  const [summary, setSummary] = useState({
    takeaways: "",
    tricks: "",
    mistakes: "",
  });

  const [complexity, setComplexity] = useState({
    time: "",
    space: "",
    explanation: "",
  });

  const [codeBlocks, setCodeBlocks] = useState([]);

  const addCodeBlock = () => {
    setCodeBlocks([
      ...codeBlocks,
      { tag: "", language: "cpp", code: "" },
    ]);
  };

  const handleSaveNote = async () => {
    // Validate required fields
    if (!topic.trim() || !title.trim()) {
      setError("Topic and Title are required!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const noteData = {
        topic,
        title,
        link,
        statement,
        approach,
        summary,
        complexity,
        codeBlocks,
      };

      // Save to backend
      const response = await apiClient.post("/api/notes", noteData);
      
      if (response.data.success) {
        // Redirect to view notes
        navigate("/view-notes");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save note. Please try again.");
      console.error("Error saving note:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="notes-header">
          <h1 className="section-title mb-0">Add DSA Note</h1>
          <button className="btn-gray button-no-margin" onClick={() => navigate("/")}>
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

        {/* Topic / Tag Section */}
        <Section title="1. Topic / Tag">
          <input 
            className="input" 
            placeholder="e.g., Array, DP, Graph, Sliding Window" 
            value={topic} 
            onChange={(e) => setTopic(e.target.value)}
            disabled={loading}
          />
        </Section>

        {/* Problem Metadata Section */}
        <Section title="2. Problem Metadata">
          <input 
            className="input input-mb" 
            placeholder="Problem Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
          <input 
            className="input input-mb" 
            placeholder="Problem Link (LeetCode / Codeforces / GFG)" 
            value={link} 
            onChange={(e) => setLink(e.target.value)}
            disabled={loading}
          />
          <textarea 
            className="textarea" 
            placeholder="Problem Statement (Optional)" 
            value={statement} 
            onChange={(e) => setStatement(e.target.value)}
            disabled={loading}
            rows="4"
          />
        </Section>

        {/* Approach Section */}
        <Section title="3. Approach">
          <ApproachBlock 
            label="Brute Force Explanation" 
            value={approach.brute} 
            onChange={(v) => setApproach({ ...approach, brute: v })}
            onGenerate={() => console.log("Generate Brute Force")}
          />
          <ApproachBlock 
            label="Optimized Approach Explanation" 
            value={approach.optimized} 
            onChange={(v) => setApproach({ ...approach, optimized: v })}
            onGenerate={() => console.log("Generate Optimized")}
          />
          <ApproachBlock 
            label="Notes / Edge Cases" 
            value={approach.notes} 
            onChange={(v) => setApproach({ ...approach, notes: v })}
            onGenerate={() => console.log("Generate Notes")}
          />
        </Section>

        {/* Code Blocks Section */}
        <Section title="4. Code Blocks">
          {codeBlocks.map((block, i) => (
            <CodeBlock
              key={i}
              block={block}
              onChange={(updated) => {
                const copy = [...codeBlocks];
                copy[i] = updated;
                setCodeBlocks(copy);
              }}
              onGenerate={() => console.log("Generate Code for block", i)}
              onRemove={() => setCodeBlocks(codeBlocks.filter((_, idx) => idx !== i))}
            />
          ))}
          <button className="btn-blue btn-add-block" onClick={addCodeBlock} disabled={loading}>
            + Add Code Block
          </button>
        </Section>

        {/* Summary Section */}
        <Section title="5. Summary">
          <ApproachBlock 
            label="Final Takeaways" 
            value={summary.takeaways} 
            onChange={(v) => setSummary({ ...summary, takeaways: v })}
            onGenerate={() => console.log("Generate Takeaways")}
          />
          <ApproachBlock 
            label="Key Tricks" 
            value={summary.tricks} 
            onChange={(v) => setSummary({ ...summary, tricks: v })}
            onGenerate={() => console.log("Generate Tricks")}
          />
          <ApproachBlock 
            label="Common Mistakes" 
            value={summary.mistakes} 
            onChange={(v) => setSummary({ ...summary, mistakes: v })}
            onGenerate={() => console.log("Generate Mistakes")}
          />
        </Section>

        {/* Complexity Section */}
        <Section title="6. Complexity">
          <ApproachBlock 
            label="Time Complexity" 
            value={complexity.time} 
            onChange={(v) => setComplexity({ ...complexity, time: v })}
            onGenerate={() => console.log("Generate Time Complexity")}
          />
          <ApproachBlock 
            label="Space Complexity" 
            value={complexity.space} 
            onChange={(v) => setComplexity({ ...complexity, space: v })}
            onGenerate={() => console.log("Generate Space Complexity")}
          />
          <ApproachBlock 
            label="Complexity Explanation" 
            value={complexity.explanation} 
            onChange={(v) => setComplexity({ ...complexity, explanation: v })}
            onGenerate={() => console.log("Generate Explanation")}
          />
        </Section>

        <div className="action-buttons">
          <button 
            className="btn-blue button-flex" 
            onClick={handleSaveNote}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Note"}
          </button>
          <button 
            className="btn-gray button-flex" 
            onClick={() => navigate("/")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNote;