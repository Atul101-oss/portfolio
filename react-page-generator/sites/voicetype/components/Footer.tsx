export default function Footer() {
    return (
        <footer style={{
            position: "relative", zIndex: 1,
            maxWidth: "1100px", margin: "0 auto",
            padding: "40px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "16px",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                    width: "22px", height: "22px", borderRadius: "6px",
                    background: "linear-gradient(135deg, #22d3ee, #06b6d4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "10px",
                }}>🎙️</div>
                <span style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "15px", color: "#94a3b8",
                }}>VoiceType</span>
            </div>

            <div style={{
                display: "flex", gap: "24px", fontSize: "13px",
            }}>
                {["GitHub", "Documentation", "License"].map(l => (
                    <a key={l} href="#" style={{
                        color: "#475569", textDecoration: "none",
                        transition: "color 0.2s",
                    }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#94a3b8")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
                    >{l}</a>
                ))}
            </div>

            <span style={{
                fontSize: "12px", color: "#334155",
                fontFamily: "'DM Mono', monospace",
            }}>
                Built with ♥ for Linux
            </span>
        </footer>
    );
}
