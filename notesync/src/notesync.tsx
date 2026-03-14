"use client";

import { useState, useEffect, useRef } from "react";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const AndroidIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4483-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C3.4545 10.1867 1.5 12.5198 1.5 15.2815h21c0-2.7617-1.9545-5.0948-4.6185-5.9601"/>
  </svg>
);

const LinuxIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.533-.05.203-.07.392-.044.547.041.266.178.509.443.705.27.19.68.338 1.183.363.493.026.969-.074 1.415-.234.406-.144.822-.332 1.204-.524.407.125.824.23 1.255.3 1.44.23 2.97.23 4.5 0 .43-.07.847-.176 1.255-.3.382.192.798.38 1.203.524.447.16.922.26 1.416.234.503-.025.913-.172 1.182-.363.264-.196.402-.44.443-.705.026-.155.006-.344-.044-.547.028-.133.055-.334.055-.533a1.032 1.032 0 00-.132-.602c-.206-.411-.55-.544-.864-.68-.312-.133-.598-.2-.797-.4-.214-.239-.404-.571-.664-.839a.424.424 0 00-.11-.135c.122-.805-.009-1.657-.287-2.489-.59-1.772-1.832-3.47-2.716-4.521-.75-1.067-.974-1.928-1.05-3.02-.065-1.491 1.057-5.965-3.17-6.298A6.022 6.022 0 0012.504 0zM10 12c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zm4 0c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"/>
  </svg>
);

// const SyncIcon = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
//     <path d="M23 4v6h-6M1 20v-6h6"/>
//     <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
//   </svg>
// );

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.097.903 2 2 2h16c1.097 0 2-.903 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const DevicesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);

const ZapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const TerminalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <polyline points="4 17 10 11 4 5"/>
    <line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
);

type AnimatedCounterProps = {
  target: number;
  duration?: number;
};

