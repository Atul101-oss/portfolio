"use client";
import { AndroidIcon, LinuxIcon, GithubIcon } from "./Icons";

export default function Hero() {
    return (
        <section style={{
            position: "relative", zIndex: 1,
            maxWidth: "1100px", margin: "0 auto",
            padding: "120px 40px 80px",
            animation: "slideUp 0.8s ease forwards",
        }}>
            <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "6px 14px", borderRadius: "100px",
                background: "rgba(163,230,53,0.1)", border: "1px solid rgba(163,230,53,0.25)",
                fontSize: "12px", fontFamily: "'DM Mono', monospace",
                color: "#a3e635", marginBottom: "32px",
                letterSpacing: "0.05em",
            }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a3e635", animation: "pulse 2s infinite" }} />
                OPEN SOURCE · SELF-HOSTED · ZERO CLOUD
            </div>

            <h1 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(52px, 8vw, 96px)",
                lineHeight: "1.0",
                letterSpacing: "-0.03em",
                marginBottom: "24px",
                background: "linear-gradient(135deg, #f1f5f9 30%, #94a3b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}>
                Your notes,<br />
                <em style={{ color: "#a3e635", WebkitTextFillColor: "#a3e635" }}>everywhere</em>.
            </h1>

            <p style={{
                fontSize: "20px", color: "#64748b", lineHeight: "1.7",
                maxWidth: "560px", marginBottom: "48px", fontWeight: 300,
            }}>
                NoteSync pushes your local folder to GitHub and pulls it back on any device.
                Made for Obsidian, Logseq, or anything that lives on disk.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <button className="dl-btn" style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "14px 28px", borderRadius: "12px",
                    background: "linear-gradient(135deg, #a3e635, #4ade80)",
                    color: "#080b0f", border: "none", cursor: "pointer",
                    fontSize: "15px", fontWeight: 600,
                    transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
                }}>
                    <AndroidIcon /> Get Android App
                </button>
                <button className="dl-btn" style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "14px 28px", borderRadius: "12px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#e2e8f0", cursor: "pointer",
                    fontSize: "15px", fontWeight: 500,
                    transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
                }}>
                    <LinuxIcon /> Download .deb
                </button>
                <button className="dl-btn" style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "14px 28px", borderRadius: "12px",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#94a3b8", cursor: "pointer",
                    fontSize: "15px", fontWeight: 500,
                    transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
                }}>
                    <GithubIcon /> View Source
                </button>
            </div>
        </section>
    );
}
