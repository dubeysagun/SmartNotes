function CodeBlock({ block, onChange, onGenerate, onRemove }) {
  return (
    <div className="card mb-4">
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <input
          className="input"
          placeholder="Block Tag (Brute / Better / Optimal)"
          value={block.tag}
          onChange={(e) => onChange({ ...block, tag: e.target.value })}
        />

        <select
          className="input"
          value={block.language}
          onChange={(e) => onChange({ ...block, language: e.target.value })}
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>

        <button className="btn-blue" type="button" onClick={onGenerate}>
          Generate
        </button>

        <button className="btn-gray" type="button" onClick={onRemove}>
          ✕
        </button>
      </div>

      <textarea
        className="textarea"
        placeholder="Write code here..."
        value={block.code}
        onChange={(e) => onChange({ ...block, code: e.target.value })}
      />
    </div>
  );
}

export default CodeBlock;