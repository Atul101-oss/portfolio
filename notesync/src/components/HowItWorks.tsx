"use client";
import { useState, useEffect } from "react";

export function SyncAnimation() {
    const [step, setStep] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => setStep(s => (s + 1) % 4), 1200);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        { label: "Watching folder...", icon: "👁", color: "#a3e635" },
        { label: "Detecting changes...", icon: "🔍", color: "#facc15" },
        { label: "Pushing to GitHub...", icon: "⬆", color: "#60a5fa" },
        { label: "Synced ✓", icon: "✅", color: "#34d399" },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {steps.map((s, i) => (
                <div key={i} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "10px 14px", borderRadius: "8px",
                    background: step === i ? "rgba(255,255,255,0.07)" : "transparent",
                    border: `1px solid ${step === i ? s.color + "55" : "transparent"}`,
                    transition: "all 0.4s ease",
                    opacity: step === i ? 1 : 0.35,
                }}>
                    <span style={{ fontSize: "18px", minWidth: "24px" }}>{s.icon}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: step === i ? s.color : "#888" }}>
                        {s.label}
                    </span>
                    {step === i && <div style={{
                        marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%",
                        background: s.color, boxShadow: `0 0 8px ${s.color}`,
                        animation: "pulse 1s infinite"
                    }} />}
                </div>
            ))}
        </div>
    );
}

export default function HowItWorks() {
    return (
        <section style={{
            position: "relative", zIndex: 1,
            maxWidth: "1100px", margin: "0 auto",
            padding: "100px 40px",
        }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
                <p style={{ fontSize: "12px", fontFamily: "'DM Mono', monospace", color: "#a3e635", letterSpacing: "0.1em", marginBottom: "16px" }}>HOW IT WORKS</p>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "48px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                    Simple as push and pull
                </h2>
            </div>

            <style>{`
                .how-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    align-items: center;
                }
                @media (max-width: 768px) {
                    .how-grid {
                        grid-template-columns: 1fr;
                        gap: 24px;
                    }
                }
            `}</style>
            <div className="how-grid">
                {/* Left: flow diagram */}
                <div style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "20px", padding: "40px",
                }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                        {[
                            { icon: "💻", label: "Your local folder", sublabel: "~/vault, ~/documents, or any path", color: "#60a5fa" },
                            { icon: "⚡", label: "NoteSync daemon", sublabel: "Watches for changes & auto-commits", color: "#a3e635" },
                            { icon: "🐙", label: "Your GitHub repo", sublabel: "Private, encrypted, version-controlled", color: "#a78bfa" },
                            { icon: "📱", label: "Android / Another Linux", sublabel: "Fetch anytime, anywhere", color: "#f472b6" },
                        ].map((node, i) => (
                            <div key={i}>
                                <div style={{
                                    display: "flex", alignItems: "center", gap: "16px",
                                    padding: "16px", borderRadius: "12px",
                                    background: `${node.color}10`,
                                    border: `1px solid ${node.color}25`,
                                }}>
                                    <div style={{
                                        width: "44px", height: "44px", borderRadius: "10px",
                                        background: `${node.color}20`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "22px", flexShrink: 0,
                                    }}>{node.icon}</div>
                                    <div>
                                        <div style={{ fontWeight: 500, marginBottom: "2px" }}>{node.label}</div>
                                        <div style={{ fontSize: "12px", color: "#64748b" }}>{node.sublabel}</div>
                                    </div>
                                </div>
                                {i < 3 && (
                                    <div style={{
                                        marginLeft: "38px", width: "2px", height: "24px",
                                        background: `linear-gradient(${i % 2 === 0 ? "down" : "up"}, ${node.color}40, transparent)`,
                                    }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: live sync animation */}
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "20px", padding: "32px",
                    }}>
                        <div style={{
                            display: "flex", alignItems: "center", gap: "8px",
                            marginBottom: "24px",
                        }}>
                            <div style={{ display: "flex", gap: "6px" }}>
                                {["#ff5f57", "#ffbd2e", "#28c840"].map(c => (
                                    <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                                ))}
                            </div>
                            <span style={{ fontSize: "12px", fontFamily: "'DM Mono', monospace", color: "#475569", marginLeft: "8px" }}>
                                notesync -- live
                            </span>
                        </div>
                        <SyncAnimation />
                    </div>

                    <div style={{
                        background: "rgba(163,230,53,0.05)",
                        border: "1px solid rgba(163,230,53,0.15)",
                        borderRadius: "16px", padding: "24px",
                    }}>
                        <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.7 }}>
                            Configure once with your GitHub token and target folder. NoteSync handles all git operations silently in the background — no manual commits, no conflicts to resolve.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
