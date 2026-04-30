"use client";
import { LinuxIcon, GithubIcon } from "./Icons";

export default function Hero() {
    return (
        <section style={{
            position: "relative", zIndex: 1,
            maxWidth: "1100px", margin: "0 auto",
            padding: "100px 40px 80px",
            animation: "slideUp 0.8s ease forwards",
        }}>
            <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "6px 14px", borderRadius: "100px",
                background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.25)",
                fontSize: "12px", fontFamily: "'DM Mono', monospace",
                color: "#22d3ee", marginBottom: "32px",
                letterSpacing: "0.05em",
            }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22d3ee", animation: "pulse 2s infinite" }} />
                LINUX · OPEN SOURCE · VOICE POWERED
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
                Speak it,<br />
                <em style={{ color: "#22d3ee", WebkitTextFillColor: "#22d3ee" }}>typed.</em>
            </h1>

            <p style={{
                fontSize: "20px", color: "#64748b", lineHeight: "1.7",
                maxWidth: "560px", marginBottom: "48px", fontWeight: 300,
            }}>
                Voice typing for Linux — speak naturally and watch your words flow into any
                input field. Like Windows Voice Typing, but open source and built for Linux.
            </p>

            {/* Voice Waveform */}
            <div style={{
                display: "flex", alignItems: "center", gap: "3px",
                marginBottom: "40px", height: "48px",
            }}>
                {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} style={{
                        width: "3px",
                        borderRadius: "3px",
                        background: `linear-gradient(180deg, ${i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#06b6d4" : "#0891b2"}, transparent)`,
                        animation: `waveform ${0.5 + Math.random() * 0.8}s ease-in-out ${i * 0.05}s infinite alternate`,
                        opacity: 0.7 + Math.random() * 0.3,
                    }} />
                ))}
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <button className="dl-btn" style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "14px 28px", borderRadius: "12px",
                    background: "linear-gradient(135deg, #22d3ee, #06b6d4)",
                    color: "#080b0f", border: "none", cursor: "pointer",
                    fontSize: "15px", fontWeight: 600,
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
