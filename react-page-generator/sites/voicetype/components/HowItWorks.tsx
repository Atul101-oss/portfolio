"use client";

export default function HowItWorks() {
    const steps = [
        {
            num: "01",
            title: "Activate",
            desc: "Press your hotkey or click the system tray icon to start listening. VoiceType runs silently in the background until you need it.",
            emoji: "⌨️",
        },
        {
            num: "02",
            title: "Speak",
            desc: "Talk naturally into your microphone. VoiceType captures your voice and processes it locally with a state-of-the-art speech model.",
            emoji: "🎤",
        },
        {
            num: "03",
            title: "Typed",
            desc: "Your words appear instantly in whatever input field is focused — browser, editor, terminal. It's that simple.",
            emoji: "✨",
        },
    ];

    return (
        <section id="how-it-works" style={{
            position: "relative", zIndex: 1,
            maxWidth: "1100px", margin: "0 auto",
            padding: "0 40px 100px",
        }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
                <p style={{ fontSize: "12px", fontFamily: "'DM Mono', monospace", color: "#22d3ee", letterSpacing: "0.1em", marginBottom: "16px" }}>HOW IT WORKS</p>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "48px", letterSpacing: "-0.03em", color: "#f1f5f9" }}>
                    Three simple steps
                </h2>
            </div>

            <style>{`
        .vt-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 768px) {
          .vt-steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

            <div className="vt-steps-grid">
                {steps.map((step, i) => (
                    <div key={i} style={{
                        position: "relative",
                        padding: "40px 32px",
                        borderRadius: "20px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.borderColor = "rgba(34,211,238,0.25)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                        }}
                    >
                        {/* Step number */}
                        <div style={{
                            position: "absolute", top: "16px", right: "20px",
                            fontSize: "48px", fontFamily: "'DM Mono', monospace",
                            fontWeight: 700, color: "rgba(34,211,238,0.07)",
                            lineHeight: 1,
                        }}>{step.num}</div>

                        <div style={{
                            fontSize: "48px", marginBottom: "20px",
                            animation: "float 3s ease-in-out infinite",
                            animationDelay: `${i * 0.3}s`,
                            display: "inline-block",
                        }}>{step.emoji}</div>

                        <h3 style={{
                            fontSize: "22px", fontWeight: 600,
                            marginBottom: "12px", color: "#f1f5f9",
                        }}>{step.title}</h3>

                        <p style={{
                            fontSize: "14px", color: "#64748b",
                            lineHeight: 1.7,
                        }}>{step.desc}</p>

                        {/* Connector arrow */}
                        {i < steps.length - 1 && (
                            <div className="vt-step-arrow" style={{
                                position: "absolute", top: "50%", right: "-16px",
                                transform: "translateY(-50%)",
                                color: "rgba(34,211,238,0.3)",
                                fontSize: "20px", zIndex: 2,
                            }}>→</div>
                        )}
                    </div>
                ))}
            </div>

            <style>{`
        @media (max-width: 768px) {
          .vt-step-arrow { display: none !important; }
        }
      `}</style>
        </section>
    );
}
