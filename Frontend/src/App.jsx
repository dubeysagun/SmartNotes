import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddNote from "./pages/AddNote";
import ViewNotes from "./pages/ViewNotes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-note" element={<AddNote />} />
        <Route path="/view-notes" element={<ViewNotes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;