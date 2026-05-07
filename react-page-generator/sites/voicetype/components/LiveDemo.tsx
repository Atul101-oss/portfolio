"use client";
import { useState, useEffect } from "react";
import { MicrophoneIcon } from "./Icons";

const demoTexts = [
    "Hello, this is VoiceType transcribing my speech in real time...",
    "Open the terminal and run sudo apt update...",
    "Dear team, I wanted to follow up on our earlier discussion...",
    "VoiceType works in any input field across your Linux desktop...",
];

export default function LiveDemo() {
    const [text, setText] = useState("");
    const [phraseIdx, setPhraseIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (!isActive) return;
        const current = demoTexts[phraseIdx];
        if (charIdx < current.length) {
            const timeout = setTimeout(() => {
                setText(current.slice(0, charIdx + 1));
                setCharIdx(c => c + 1);
            }, 35 + Math.random() * 45);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setText("");
                setCharIdx(0);
                setPhraseIdx(p => (p + 1) % demoTexts.length);
            }, 2200);
            return () => clearTimeout(timeout);
        }
    }, [charIdx, phraseIdx, isActive]);

    return (
        <section style={{
            position: "relative", zIndex: 1,
            maxWidth: "1100px", margin: "0 auto",
            padding: "0 40px 100px",
        }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
                <p style={{ fontSize: "12px", fontFamily: "'DM Mono', monospace", color: "#22d3ee", letterSpacing: "0.1em", marginBottom: "16px" }}>LIVE PREVIEW</p>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "48px", letterSpacing: "-0.03em", color: "#f1f5f9" }}>
                    See it in action
                </h2>
            </div>

            <div style={{
                maxWidth: "720px", margin: "0 auto",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px", overflow: "hidden",
            }}>
                {/* Terminal header */}
                <div style={{
                    padding: "14px 20px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                        {["#ff5f57", "#ffbd2e", "#28c840"].map(c => (
                            <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                        ))}
                    </div>
                    <span style={{ fontSize: "12px", fontFamily: "'DM Mono', monospace", color: "#475569" }}>voicetype — input field</span>
                    <div style={{ width: "50px" }} />
                </div>

                {/* Input area */}
                <div style={{ padding: "32px 28px" }}>
                    <div style={{
                        display: "flex", alignItems: "flex-start", gap: "16px",
                    }}>
                        <button
                            onClick={() => setIsActive(a => !a)}
                            style={{
                                width: "48px", height: "48px", borderRadius: "50%", flexShrink: 0,
                                background: isActive
                                    ? "linear-gradient(135deg, #22d3ee, #06b6d4)"
                                    : "rgba(255,255,255,0.06)",
                                border: "none", cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: isActive ? "#080b0f" : "#64748b",
                                transition: "all 0.3s",
                                animation: isActive ? "micPulse 2s ease-in-out infinite" : "none",
                                boxShadow: isActive ? "0 0 24px rgba(34,211,238,0.3)" : "none",
                            }}
                        >
                            <MicrophoneIcon />
                        </button>

                        <div style={{ flex: 1 }}>
                            <div style={{
                                minHeight: "80px",
                                padding: "16px 20px",
                                borderRadius: "14px",
                                background: "rgba(255,255,255,0.03)",
                                border: `1px solid ${isActive ? "rgba(34,211,238,0.25)" : "rgba(255,255,255,0.06)"}`,
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "16px", lineHeight: "1.7",
                                color: "#e2e8f0",
                                transition: "border-color 0.3s",
                            }}>
                                {text}
                                {isActive && (
                                    <span style={{
                                        display: "inline-block",
                                        width: "2px", height: "18px",
                                        background: "#22d3ee",
                                        marginLeft: "2px",
                                        animation: "blink 1s step-end infinite",
                                        verticalAlign: "text-bottom",
                                    }} />
                                )}
                            </div>

                            {/* Waveform mini */}
                            {isActive && (
                                <div style={{
                                    display: "flex", alignItems: "center", gap: "2px",
                                    marginTop: "12px", height: "20px", paddingLeft: "4px",
                                }}>
                                    {Array.from({ length: 24 }).map((_, i) => (
                                        <div key={i} style={{
                                            width: "2px", borderRadius: "2px",
                                            background: "#22d3ee",
                                            opacity: 0.4 + Math.random() * 0.6,
                                            animation: `waveform ${0.4 + Math.random() * 0.6}s ease-in-out ${i * 0.04}s infinite alternate`,
                                        }} />
                                    ))}
                                    <span style={{
                                        marginLeft: "12px", fontSize: "11px",
                                        fontFamily: "'DM Mono', monospace", color: "#22d3ee",
                                        opacity: 0.7,
                                    }}>listening...</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Status bar */}
                <div style={{
                    padding: "10px 20px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    fontSize: "11px", fontFamily: "'DM Mono', monospace", color: "#475569",
                }}>
                    <span>{isActive ? "● Recording" : "○ Paused"}</span>
                    <span>voicetype v1.0</span>
                </div>
            </div>
        </section>
    );
}
