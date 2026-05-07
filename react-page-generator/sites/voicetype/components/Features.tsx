import { MicrophoneIcon, KeyboardIcon, ShieldIcon, MonitorIcon } from "./Icons";

export default function Features() {
    const features = [
        { icon: <MicrophoneIcon />, title: "Real-time Transcription", desc: "Speak naturally and see your words appear instantly. VoiceType uses advanced speech recognition to deliver accurate, low-latency transcription." },
        { icon: <KeyboardIcon />, title: "System-wide Input", desc: "Works with any focused input field — browsers, text editors, terminals, IDEs. No plugins or integrations needed." },
        { icon: <MonitorIcon />, title: "Linux Native", desc: "Built from the ground up for Linux. Lightweight, runs as a background service, and integrates seamlessly with your desktop environment." },
        { icon: <ShieldIcon />, title: "Privacy First", desc: "All voice processing stays on your machine. No audio leaves your device, no cloud services, no data collection. Your voice, your control." },
    ];

    return (
        <section id="features" style={{
            position: "relative", zIndex: 1,
            maxWidth: "1100px", margin: "0 auto",
            padding: "0 40px 100px",
        }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
                <p style={{ fontSize: "12px", fontFamily: "'DM Mono', monospace", color: "#22d3ee", letterSpacing: "0.1em", marginBottom: "16px" }}>FEATURES</p>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "48px", letterSpacing: "-0.03em", color: "#f1f5f9" }}>
                    Built for power users
                </h2>
            </div>
            <style>{`
        .vt-features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 768px) {
          .vt-features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
            <div className="vt-features-grid">
                {features.map((f, i) => (
                    <div key={i} className="vt-feature-card" style={{
                        padding: "36px", borderRadius: "20px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        transition: "all 0.3s ease",
                        cursor: "default",
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.borderColor = "rgba(34,211,238,0.3)";
                            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                            e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                        }}
                    >
                        <div style={{
                            width: "56px", height: "56px", borderRadius: "14px",
                            background: "rgba(34,211,238,0.1)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#22d3ee", marginBottom: "20px",
                        }}>{f.icon}</div>
                        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px", color: "#f1f5f9" }}>{f.title}</h3>
                        <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7 }}>{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
