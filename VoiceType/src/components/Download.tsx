"use client";
import { useState } from "react";
import { LinuxIcon, CheckIcon, TerminalIcon } from "./Icons";

export default function Download() {
    const [copied, setCopied] = useState(false);

    const installCmd = "sudo dpkg -i voicetype.deb";

    const handleCopy = () => {
        navigator.clipboard.writeText(installCmd).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="download" style={{
            position: "relative", zIndex: 1,
            maxWidth: "1100px", margin: "0 auto",
            padding: "80px 40px 100px",
        }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
                <p style={{ fontSize: "12px", fontFamily: "'DM Mono', monospace", color: "#22d3ee", letterSpacing: "0.1em", marginBottom: "16px" }}>DOWNLOAD</p>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "48px", letterSpacing: "-0.03em", color: "#f1f5f9" }}>
                    Get started in minutes
                </h2>
            </div>

            <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px", padding: "48px",
                maxWidth: "720px", margin: "0 auto",
            }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div style={{ textAlign: "center" }}>
                        <div style={{
                            fontSize: "72px", marginBottom: "16px",
                            animation: "float 3s ease-in-out infinite",
                            display: "inline-block",
                        }}>🐧</div>
                        <h3 style={{ fontSize: "24px", fontFamily: "'DM Serif Display', serif", marginBottom: "8px", color: "#f1f5f9" }}>
                            VoiceType for Linux
                        </h3>
                        <p style={{ color: "#64748b", fontSize: "14px" }}>
                            Native .deb package for Ubuntu, Debian, and derivatives. Lightweight and installs in seconds.
                        </p>
                    </div>

                    {/* Terminal block */}
                    <div style={{
                        background: "#0d1117", borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        overflow: "hidden",
                    }}>
                        <div style={{
                            padding: "12px 16px",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            display: "flex", alignItems: "center", gap: "8px",
                        }}>
                            {["#ff5f57", "#ffbd2e", "#28c840"].map(c => (
                                <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                            ))}
                            <span style={{ marginLeft: "8px", fontSize: "12px", fontFamily: "'DM Mono', monospace", color: "#475569" }}>bash</span>
                        </div>
                        <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "14px", color: "#22d3ee" }}>
                                $ {installCmd}
                            </span>
                            <button onClick={handleCopy} style={{
                                display: "flex", alignItems: "center", gap: "6px",
                                padding: "6px 12px", borderRadius: "6px",
                                background: copied ? "rgba(34,211,238,0.15)" : "rgba(255,255,255,0.05)",
                                border: `1px solid ${copied ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.1)"}`,
                                color: copied ? "#22d3ee" : "#94a3b8",
                                cursor: "pointer", fontSize: "12px", fontFamily: "'DM Sans', sans-serif",
                                transition: "all 0.2s",
                            }}>
                                {copied ? <><CheckIcon /> Copied</> : <><TerminalIcon /> Copy</>}
                            </button>
                        </div>
                    </div>

                    {/* Steps */}
                    {[
                        "Download the .deb from GitHub releases",
                        `Run: ${installCmd}`,
                        "Configure your preferred hotkey in settings",
                        "Press your hotkey and start speaking",
                    ].map((step, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                            <div style={{
                                width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                                background: "rgba(34,211,238,0.15)", border: "1px solid rgba(34,211,238,0.3)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "12px", fontFamily: "'DM Mono', monospace", color: "#22d3ee",
                            }}>{i + 1}</div>
                            <span style={{
                                fontSize: "13px", color: "#94a3b8",
                                fontFamily: i === 1 ? "'DM Mono', monospace" : "inherit",
                            }}>{step}</span>
                        </div>
                    ))}

                    <button className="dl-btn" style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                        padding: "16px", borderRadius: "12px", marginTop: "8px",
                        background: "linear-gradient(135deg, #22d3ee, #06b6d4)",
                        color: "#080b0f", border: "none", cursor: "pointer",
                        fontSize: "15px", fontWeight: 700,
                        transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
                    }}>
                        <LinuxIcon /> Download voicetype.deb
                    </button>
                </div>
            </div>
        </section>
    );
}
