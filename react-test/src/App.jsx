import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [reply, setReply] = useState("");

  // STEP 1: GET request
  const getData = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/get/");
    const data = await res.json();
    setMessage(data.message);
  };

  // STEP 2: POST request
  const sendData = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/post/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name }),
    });
    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>React ↔ Django API Test</h2>

      {/* GET */}
      <button onClick={getData}>Get Data from Django</button>
      <p>{message}</p>

      <hr />

      {/* POST */}
      <input
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={sendData}>Send to Django</button>
      <p>{reply}</p>
    </div>
  );
}

export default App;