"use client";
import { ArrowRightIcon } from "./Icons";

export default function CTA() {
    return (
        <section style={{
            position: "relative", zIndex: 1,
            maxWidth: "1100px", margin: "0 auto",
            padding: "0 40px 100px",
        }}>
            <div style={{
                borderRadius: "24px",
                background: "linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(6,182,212,0.04) 100%)",
                border: "1px solid rgba(34,211,238,0.15)",
                padding: "80px 48px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
            }}>
                {/* Decorative glow */}
                <div style={{
                    position: "absolute", top: "-60%", left: "50%", transform: "translateX(-50%)",
                    width: "600px", height: "400px",
                    background: "radial-gradient(ellipse, rgba(34,211,238,0.12) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />

                <h2 style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "clamp(32px, 5vw, 56px)",
                    letterSpacing: "-0.03em",
                    marginBottom: "20px",
                    color: "#f1f5f9",
                    position: "relative",
                }}>
                    Stop typing.<br />Start speaking.
                </h2>
                <p style={{
                    fontSize: "18px", color: "#64748b",
                    maxWidth: "480px", margin: "0 auto 40px",
                    lineHeight: 1.7, position: "relative",
                }}>
                    Join the Linux users who've already made the switch to
                    voice-powered productivity.
                </p>
                <button className="dl-btn" style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    padding: "16px 32px", borderRadius: "12px",
                    background: "linear-gradient(135deg, #22d3ee, #06b6d4)",
                    color: "#080b0f", border: "none", cursor: "pointer",
                    fontSize: "16px", fontWeight: 700,
                    transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
                    position: "relative",
                }}>
                    Get VoiceType Free <ArrowRightIcon />
                </button>
            </div>
        </section>
    );
}
