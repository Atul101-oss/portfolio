import { FolderIcon, ShieldIcon, DevicesIcon, ZapIcon } from "./Icons";

export default function Features() {
    const features = [
        { icon: <FolderIcon />, title: "Folder-First Sync", desc: "Point NoteSync at any local folder. It handles the rest — tracking changes, committing, and pushing to your private GitHub repo automatically." },
        { icon: <ShieldIcon />, title: "Your Repo, Your Rules", desc: "No proprietary cloud. Your notes live in a GitHub repo you own. Private, auditable, and accessible forever." },
        { icon: <DevicesIcon />, title: "Any Device, Anywhere", desc: "Fetch your notes on Android with the companion app, or pull on any Linux machine with the CLI. True cross-device freedom." },
        { icon: <ZapIcon />, title: "Works with Everything", desc: "Built for Obsidian, Logseq, Joplin — or any app that saves files locally. Also syncs documents, media, and code." },
    ];

    return (
        <section style={{
            position: "relative", zIndex: 1,
            maxWidth: "1100px", margin: "0 auto",
            padding: "0 40px 100px",
        }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
                <p style={{ fontSize: "12px", fontFamily: "'DM Mono', monospace", color: "#a3e635", letterSpacing: "0.1em", marginBottom: "16px" }}>FEATURES</p>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "48px", letterSpacing: "-0.03em" }}>
                    Built for power users
                </h2>
            </div>
            <style>{`
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                }
                @media (max-width: 768px) {
                    .features-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
            <div className="features-grid">
                {features.map((f, i) => (
                    <div key={i} className="feature-card" style={{
                        padding: "36px", borderRadius: "20px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        transition: "all 0.3s ease",
                        cursor: "default",
                    }}>
                        <div style={{
                            width: "56px", height: "56px", borderRadius: "14px",
                            background: "rgba(163,230,53,0.1)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#a3e635", marginBottom: "20px",
                        }}>{f.icon}</div>
                        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px" }}>{f.title}</h3>
                        <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7 }}>{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
