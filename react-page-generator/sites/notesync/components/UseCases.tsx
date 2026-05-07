export default function UseCases() {
    const useCases = [
        { emoji: "📝", label: "Obsidian vaults", color: "#a78bfa" },
        { emoji: "📓", label: "Logseq graphs", color: "#60a5fa" },
        { emoji: "🖼", label: "Media libraries", color: "#f472b6" },
        { emoji: "📁", label: "Work documents", color: "#34d399" },
        { emoji: "💻", label: "Code projects", color: "#facc15" },
        { emoji: "📚", label: "Research notes", color: "#fb923c" },
    ];

    return (
        <section style={{
            position: "relative", zIndex: 1,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "80px 40px",
        }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
                <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "32px" }}>Works great for</p>
                <div style={{
                    display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px",
                }}>
                    {useCases.map((u, i) => (
                        <div key={i} className="use-pill" style={{
                            display: "flex", alignItems: "center", gap: "10px",
                            padding: "12px 22px", borderRadius: "100px",
                            background: `${u.color}12`,
                            border: `1px solid ${u.color}30`,
                            cursor: "default", transition: "transform 0.2s",
                        }}>
                            <span style={{ fontSize: "18px" }}>{u.emoji}</span>
                            <span style={{ fontSize: "14px", color: u.color, fontWeight: 500 }}>{u.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
