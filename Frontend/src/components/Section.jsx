function Section({ title, children }) {
  return (
    <div className="mb-4">
      <h2 className="section-title">{title}</h2>
      {children}
    </div>
  );
}

export default Section;