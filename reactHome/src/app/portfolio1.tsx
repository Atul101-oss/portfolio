import { useState, useEffect } from "react";

// ── CONFIG ──────────────────────────────────────────────
const API_BASE = "http://localhost:8000/api"; // ← your Django base URL

// ── MOCK DATA (used when API is unreachable) ─────────────
const MOCK_PROJECTS = [
  { id: 1, title: "NoteSync", short_desc: "Push your notes folder to GitHub, pull on any device. Built for Obsidian & beyond.", tags: ["Python", "Android", "GitHub API", "Kotlin"], link: "https://notesync.app", year: "2024" },
  { id: 2, title: "DevTrack", short_desc: "A lightweight issue tracker with kanban boards, built with Django REST + React.", tags: ["Django", "React", "PostgreSQL", "REST API"], link: "#", year: "2024" },
  { id: 3, title: "CampusMap", short_desc: "Real-time indoor navigation for university campuses using BLE beacons.", tags: ["Android", "Kotlin", "BLE", "Maps SDK"], link: "#", year: "2023" },
  { id: 4, title: "AutoGrade", short_desc: "ML-powered assignment grader that parses code submissions and gives instant feedback.", tags: ["Python", "scikit-learn", "FastAPI", "Docker"], link: "#", year: "2023" },
  { id: 5, title: "ChatRoom", short_desc: "Real-time encrypted group chat with WebSocket rooms and end-to-end encryption.", tags: ["Django Channels", "WebSocket", "React", "AES-256"], link: "#", year: "2022" },
  { id: 6, title: "PixelSort", short_desc: "Visual sorting algorithm playground — watch algorithms fight it out in real time.", tags: ["React", "Canvas API", "Algorithms", "Animation"], link: "#", year: "2022" },
];

const MOCK_SKILLS = {
  languages: ["Python", "JavaScript", "Kotlin", "C++", "SQL", "Bash"],
  frameworks: ["Django", "React", "FastAPI", "Django Channels", "Android SDK"],
  tools: ["Git", "Docker", "PostgreSQL", "Redis", "Linux", "Nginx"],
  cs: ["Data Structures", "OS Concepts", "Networking", "DBMS", "Algorithms"],
};

const MOCK_EXPERIENCE = [
  { id: 1, role: "Backend Intern", company: "TechCorp Pvt Ltd", period: "May 2024 – Jul 2024", desc: "Built REST APIs with Django, optimized DB queries by 40%, integrated third-party payment gateway." },
  { id: 2, role: "Open Source Contributor", company: "Various GitHub Projects", period: "2023 – Present", desc: "Contributed to 3 open source Python/React projects, merged 12+ PRs on bug fixes and feature additions." },
];

// ── API LAYER ────────────────────────────────────────────
async function apiFetch(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function useApi(path, mock) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    setStatus("loading");
    apiFetch(path)
      .then(d => { setData(d); setStatus("ok"); })
      .catch(() => { setData(mock); setStatus("mock"); });
  }, [path]);
  return { data, status };
}

// ── UI ATOMS ─────────────────────────────────────────────
function Cursor() {
  return <span style={{ animation: "blink 1s step-end infinite", color: "#00ff41" }}>█</span>;
}

function Typewriter({ text, speed = 22, onDone }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0; setDisplayed("");
    const t = setInterval(() => {
      i++; setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(t); onDone?.(); }
    }, speed);
    return () => clearInterval(t);
  }, [text]);
  return <span>{displayed}</span>;
}

function Scanlines() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
      backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.13) 2px,rgba(0,0,0,0.13) 4px)",
    }} />
  );
}

function LoadingLine({ text }) {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const t = setInterval(() => setDots(d => d.length >= 3 ? "" : d + "."), 400);
    return () => clearInterval(t);
  }, []);
  return <div style={{ fontFamily: "'Share Tech Mono',monospace", color: "#1a5c25", fontSize: "13px", padding: "16px 0" }}>{text}{dots}</div>;
}

function TermWindow({ title, children, style = {} }) {
  return (
    <div style={{ border: "1px solid #1a4020", borderRadius: "4px", overflow: "hidden", background: "#010e04", ...style }}>
      <div style={{ background: "#060f07", borderBottom: "1px solid #1a4020", padding: "7px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
        {["#ff5f57","#ffbd2e","#28c840"].map(c => (
          <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c, opacity: 0.65 }} />
        ))}
        <span style={{ marginLeft: "8px", fontFamily: "'Share Tech Mono',monospace", fontSize: "12px", color: "#2a5c30", letterSpacing: "0.04em" }}>{title}</span>
      </div>
      <div style={{ padding: "24px" }}>{children}</div>
    </div>
  );
}

