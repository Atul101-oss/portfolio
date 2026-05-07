import { ArrowRight, GithubIcon } from "./Icons";

export default function CTA() {
    return (
        <section style={{
            position: "relative", zIndex: 1,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "100px 40px",
            textAlign: "center",
            background: "linear-gradient(to bottom, transparent, rgba(163,230,53,0.03))",
        }}>
            <h2 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(36px, 6vw, 72px)",
                letterSpacing: "-0.03em", lineHeight: 1.1,
                marginBottom: "24px",
            }}>
                Own your notes.<br />
                <em style={{ color: "#a3e635" }}>Own your sync.</em>
            </h2>
            <p style={{ color: "#64748b", fontSize: "18px", marginBottom: "48px", fontWeight: 300 }}>
                No subscriptions. No lock-in. Just git.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <button className="dl-btn" style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "16px 36px", borderRadius: "12px",
                    background: "linear-gradient(135deg, #a3e635, #4ade80)",
                    color: "#080b0f", border: "none", cursor: "pointer",
                    fontSize: "16px", fontWeight: 700,
                    transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
                }}>
                    Get Started Free <ArrowRight />
                </button>
                <button className="dl-btn" style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "16px 36px", borderRadius: "12px",
                    background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
                    color: "#94a3b8", cursor: "pointer",
                    fontSize: "16px", fontWeight: 500,
                    transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
                }}>
                    <GithubIcon /> Star on GitHub
                </button>
            </div>
        </section>
    );
}