function AnimatedCounter({ target, duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

function SyncAnimation() {
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

export default function NoteSync() {
  const [activeTab, setActiveTab] = useState("android");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const installCmd = "sudo dpkg -i notesync.deb";

  const features = [
    { icon: <FolderIcon />, title: "Folder-First Sync", desc: "Point NoteSync at any local folder. It handles the rest — tracking changes, committing, and pushing to your private GitHub repo automatically." },
    { icon: <ShieldIcon />, title: "Your Repo, Your Rules", desc: "No proprietary cloud. Your notes live in a GitHub repo you own. Private, auditable, and accessible forever." },
    { icon: <DevicesIcon />, title: "Any Device, Anywhere", desc: "Fetch your notes on Android with the companion app, or pull on any Linux machine with the CLI. True cross-device freedom." },
    { icon: <ZapIcon />, title: "Works with Everything", desc: "Built for Obsidian, Logseq, Joplin — or any app that saves files locally. Also syncs documents, media, and code." },
  ];

  const useCases = [
    { emoji: "📝", label: "Obsidian vaults", color: "#a78bfa" },
    { emoji: "📓", label: "Logseq graphs", color: "#60a5fa" },
    { emoji: "🖼", label: "Media libraries", color: "#f472b6" },
    { emoji: "📁", label: "Work documents", color: "#34d399" },
    { emoji: "💻", label: "Code projects", color: "#facc15" },
    { emoji: "📚", label: "Research notes", color: "#fb923c" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080b0f",
      color: "#e2e8f0",
      fontFamily: "'Geist', 'DM Sans', sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=DM+Serif+Display:ital@0;1&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gridScroll {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .feature-card:hover {
          transform: translateY(-4px);
          border-color: rgba(163, 230, 53, 0.3) !important;
          background: rgba(255,255,255,0.04) !important;
        }
        .dl-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(163, 230, 53, 0.25);
        }
        .tab-btn:hover { opacity: 0.85; }
        .use-pill:hover { transform: scale(1.05); }
      `}</style>

      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(163,230,53,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.04) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)",
      }} />

      {/* Glow orbs */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
          width: "900px", height: "600px",
          background: "radial-gradient(ellipse, rgba(163,230,53,0.08) 0%, transparent 70%)",
          animation: "glow 4s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", top: "60%", left: "-10%",
          width: "500px", height: "500px",
          background: "radial-gradient(ellipse, rgba(96,165,250,0.06) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", top: "40%", right: "-10%",
          width: "500px", height: "500px",
          background: "radial-gradient(ellipse, rgba(167,139,250,0.06) 0%, transparent 70%)",
        }} />
      </div>

      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: "64px",
        background: "rgba(8,11,15,0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "28px", height: "28px", borderRadius: "8px",
            background: "linear-gradient(135deg, #a3e635, #4ade80)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px",
          }}>⚡</div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", letterSpacing: "-0.02em" }}>
            NoteSync
          </span>
        </div>
        <div style={{ display: "flex", gap: "32px", fontSize: "14px", color: "#94a3b8" }}>
          {["Features", "How it Works", "Download"].map(l => (
            <a key={l} href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#e2e8f0")}
              onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}>{l}</a>
          ))}
        </div>
        <a href="#" style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "8px 16px", borderRadius: "8px",
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          color: "#e2e8f0", textDecoration: "none", fontSize: "13px",
          transition: "all 0.2s",
        }}>
          <GithubIcon /> GitHub
        </a>
      </nav>

      {/* Hero */}
      <section style={{
        position: "relative", zIndex: 1,
        maxWidth: "1100px", margin: "0 auto",
        padding: "120px 40px 80px",
        animation: "slideUp 0.8s ease forwards",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "6px 14px", borderRadius: "100px",
          background: "rgba(163,230,53,0.1)", border: "1px solid rgba(163,230,53,0.25)",
          fontSize: "12px", fontFamily: "'DM Mono', monospace",
          color: "#a3e635", marginBottom: "32px",
          letterSpacing: "0.05em",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a3e635", animation: "pulse 2s infinite" }} />
          OPEN SOURCE · SELF-HOSTED · ZERO CLOUD
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
          Your notes,<br />
          <em style={{ color: "#a3e635", WebkitTextFillColor: "#a3e635" }}>everywhere</em>.
        </h1>

        <p style={{
          fontSize: "20px", color: "#64748b", lineHeight: "1.7",
          maxWidth: "560px", marginBottom: "48px", fontWeight: 300,
        }}>
          NoteSync pushes your local folder to GitHub and pulls it back on any device.
          Made for Obsidian, Logseq, or anything that lives on disk.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <button className="dl-btn" style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "14px 28px", borderRadius: "12px",
            background: "linear-gradient(135deg, #a3e635, #4ade80)",
            color: "#080b0f", border: "none", cursor: "pointer",
            fontSize: "15px", fontWeight: 600,
            transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
          }}>
            <AndroidIcon /> Get Android App
          </button>
          <button className="dl-btn" style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "14px 28px", borderRadius: "12px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#e2e8f0", cursor: "pointer",
            fontSize: "15px", fontWeight: 500,
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

      {/* Stats bar */}
      <div style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
      }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          padding: "0 40px",
        }}>
          {[
            { val: 0, label: "Cloud dependency", prefix: "", suffix: "" },
            { val: 100, label: "Your data ownership", prefix: "", suffix: "%" },
            { val: 2, label: "Platforms supported", prefix: "", suffix: "+" },
            { val: 1, label: "Git repo, unlimited devices", prefix: "", suffix: "" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "32px 24px",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
              textAlign: "center",
            }}>
              <div style={{
                fontSize: "42px", fontFamily: "'DM Serif Display', serif",
                color: "#a3e635", marginBottom: "6px",
              }}>
                {s.prefix}<AnimatedCounter target={s.val} />{s.suffix}
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 400 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
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

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "40px", alignItems: "center",
        }}>
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

      {/* Features */}
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
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}>
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

      {/* Use cases */}
      <section style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "80px 40px",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "32px" }}>Works great for</p>
          <div style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px",
          }}>
            {useCases.map((u, i) => (
              <div key={i} className="use-pill" style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "12px 22px", borderRadius: "100px",
                background: `${u.color}12`,
                border: `1px solid ${u.color}30`,
                cursor: "default", transition: "transform 0.2s",
              }}>
                <span style={{ fontSize: "18px" }}>{u.emoji}</span>
                <span style={{ fontSize: "14px", color: u.color, fontWeight: 500 }}>{u.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download */}
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

        {/* Tab selector */}
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

        {/* Tab content */}
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

      {/* CTA */}
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

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "32px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "16px",
        color: "#475569", fontSize: "13px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "20px", height: "20px", borderRadius: "6px",
            background: "linear-gradient(135deg, #a3e635, #4ade80)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "10px",
          }}>⚡</div>
          <span style={{ fontFamily: "'DM Serif Display', serif" }}>NoteSync</span>
          <span>— MIT License</span>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {["GitHub", "Issues", "Docs"].map(l => (
            <a key={l} href="#" style={{ color: "inherit", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