function SectionHeader({ cmd, comment }) {
  return (
    <div style={{ marginBottom: "36px", fontFamily: "'Share Tech Mono',monospace" }}>
      <div style={{ color: "#1a4a20", fontSize: "12px", marginBottom: "4px" }}># {comment}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ color: "#2d6e35" }}>atul@portfolio:~$</span>
        <span style={{ color: "#00ff41", fontSize: "17px", letterSpacing: "0.04em" }}>{cmd}</span>
        <Cursor />
      </div>
      <div style={{ borderBottom: "1px solid #0a2010", marginTop: "14px" }} />
    </div>
  );
}

// ── NAV ───────────────────────────────────────────────────
const NAV_ITEMS = ["about","projects","skills","experience","resume","contact"];

function Nav({ active, onNav }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(0,8,2,0.94)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid #0a2010",
      padding: "0 40px", display: "flex", alignItems: "center", height: "52px", gap: "0",
      fontFamily: "'Share Tech Mono',monospace", fontSize: "13px",
    }}>
      <span style={{ color: "#00ff41", marginRight: "20px" }}>
        atul<span style={{ color: "#2d6e35" }}>@portfolio</span><span style={{ color: "#4caf60" }}>:~$</span>
      </span>
      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
        {NAV_ITEMS.map(item => (
          <button key={item} onClick={() => onNav(item)} style={{
            background: active === item ? "#00ff41" : "transparent",
            color: active === item ? "#000" : "#2d6e35",
            border: "1px solid", borderColor: active === item ? "#00ff41" : "#122010",
            padding: "4px 13px", borderRadius: "3px",
            fontFamily: "inherit", fontSize: "12px", cursor: "pointer",
            letterSpacing: "0.04em", transition: "all 0.15s",
          }}>
            ./{item}
          </button>
        ))}
      </div>
      <div style={{ marginLeft: "auto", color: "#122010", fontSize: "11px" }}>[ B.Tech CS • 2025 ]</div>
    </nav>
  );
}

// ── PROJECT CARD ──────────────────────────────────────────
function ProjectCard({ project, index, isOpen, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        position: "relative", zIndex: isOpen ? 3 : 1,
        transform: isOpen ? "translateY(-10px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "transform 0.38s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.3s ease",
        cursor: "pointer",
        boxShadow: isOpen
          ? "0 16px 48px rgba(0,255,65,0.18), 0 4px 16px rgba(0,0,0,0.7)"
          : "0 2px 8px rgba(0,0,0,0.5)",
        borderRadius: "4px",
      }}
    >
      <TermWindow title={`[${String(index+1).padStart(2,"0")}] ${project.title} — ${project.year}`}>
        <div style={{ fontFamily: "'Share Tech Mono',monospace" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ color: "#00ff41", fontSize: "16px", letterSpacing: "0.03em" }}>{project.title}</span>
            <span style={{ fontSize: "10px", padding: "2px 8px", border: "1px solid #0a2a10", color: "#1a5c25", borderRadius: "2px", flexShrink: 0, marginLeft: "8px" }}>{project.year}</span>
          </div>
          <div style={{ color: "#3a8a48", fontSize: "13px", lineHeight: 1.65, marginBottom: "14px", paddingLeft: "12px", borderLeft: "2px solid #0a2a10" }}>
            {project.short_desc}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
            {project.tags.map(t => (
              <span key={t} style={{ padding: "2px 9px", background: "#020d03", border: "1px solid #122010", color: "#2d7a35", fontSize: "11px", borderRadius: "2px" }}>{t}</span>
            ))}
          </div>
          <div style={{ color: "#1a4020", fontSize: "11px", textAlign: "right" }}>
            {isOpen ? "▲ collapse output" : "▼ expand output"}
          </div>
        </div>
      </TermWindow>
    </div>
  );
}

