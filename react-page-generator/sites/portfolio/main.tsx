
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";

import { Calendar } from "./app/components/ui/calendar.tsx";
import "./styles/index.css";


// createRoot(document.getElementById("root")!).render(<App />);
// createRoot(document.getElementById("root")!).render(<NoteSync />);
// createRoot(document.getElementById("root")!).render(<Portfolio />);
// createRoot(document.getElementById("root")!).render(<Portfolio1 />);
// createRoot(document.getElementById("root")!).render(<Calendar />);

function Root() {
  const params = new URLSearchParams(window.location.search);
  const website = params.get("site");

  switch (website) {
    case "app":
      return <App />;
    case "calendar":
      return <Calendar />;
    case "medical-diagnose":
      return window.location.href = 'medical-diagnose/';
    default:
      return <App />;
  }
}

createRoot(document.getElementById("root")!).render(<Root />);
