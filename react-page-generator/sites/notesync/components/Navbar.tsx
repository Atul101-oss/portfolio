"use client";
import { GithubIcon, UserIcon } from "./Icons";

export default function Navbar() {
    return (
        <nav style={{
            position: "sticky", top: 0, zIndex: 100,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 40px", height: "64px",
            background: "rgba(8,11,15,0.8)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                    width: "28px", height: "28px", borderRadius: "8px",
                    background: "linear-gradient(135deg, #a3e635, #4ade80)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "14px",
                }}>⚡</div>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", letterSpacing: "-0.02em" }}>
                    NoteSync
                </span>
            </div>
            <style>{`
        .nav-links {
          display: flex;
          gap: 32px;
          font-size: 14px;
          color: #94a3b8;
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
        }
      `}</style>
            <div className="nav-links">
                {["Features", "How it Works", "Download"].map(l => (
                    <a key={l} href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#e2e8f0")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}>{l}</a>
                ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <a href="https://github.com" target="_blank" rel="noreferrer" style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "8px 16px", borderRadius: "8px",
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0", textDecoration: "none", fontSize: "13px",
                    transition: "all 0.2s",
                }}>
                    <GithubIcon /> GitHub
                </a>
                <a href="/dashboard" style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #22d3ee, #0891b2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#080b0f", textDecoration: "none",
                    transition: "all 0.25s", cursor: "pointer",
                    boxShadow: "0 0 0 2px rgba(34,211,238,0.2)",
                }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 0 4px rgba(34,211,238,0.35)"; e.currentTarget.style.transform = "scale(1.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 0 2px rgba(34,211,238,0.2)"; e.currentTarget.style.transform = "scale(1)"; }}
                    title="Dashboard"
                >
                    <UserIcon />
                </a>
            </div>
        </nav>
    );
}
