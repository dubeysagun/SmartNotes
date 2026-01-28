function ApproachBlock({ label, value, onChange, onGenerate }) {
  return (
    <div className="mb-4" style={{ border: "2px solid #f0f0f0", borderRadius: "8px", padding: "16px", backgroundColor: "#fafafa" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", gap: "12px" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#333", margin: 0 }}>{label}</h3>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="btn-blue"
            type="button"
            onClick={onGenerate}
            style={{ padding: "8px 12px", fontSize: "0.9rem", width: "auto", minWidth: "100px" }}
          >
            Generate
          </button>
        </div>
      </div>

      <textarea
        className="textarea"
        placeholder={`Enter ${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginBottom: 0 }}
        rows="5"
      />
    </div>
  );
}

export default ApproachBlock;