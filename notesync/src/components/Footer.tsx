export default function Footer() {
    return (
        <footer style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "32px 40px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "16px",
            color: "#475569", fontSize: "13px",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                    width: "20px", height: "20px", borderRadius: "6px",
                    background: "linear-gradient(135deg, #a3e635, #4ade80)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "10px",
                }}>⚡</div>
                <span style={{ fontFamily: "'DM Serif Display', serif" }}>NoteSync</span>
                <span>— MIT License</span>
            </div>
            <div style={{ display: "flex", gap: "24px" }}>
                {["GitHub", "Issues", "Docs"].map(l => (
                    <a key={l} href="#" style={{ color: "inherit", textDecoration: "none" }}>{l}</a>
                ))}
            </div>
        </footer>
    );
}
