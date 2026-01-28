import { useState } from "react";
import Section from "../components/Section";
import ApproachBlock from "../components/ApproachBlock";
import CodeBlock from "../components/CodeBlock";

function AddNote() {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [statement, setStatement] = useState("");

  const [approach, setApproach] = useState({
    brute: "",
    optimized: "",
    notes: "",
  });

//   const [summary, setSummary] = useState({
//     takeaways: "",
//     tricks: "",
//     mistakes: "",
//   });

//   const [complexity, setComplexity] = useState({
//     time: "",
//     space: "",
//     explanation: "",
//   });

  const [codeBlocks, setCodeBlocks] = useState([]);

  const addCodeBlock = () => {
    setCodeBlocks([
      ...codeBlocks,
      { tag: "", language: "cpp", code: "" },
    ]);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="section-title mb-4">Add DSA Note</h1>

        <Section title="Topic / Tag">
          <input className="input" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </Section>

        <Section title="Problem Metadata">
          <input className="input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="input" placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} />
          <textarea className="textarea" placeholder="Statement" value={statement} onChange={(e) => setStatement(e.target.value)} />
        </Section>

        <Section title="Approach">
          <ApproachBlock label="Brute Force" value={approach.brute} onChange={(v) => setApproach({ ...approach, brute: v })} />
          <ApproachBlock label="Optimized" value={approach.optimized} onChange={(v) => setApproach({ ...approach, optimized: v })} />
          <ApproachBlock label="Notes / Edge Cases" value={approach.notes} onChange={(v) => setApproach({ ...approach, notes: v })} />
        </Section>

        <Section title="Code Blocks">
          {codeBlocks.map((block, i) => (
            <CodeBlock
              key={i}
              block={block}
              onChange={(updated) => {
                const copy = [...codeBlocks];
                copy[i] = updated;
                setCodeBlocks(copy);
              }}
              onRemove={() => setCodeBlocks(codeBlocks.filter((_, idx) => idx !== i))}
            />
          ))}
          <button className="btn-blue" onClick={addCodeBlock}>+ Add Code Block</button>
        </Section>

        <button className="btn-blue" style={{ width: "100%", marginTop: "16px" }}>
          Save Note
        </button>
      </div>
    </div>
  );
}

export default AddNote;