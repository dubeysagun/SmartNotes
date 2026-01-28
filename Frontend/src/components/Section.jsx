function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "2px solid #f0f0f0" }}>
      <h2 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#333", marginBottom: "1.2rem" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

export default Section;