// ── EXPAND PANEL (full width, slides below the card row) ──
function ExpandPanel({ project, isOpen }) {
  return (
    <div style={{
      overflow: "hidden",
      maxHeight: isOpen ? "520px" : "0",
      transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1), margin 0.3s ease",
      marginTop: isOpen ? "-6px" : "0",
      marginBottom: isOpen ? "4px" : "0",
    }}>
      <div style={{
        border: "1px solid #00ff41", borderTop: "3px solid #00ff41",
        borderRadius: "0 0 6px 6px", background: "#000d02",
        padding: "28px 32px 24px",
        fontFamily: "'Share Tech Mono',monospace",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "22px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ color: "#1a4020", fontSize: "11px", marginBottom: "4px" }}>## stdout — {project.title}</div>
            <div style={{ color: "#00ff41", fontSize: "22px", letterSpacing: "0.05em" }}>{project.title}</div>
          </div>
          <a href={project.link} target="_blank" rel="noreferrer" style={{
            padding: "8px 20px", background: "#00ff41", color: "#000",
            textDecoration: "none", fontFamily: "inherit", fontSize: "12px",
            fontWeight: "bold", borderRadius: "3px", letterSpacing: "0.04em",
          }}>./launch ↗</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <div>
            <div style={{ color: "#1a4020", fontSize: "11px", marginBottom: "8px", letterSpacing: "0.08em" }}>DESCRIPTION</div>
            <div style={{ color: "#3a8a48", fontSize: "13px", lineHeight: 1.75, marginBottom: "20px" }}>{project.short_desc}</div>
            <div style={{ background: "#000", border: "1px solid #0a1f08", borderRadius: "3px", padding: "14px" }}>
              {[["project_id",`#${String(project.id).padStart(3,"0")}`],["year",project.year],["status","completed"],["visibility","public"]].map(([k,v]) => (
                <div key={k} style={{ fontSize: "12px", lineHeight: 1.9 }}>
                  <span style={{ color: "#122010" }}>&gt; </span>
                  <span style={{ color: "#2a6030" }}>{k}</span>
                  <span style={{ color: "#122010" }}> = </span>
                  <span style={{ color: "#3a8a48" }}>"{v}"</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: "#1a4020", fontSize: "11px", marginBottom: "8px", letterSpacing: "0.08em" }}>TECH STACK</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
              {project.tags.map(tag => (
                <span key={tag} style={{ padding: "5px 13px", background: "#010e03", border: "1px solid #00ff4155", color: "#00ff41", fontSize: "12px", borderRadius: "2px" }}>{tag}</span>
              ))}
            </div>
            <div style={{ border: "1px dashed #0a2010", borderRadius: "3px", padding: "14px" }}>
              <div style={{ color: "#1a4020", fontSize: "11px", marginBottom: "8px" }}>QUICK LINKS</div>
              {[["→ live demo", project.link],["→ source code","#"],["→ readme","#"]].map(([label,href]) => (
                <a key={label} href={href} style={{ display: "block", color: "#2d7a35", fontSize: "12px", lineHeight: 2, textDecoration: "none" }}
                  onMouseEnter={e => e.target.style.color="#00ff41"}
                  onMouseLeave={e => e.target.style.color="#2d7a35"}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// SECTIONS
// ══════════════════════════════════════════════════════════

function AboutSection() {
  const [phase, setPhase] = useState(0);
  return (
    <section id="about">
      <SectionHeader cmd="cat about.txt" comment="who am i" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <TermWindow title="whoami.sh">
          <div style={{ fontFamily: "'Share Tech Mono',monospace" }}>
            {[
              ["name", "Atul Arya"],
              ["degree", "B.Tech Computer Science"],
              ["year", "4th Year (2025)"],
              ["focus", "Backend · Android · OSS"],
              ["location", "India"],
              ["status", "open to opportunities 🟢"],
            ].map(([k,v], i) => (
              <div key={k} style={{ display: "flex", gap: "0", fontSize: "13px", lineHeight: 2.1 }}>
                <span style={{ color: "#2a6030", minWidth: "90px" }}>{k}</span>
                <span style={{ color: "#1a4020" }}>=</span>
                <span style={{ color: "#00ff41", marginLeft: "10px" }}>"{v}"</span>
              </div>
            ))}
          </div>
        </TermWindow>

        <TermWindow title="bio.txt">
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "13px", color: "#3a8a48", lineHeight: 1.8 }}>
            <div style={{ marginBottom: "10px" }}>
              <span style={{ color: "#1a4020" }}>&gt; </span>
              {phase === 0 && <Typewriter text="CS student obsessed with building things that actually work. I write backend APIs by day, Android apps by night, and occasionally question my life choices at 2am debugging a race condition." onDone={() => setPhase(1)} />}
              {phase >= 1 && "CS student obsessed with building things that actually work. I write backend APIs by day, Android apps by night, and occasionally question my life choices at 2am debugging a race condition."}
            </div>
            {phase >= 1 && (
              <div>
                <span style={{ color: "#1a4020" }}>&gt; </span>
                {phase === 1 && <Typewriter text="Currently shipping side projects, contributing to open source, and preparing for life after college." onDone={() => setPhase(2)} />}
                {phase >= 2 && "Currently shipping side projects, contributing to open source, and preparing for life after college."}
              </div>
            )}
            {phase >= 2 && (
              <div style={{ marginTop: "12px", color: "#1a4020" }}>
                <span>&gt; </span><span style={{ color: "#2a6030" }}>exit code: 0</span>
              </div>
            )}
          </div>
        </TermWindow>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const { data: projects, status } = useApi("/projects/", MOCK_PROJECTS);
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => setExpandedId(prev => prev === id ? null : id);

  const renderRows = () => {
    if (!projects) return null;
    const COLS = 2;
    const result = [];
    for (let i = 0; i < projects.length; i += COLS) {
      const rowProjects = projects.slice(i, i + COLS);
      const expandedInRow = rowProjects.find(p => p.id === expandedId) || null;
      result.push(
        <div key={`row-${i}`} style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            {rowProjects.map((p, j) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i + j}
                isOpen={expandedId === p.id}
                onToggle={() => handleToggle(p.id)}
              />
            ))}
          </div>
          <ExpandPanel project={expandedInRow || rowProjects[0]} isOpen={!!expandedInRow} />
        </div>
      );
    }
    return result;
  };

  return (
    <section id="projects">
      <SectionHeader cmd="ls -la ./projects/" comment="things i have built" />
      {status === "loading" && <LoadingLine text="fetching projects from api" />}
      {status === "mock" && (
        <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "11px", color: "#1a4020", marginBottom: "16px", padding: "8px 14px", border: "1px solid #0a1a08", borderRadius: "3px" }}>
          [WARN] api unreachable — using local mock data. update API_BASE to connect your django backend.
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {renderRows()}
      </div>
    </section>
  );
}

function SkillsSection() {
  const { data: skills, status } = useApi("/skills/", MOCK_SKILLS);
  const colorMap = { languages: "#00ff41", frameworks: "#4caf60", tools: "#2d9e40", cs: "#1a8030" };
  return (
    <section id="skills">
      <SectionHeader cmd="cat skills.json | jq" comment="tools of the trade" />
      {status === "loading" && <LoadingLine text="parsing skill tree" />}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "20px" }}>
        {skills && Object.entries(skills).map(([cat, items]) => (
          <TermWindow key={cat} title={`${cat}.list`}>
            <div style={{ fontFamily: "'Share Tech Mono',monospace" }}>
              <div style={{ color: "#1a4020", fontSize: "11px", letterSpacing: "0.08em", marginBottom: "14px" }}>## {cat.toUpperCase()}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {items.map(s => (
                  <span key={s} style={{
                    padding: "4px 12px", fontSize: "12px",
                    border: `1px solid ${colorMap[cat]}33`,
                    color: colorMap[cat], background: `${colorMap[cat]}0c`,
                    borderRadius: "2px", letterSpacing: "0.03em",
                  }}>{s}</span>
                ))}
              </div>
            </div>
          </TermWindow>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  const { data: exp, status } = useApi("/experience/", MOCK_EXPERIENCE);
  return (
    <section id="experience">
      <SectionHeader cmd="git log --oneline --experience" comment="where i have worked" />
      {status === "loading" && <LoadingLine text="fetching commit history" />}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {exp?.map((e, i) => (
          <TermWindow key={e.id} title={`commit_${String(i+1).padStart(3,"0")}.log — ${e.role}`}>
            <div style={{ fontFamily: "'Share Tech Mono',monospace" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <span style={{ color: "#00ff41", fontSize: "15px" }}>{e.role}</span>
                  <span style={{ color: "#2d6e35", fontSize: "13px" }}> @ {e.company}</span>
                </div>
                <span style={{ color: "#1a4020", fontSize: "12px", border: "1px solid #0a1a08", padding: "2px 10px", borderRadius: "2px" }}>{e.period}</span>
              </div>
              <div style={{ color: "#3a8a48", fontSize: "13px", lineHeight: 1.7, paddingLeft: "14px", borderLeft: "2px solid #0a2010" }}>{e.desc}</div>
            </div>
          </TermWindow>
        ))}
      </div>
    </section>
  );
}

function ResumeSection() {
  return (
    <section id="resume">
      <SectionHeader cmd="cat resume.txt" comment="the full picture" />
      <TermWindow title="resume.txt — Atul Arya — B.Tech CS 2025">
        <div style={{ fontFamily: "'Share Tech Mono',monospace" }}>
          {/* Header */}
          <div style={{ borderBottom: "1px solid #0a2010", paddingBottom: "22px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ color: "#00ff41", fontSize: "28px", letterSpacing: "0.06em", marginBottom: "4px" }}>ATUL ARYA</div>
              <div style={{ color: "#2d6e35", fontSize: "13px" }}>B.Tech Computer Science • 4th Year • 2025</div>
            </div>
            <div style={{ fontSize: "12px", color: "#1a5c25", display: "flex", flexDirection: "column", gap: "4px", textAlign: "right" }}>
              <span>atul@example.com</span>
              <span>github.com/atul-arya</span>
              <span>linkedin.com/in/atul-arya</span>
            </div>
          </div>

          {/* Resume sections */}
          {[
            {
              title: "EDUCATION",
              rows: [["B.Tech Computer Science","University Name","2021–2025","CGPA: 8.x / 10"]],
            },
            {
              title: "KEY PROJECTS",
              rows: [
                ["NoteSync","Folder sync daemon + Android","2024","Python · Kotlin"],
                ["DevTrack","Issue tracker REST API","2024","Django · React"],
                ["AutoGrade","ML code grader","2023","Python · FastAPI"],
                ["CampusMap","Indoor nav BLE","2023","Android · Kotlin"],
              ],
            },
            {
              title: "EXPERIENCE",
              rows: [["Backend Intern","TechCorp Pvt Ltd","May–Jul 2024","Django · REST · PostgreSQL"]],
            },
            {
              title: "SKILLS",
              rows: [
                ["Languages","Python · JS · Kotlin · C++","",""],
                ["Frameworks","Django · React · FastAPI","",""],
                ["Tools","Git · Docker · Linux · PostgreSQL","",""],
              ],
            },
          ].map(sec => (
            <div key={sec.title} style={{ marginBottom: "22px" }}>
              <div style={{ color: "#1a4020", fontSize: "11px", letterSpacing: "0.1em", marginBottom: "10px", paddingBottom: "5px", borderBottom: "1px dashed #0a1a08" }}>
                ## {sec.title}
              </div>
              {sec.rows.map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr 120px 1fr", gap: "8px", padding: "6px 0", borderBottom: "1px solid #040b03", fontSize: "12px" }}>
                  <span style={{ color: "#00ff41" }}>{row[0]}</span>
                  <span style={{ color: "#3a8a48" }}>{row[1]}</span>
                  <span style={{ color: "#1a4020" }}>{row[2]}</span>
                  <span style={{ color: "#2a6030" }}>{row[3]}</span>
                </div>
              ))}
            </div>
          ))}

          <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
            <a href="#" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "10px 24px", background: "#00ff41", color: "#000",
              textDecoration: "none", fontFamily: "inherit", fontSize: "13px",
              fontWeight: "bold", borderRadius: "3px", letterSpacing: "0.04em",
            }}>↓ download resume.pdf</a>
          </div>
        </div>
      </TermWindow>
    </section>
  );
}

function ContactSection() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState("idle"); // idle | sending | sent

  const handleSubmit = async () => {
    setState("sending");
    try {
      await fetch(`${API_BASE}/contact/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
    } catch (_) {}
    setTimeout(() => setState("sent"), 1200);
  };

  return (
    <section id="contact">
      <SectionHeader cmd="./send_message.sh" comment="get in touch" />
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "20px" }}>
        <TermWindow title="contact.sh">
          <div style={{ fontFamily: "'Share Tech Mono',monospace" }}>
            {state !== "sent" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {[
                  { key: "name", label: "your_name", placeholder: "enter name..." },
                  { key: "email", label: "your_email", placeholder: "enter email..." },
                ].map(f => (
                  <div key={f.key}>
                    <div style={{ color: "#1a5c25", fontSize: "12px", marginBottom: "6px" }}>$ {f.label}=</div>
                    <input value={fields[f.key]} onChange={e => setFields(p => ({...p,[f.key]:e.target.value}))}
                      placeholder={f.placeholder} style={{
                        width: "100%", background: "#000d03", border: "1px solid #122010",
                        color: "#00ff41", fontFamily: "inherit", fontSize: "13px",
                        padding: "10px 14px", borderRadius: "3px", outline: "none",
                      }} />
                  </div>
                ))}
                <div>
                  <div style={{ color: "#1a5c25", fontSize: "12px", marginBottom: "6px" }}>$ message=</div>
                  <textarea rows={4} value={fields.message} onChange={e => setFields(p => ({...p,message:e.target.value}))}
                    placeholder="your message here..." style={{
                      width: "100%", background: "#000d03", border: "1px solid #122010",
                      color: "#00ff41", fontFamily: "inherit", fontSize: "13px",
                      padding: "10px 14px", borderRadius: "3px", outline: "none", resize: "vertical",
                    }} />
                </div>
                <button onClick={handleSubmit} disabled={state==="sending"} style={{
                  alignSelf: "flex-start", padding: "10px 24px",
                  background: state==="sending" ? "#0a1a08" : "#00ff41",
                  color: state==="sending" ? "#1a4020" : "#000",
                  border: "none", fontFamily: "inherit", fontSize: "13px", fontWeight: "bold",
                  borderRadius: "3px", cursor: state==="sending" ? "wait" : "pointer",
                }}>
                  {state==="sending" ? "sending..." : "$ ./send_message.sh ↵"}
                </button>
              </div>
            ) : (
              <div style={{ color: "#00ff41", lineHeight: 2.2, fontSize: "13px" }}>
                <div style={{ color: "#1a5c25" }}>[INFO] dispatching message...</div>
                <div>[OK] &nbsp;message delivered successfully.</div>
                <div>[OK] &nbsp;thanks for reaching out, {fields.name || "stranger"}.</div>
                <div>[OK] &nbsp;reply expected at: {fields.email || "your inbox"}</div>
                <div style={{ marginTop: "10px", color: "#1a4020" }}>exit code: 0 ✓</div>
              </div>
            )}
          </div>
        </TermWindow>

        <TermWindow title="links.txt">
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "13px" }}>
            <div style={{ color: "#1a4020", fontSize: "11px", marginBottom: "16px", letterSpacing: "0.08em" }}>## FIND ME AT</div>
            {[
              { label: "github", val: "github.com/atul-arya", href: "#" },
              { label: "email", val: "atul@example.com", href: "mailto:atul@example.com" },
              { label: "linkedin", val: "in/atul-arya", href: "#" },
              { label: "twitter", val: "@atul_arya", href: "#" },
            ].map(({ label, val, href }) => (
              <div key={label} style={{ marginBottom: "14px" }}>
                <div style={{ color: "#1a4020", fontSize: "11px", marginBottom: "2px" }}>{label}/</div>
                <a href={href} style={{ color: "#3a8a48", textDecoration: "none", fontSize: "12px" }}
                  onMouseEnter={e => e.target.style.color="#00ff41"}
                  onMouseLeave={e => e.target.style.color="#3a8a48"}>
                  → {val}
                </a>
              </div>
            ))}
            <div style={{ marginTop: "24px", borderTop: "1px dashed #0a1a08", paddingTop: "16px", color: "#1a4020", fontSize: "11px", lineHeight: 1.8 }}>
              response time: ~24h<br/>
              timezone: IST (UTC+5:30)<br/>
              preferred: email / github
            </div>
          </div>
        </TermWindow>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
// BOOT + APP ROOT
// ══════════════════════════════════════════════════════════
const BOOT_LINES = [
  "[BIOS] initializing portfolio kernel v1.0...",
  "[MEM]  allocating 64MB for project cache...",
  "[NET]  connecting to django api...",
  "[FS]   mounting project filesystem...",
  "[OK]   skill tree parsed successfully",
  "[OK]   experience log loaded",
  "[OK]   contact module active",
  "",
  "██████████████████████████████ 100%",
  "",
  "Welcome to atul@portfolio — press any key to continue.",
];

export default function Portfolio1() {
  const [booted, setBooted] = useState(false);
  const [bootLines, setBootLines] = useState([]);
  const [activeNav, setActiveNav] = useState("about");

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setBootLines(prev => [...prev, BOOT_LINES[i]]);
      i++;
      if (i >= BOOT_LINES.length) { clearInterval(t); setTimeout(() => setBooted(true), 700); }
    }, 180);
    return () => clearInterval(t);
  }, []);

  const handleNav = (section) => {
    setActiveNav(section);
    setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  if (!booted) return (
    <div style={{ minHeight: "100vh", background: "#000802", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Share Tech Mono',monospace" }}>
      <Scanlines />
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)" }} />
      <div style={{ maxWidth: "560px", width: "100%", padding: "40px", position: "relative", zIndex: 1 }}>
        <div style={{ color: "#00ff41", fontSize: "22px", marginBottom: "8px", letterSpacing: "0.1em" }}>ATUL ARYA :: PORTFOLIO</div>
        <div style={{ color: "#1a4020", fontSize: "12px", marginBottom: "28px" }}>─────────────────────────────────</div>
        {bootLines.map((line, i) => (
          <div key={i} style={{
            fontSize: "13px", lineHeight: 1.9,
            color: line.startsWith("[OK]") ? "#2d9e40"
              : line.includes("100%") ? "#00ff41"
              : line.startsWith("[") ? "#1a7a2a"
              : line === "" ? "transparent" : "#3a8a48",
          }}>{line || "‎"}</div>
        ))}
        <Cursor />
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#000802", color: "#3a8a48" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#000802;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        section{animation:fadeSlide 0.5s ease forwards;}
        ::-webkit-scrollbar{width:5px;background:#000802;}
        ::-webkit-scrollbar-thumb{background:#0a2010;border-radius:2px;}
        input,textarea{transition:border-color 0.2s;}
        input:focus,textarea:focus{border-color:#00ff4166 !important;}
        input::placeholder,textarea::placeholder{color:#122010;}
      `}</style>
      <Scanlines />
      <div style={{ position: "fixed", inset: 0, zIndex: 9998, pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.5) 100%)" }} />

      <Nav active={activeNav} onNav={handleNav} />

      {/* Hero banner */}
      <div style={{
        borderBottom: "1px solid #0a2010",
        padding: "64px 40px 52px",
        background: "linear-gradient(180deg, #010e03 0%, #000802 100%)",
        fontFamily: "'VT323',monospace",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background grid decoration */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, opacity: 0.04,
          backgroundImage: "repeating-linear-gradient(0deg, #00ff41 0px, #00ff41 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, #00ff41 0px, #00ff41 1px, transparent 1px, transparent 32px)",
        }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "clamp(56px,9vw,104px)", color: "#00ff41", lineHeight: 0.95, letterSpacing: "0.04em", marginBottom: "14px", textShadow: "0 0 30px rgba(0,255,65,0.3)" }}>
            ATUL ARYA
          </div>
          <div style={{ fontSize: "clamp(18px,2.5vw,26px)", color: "#1a6022", letterSpacing: "0.08em", marginBottom: "20px" }}>
            CS STUDENT &nbsp;·&nbsp; BACKEND ENGINEER &nbsp;·&nbsp; OPEN SOURCE BUILDER
          </div>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "13px", color: "#0f4018", display: "flex", gap: "28px", flexWrap: "wrap" }}>
            <span style={{ color: "#1a5c25" }}>▸ {MOCK_PROJECTS.length} projects shipped</span>
            <span>▸ 4th year B.Tech CS</span>
            <span>▸ available for opportunities</span>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 40px", display: "flex", flexDirection: "column", gap: "88px" }}>
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ResumeSection />
        <ContactSection />
      </main>

      <footer style={{
        borderTop: "1px solid #0a2010", padding: "22px 40px",
        fontFamily: "'Share Tech Mono',monospace", fontSize: "12px",
        color: "#122010", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px",
      }}>
        <span>atul@portfolio:~$ <span style={{ color: "#1a4020" }}>exit 0</span></span>
        <span>built with React + Django &nbsp;·&nbsp; © 2025 Atul Arya</span>
      </footer>
    </div>
  );
}