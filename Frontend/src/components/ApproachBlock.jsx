function ApproachBlock({ label, value, onChange, onGenerate }) {
  return (
    <div className="card mb-4">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <h3>{label}</h3>

        <div>
          <button className="btn-gray" type="button">
            Enter
          </button>
          <button
            className="btn-blue"
            type="button"
            onClick={onGenerate}
            style={{ marginLeft: "8px" }}
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
      />
    </div>
  );
}

export default ApproachBlock;