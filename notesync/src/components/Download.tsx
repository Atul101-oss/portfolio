"use client";
import { useState } from "react";
import { AndroidIcon, LinuxIcon, CheckIcon, TerminalIcon } from "./Icons";

export default function Download() {
    const [activeTab, setActiveTab] = useState("android");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const installCmd = "sudo dpkg -i notesync.deb";

    return (
        <section style={{
            position: "relative", zIndex: 1,
            maxWidth: "1100px", margin: "0 auto",
            padding: "80px 40px 100px",
        }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
                <p style={{ fontSize: "12px", fontFamily: "'DM Mono', monospace", color: "#a3e635", letterSpacing: "0.1em", marginBottom: "16px" }}>DOWNLOAD</p>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "48px", letterSpacing: "-0.03em" }}>
                    Get started in minutes
                </h2>
            </div>

            <div style={{
                display: "flex", justifyContent: "center",
                gap: "8px", marginBottom: "40px",
            }}>
                {[
                    { id: "android", label: "Android", icon: <AndroidIcon /> },
                    { id: "linux", label: "Linux (.deb)", icon: <LinuxIcon /> },
                ].map(tab => (
                    <button key={tab.id} className="tab-btn" onClick={() => setActiveTab(tab.id)} style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        padding: "10px 24px", borderRadius: "10px",
                        background: activeTab === tab.id ? "rgba(163,230,53,0.15)" : "rgba(255,255,255,0.04)",
                        border: activeTab === tab.id ? "1px solid rgba(163,230,53,0.4)" : "1px solid rgba(255,255,255,0.08)",
                        color: activeTab === tab.id ? "#a3e635" : "#94a3b8",
                        cursor: "pointer", fontSize: "14px", fontWeight: 500,
                        transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
                    }}>
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px", padding: "48px",
                maxWidth: "720px", margin: "0 auto",
            }}>
                {activeTab === "android" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <div style={{ textAlign: "center" }}>
                            <div style={{
                                fontSize: "72px", marginBottom: "16px",
                                animation: "float 3s ease-in-out infinite",
                                display: "inline-block",
                            }}>📱</div>
                            <h3 style={{ fontSize: "24px", fontFamily: "'DM Serif Display', serif", marginBottom: "8px" }}>NoteSync for Android</h3>
                            <p style={{ color: "#64748b", fontSize: "14px" }}>Fetch your notes on any Android device. Simple, lightweight, no setup hell.</p>
                        </div>
                        {[
                            "Install the APK from GitHub releases",
                            "Enter your GitHub repo URL and token",
                            "Choose your local sync folder",
                            "Tap Sync — you're done",
                        ].map((step, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                <div style={{
                                    width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                                    background: "rgba(163,230,53,0.15)", border: "1px solid rgba(163,230,53,0.3)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "12px", fontFamily: "'DM Mono', monospace", color: "#a3e635",
                                }}>{i + 1}</div>
                                <span style={{ fontSize: "14px", color: "#94a3b8" }}>{step}</span>
                            </div>
                        ))}
                        <button className="dl-btn" style={{
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                            padding: "16px", borderRadius: "12px", marginTop: "8px",
                            background: "linear-gradient(135deg, #a3e635, #4ade80)",
                            color: "#080b0f", border: "none", cursor: "pointer",
                            fontSize: "15px", fontWeight: 700,
                            transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
                        }}>
                            <AndroidIcon /> Download APK
                        </button>
                    </div>
                )}

                {activeTab === "linux" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "72px", marginBottom: "16px", animation: "float 3s ease-in-out infinite", display: "inline-block" }}>🐧</div>
                            <h3 style={{ fontSize: "24px", fontFamily: "'DM Serif Display', serif", marginBottom: "8px" }}>NoteSync for Linux</h3>
                            <p style={{ color: "#64748b", fontSize: "14px" }}>Native .deb package for Ubuntu, Debian, and derivatives. Installs system-wide in seconds.</p>
                        </div>

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
                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "14px", color: "#a3e635" }}>
                                    $ {installCmd}
                                </span>
                                <button onClick={handleCopy} style={{
                                    display: "flex", alignItems: "center", gap: "6px",
                                    padding: "6px 12px", borderRadius: "6px",
                                    background: copied ? "rgba(163,230,53,0.15)" : "rgba(255,255,255,0.05)",
                                    border: `1px solid ${copied ? "rgba(163,230,53,0.3)" : "rgba(255,255,255,0.1)"}`,
                                    color: copied ? "#a3e635" : "#94a3b8",
                                    cursor: "pointer", fontSize: "12px", fontFamily: "'DM Sans', sans-serif",
                                    transition: "all 0.2s",
                                }}>
                                    {copied ? <><CheckIcon /> Copied</> : <><TerminalIcon /> Copy</>}
                                </button>
                            </div>
                        </div>

                        {[
                            "Download the .deb from GitHub releases",
                            `Run: ${installCmd}`,
                            "Configure ~/.config/notesync/config.yml",
                            "Run notesync start to begin watching",
                        ].map((step, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                <div style={{
                                    width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                                    background: "rgba(163,230,53,0.15)", border: "1px solid rgba(163,230,53,0.3)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "12px", fontFamily: "'DM Mono', monospace", color: "#a3e635",
                                }}>{i + 1}</div>
                                <span style={{ fontSize: "13px", color: "#94a3b8", fontFamily: i === 1 ? "'DM Mono', monospace" : "inherit" }}>{step}</span>
                            </div>
                        ))}

                        <button className="dl-btn" style={{
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                            padding: "16px", borderRadius: "12px", marginTop: "8px",
                            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                            color: "#e2e8f0", cursor: "pointer",
                            fontSize: "15px", fontWeight: 600,
                            transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
                        }}>
                            <LinuxIcon /> Download notesync.deb
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
