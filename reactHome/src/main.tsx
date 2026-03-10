
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import NoteSync from "./app/notesync.tsx";
  import Portfolio from "./app/portfolio.tsx";
  import Portfolio1 from "./app/portfolio1.tsx";
  import { Calendar } from "./app/components/ui/calendar.tsx";
  import "./styles/index.css";

  // createRoot(document.getElementById("root")!).render(<App />);
  createRoot(document.getElementById("root")!).render(<NoteSync />);
  // createRoot(document.getElementById("root")!).render(<Portfolio />);
  // createRoot(document.getElementById("root")!).render(<Portfolio1 />);
  // createRoot(document.getElementById("root")!).render(<Calendar />);
  