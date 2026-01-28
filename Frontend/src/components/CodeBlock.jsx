function CodeBlock({ block, onChange, onGenerate, onRemove }) {
  return (
    <div style={{ border: "2px solid #f0f0f0", borderRadius: "8px", padding: "16px", backgroundColor: "#fafafa", marginBottom: "16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "8px", marginBottom: "12px", alignItems: "center" }}>
        <input
          className="input"
          placeholder="Block Tag (Brute / Better / Optimal)"
          value={block.tag}
          onChange={(e) => onChange({ ...block, tag: e.target.value })}
          style={{ marginBottom: 0 }}
        />

        <select
          className="input"
          value={block.language}
          onChange={(e) => onChange({ ...block, language: e.target.value })}
          style={{ marginBottom: 0 }}
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>

        <button 
          className="btn-blue" 
          type="button" 
          onClick={onGenerate}
          style={{ padding: "8px 12px", fontSize: "0.9rem", marginBottom: 0 }}
        >
          Generate
        </button>

        <button 
          className="btn-gray" 
          type="button" 
          onClick={onRemove}
          style={{ padding: "8px 12px", fontSize: "0.9rem", width: "auto", marginBottom: 0 }}
          title="Remove this code block"
        >
          ✕
        </button>
      </div>

      <textarea
        className="textarea"
        placeholder="Write code here..."
        value={block.code}
        onChange={(e) => onChange({ ...block, code: e.target.value })}
        style={{ marginBottom: 0, fontFamily: "'Courier New', monospace" }}
        rows="8"
      />
    </div>
  );
}

export default CodeBlock;