"use client";

import { useState, useEffect, useRef } from "react";

// ─── Dynamic API base: same host in prod, Railway in dev ──────────────────────
const getApiBase = (): string => {
  const { hostname, port, protocol } = window.location;
  const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
  if (isLocal) return "https://portfolio-production-6791.up.railway.app";
  return `${protocol}//${hostname}${port ? `:${port}` : ""}`;
};

const API = {
  projects: () => `${getApiBase()}/api/v1/projects_serializer`,
  skills:   () => `${getApiBase()}/api/v1/skills_serializer`,
  experience: () => `${getApiBase()}/api/v1/experience_serializer`,
  about:    () => `${getApiBase()}/api/v1/about_serializer`,
};

// ─── Mock fallbacks ────────────────────────────────────────────────────────────
const MOCK = {
  about: {
    name: "Atul",
    title: "Computer Science Student",
    bio: "4th year CS student passionate about building tools that solve real problems. I love open-source, systems programming, and making dev workflows smoother.",
    avatar_url: null,
    resume_url: "#",
    github: "https://github.com/Atul101-oss",
    linkedin: "#",
    email: "atul@example.com",
  },
  projects: [
    { id: 1, title: "Note Sync", description: "Synchronise your notes across different devices using GitHub as a backend. Works with Obsidian, Logseq, and any folder-based note tool.", technologies: ["Kotlin", "Android"], github_url: "https://github.com/Atul101-oss/note_sync", live_url: "https://github.com/Atul101-oss/note_sync", image_url: null, created_at: "2026-03-03T08:15:40Z" },
    { id: 2, title: "Medical Diagnose", description: "Lightweight skin disease detection web app using a machine learning model. Runs entirely in the browser with no backend required.", technologies: ["JavaScript", "TypeScript", "HTML", "CSS", "Tailwind"], github_url: "#", live_url: "#", image_url: null, created_at: "2026-03-04T17:06:15Z" },
  ],
  skills: [
    { category: "Languages", items: ["Python", "Kotlin", "JavaScript", "TypeScript", "C++"] },
    { category: "Frontend", items: ["React", "HTML", "CSS", "Tailwind"] },
    { category: "Backend", items: ["Django", "Django REST Framework", "PostgreSQL"] },
    { category: "Tools", items: ["Git", "GitHub", "Linux", "Docker"] },
  ],
  experience: [
    { id: 1, role: "Open Source Contributor", company: "Personal Projects", duration: "2023 – Present", description: "Building and maintaining open-source tools including NoteSync, a cross-device note synchronisation system." },
  ],
};

// ─── Fetch with fallback ───────────────────────────────────────────────────────
async function apiFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error();
    return (await r.json()) as T;
  } catch {
    return fallback;
  }
}

// ─── Icons ─────────────────────────────────────────────────────────────────────
type IconSizeProps = { size?: number };

const GithubIcon = ({ size = 18 }: IconSizeProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkIcon = ({ size = 16 }: IconSizeProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

type ChevronProps = { size?: number; rotated?: boolean };

const ChevronDown = ({ size = 16, rotated = false }: ChevronProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    style={{ transition: "transform 0.3s ease", transform: rotated ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const MailIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

// ─── Helpers ───────────────────────────────────────────────────────────────────
function techColor(tech: string): string {
  const map = {
    python: "#3b82f6", kotlin: "#a855f7", javascript: "#eab308",
    typescript: "#3b82f6", react: "#06b6d4", django: "#16a34a",
    html: "#f97316", css: "#6366f1", tailwind: "#0ea5e9",
    android: "#86efac", "c++": "#ef4444", java: "#f59e0b",
  };
  return map[tech.toLowerCase()] || "#94a3b8";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function initials(name: string): string {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
type SkeletonProps = { w?: string | number; h?: number; r?: number };

const Skeleton = ({ w = "100%", h = 20, r = 6 }: SkeletonProps) => (
  <div style={{
    width: w, height: h, borderRadius: r,
    background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
  }} />
);

// ─── Nav ───────────────────────────────────────────────────────────────────────
type NavProps = { sections: string[]; active: string };

function Nav({ sections, active }: NavProps) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid #e2e8f0",
      padding: "0 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "60px",
    }}>
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#0f172a", letterSpacing: "-0.02em" }}>
        Atul<span style={{ color: "#64748b", fontWeight: 400 }}>.dev</span>
      </span>
      <div style={{ display: "flex", gap: "6px" }}>
        {sections.map(s => (
          <a key={s} href={`#${s.toLowerCase()}`} style={{
            padding: "6px 14px", borderRadius: "6px", fontSize: "13px", fontWeight: 500,
            color: active === s ? "#0f172a" : "#64748b",
            background: active === s ? "#f1f5f9" : "transparent",
            textDecoration: "none", transition: "all 0.2s",
          }}>{s}</a>
        ))}
      </div>
    </nav>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github_url?: string | null;
  live_url?: string | null;
  image_url?: string | null;
  created_at: string;
};

type ProjectCardProps = {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
};

function ProjectCard({ project, isOpen, onToggle }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const imgBase = getApiBase();

  return (
    <div style={{ position: "relative" }}>
      {/* Main card — lifts when open */}
      <div
        ref={cardRef}
        onClick={onToggle}
        style={{
          position: "relative", zIndex: isOpen ? 3 : 1,
          background: "#fff",
          border: `1.5px solid ${isOpen ? "#cbd5e1" : "#e2e8f0"}`,
          borderRadius: "16px",
          padding: "28px",
          cursor: "pointer",
          transition: "transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease, border-color 0.2s",
          transform: isOpen ? "translateY(-6px)" : "translateY(0)",
          boxShadow: isOpen
            ? "0 20px 48px rgba(15,23,42,0.14)"
            : "0 1px 4px rgba(15,23,42,0.06)",
          userSelect: "none",
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "12px",
            background: project.image_url ? `url(${imgBase}${project.image_url}) center/cover` : "linear-gradient(135deg,#e0f2fe,#bae6fd)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", fontWeight: 700, color: "#0284c7",
            flexShrink: 0,
          }}>
            {!project.image_url && project.title[0]}
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ fontSize: "11px", color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>
              {formatDate(project.created_at)}
            </span>
            <ChevronDown rotated={isOpen} />
          </div>
        </div>

        <h3 style={{ fontSize: "17px", fontWeight: 650, color: "#0f172a", marginBottom: "8px", letterSpacing: "-0.01em" }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "13.5px", color: "#64748b", lineHeight: 1.65, marginBottom: "16px" }}>
          {project.description}
        </p>

        {/* Tech pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.technologies.map(t => (
            <span key={t} style={{
              padding: "3px 10px", borderRadius: "100px",
              fontSize: "11px", fontWeight: 600,
              background: techColor(t) + "18",
              color: techColor(t),
              border: `1px solid ${techColor(t)}33`,
              fontFamily: "'DM Mono', monospace",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Expanding preview panel — slides down under the card */}
      <div style={{
        overflow: "hidden",
        maxHeight: isOpen ? "320px" : "0px",
        transition: "max-height 0.4s cubic-bezier(.22,1,.36,1)",
        marginTop: "-4px",
      }}>
        <div
          ref={previewRef}
          style={{
            background: "#f8fafc",
            border: "1.5px solid #e2e8f0",
            borderTop: "none",
            borderRadius: "0 0 16px 16px",
            padding: "28px 28px 24px",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 0.3s ease 0.1s",
          }}
        >
          <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.75, marginBottom: "20px" }}>
            {project.description}
            {" "}This project demonstrates proficiency in{" "}
            {project.technologies.slice(0, 3).join(", ")}{project.technologies.length > 3 ? " and more" : ""}.
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {project.live_url && project.live_url !== "#" && (
              <a href={project.live_url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "9px 18px", borderRadius: "8px",
                background: "#0f172a", color: "#fff",
                fontSize: "13px", fontWeight: 600, textDecoration: "none",
                transition: "background 0.2s",
              }}>
                <LinkIcon size={13} /> View Project
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "9px 18px", borderRadius: "8px",
                background: "#fff", color: "#0f172a",
                border: "1.5px solid #e2e8f0",
                fontSize: "13px", fontWeight: 600, textDecoration: "none",
                transition: "border-color 0.2s",
              }}>
                <GithubIcon size={13} /> Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
type SectionProps = {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
};

function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} style={{ padding: "80px 0", borderBottom: "1px solid #f1f5f9" }}>
      <div style={{ maxWidth: "880px", margin: "0 auto", padding: "0 40px" }}>
        {title && (
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "36px", color: "#0f172a",
              letterSpacing: "-0.03em", marginBottom: "8px",
            }}>{title}</h2>
            {subtitle && <p style={{ fontSize: "15px", color: "#94a3b8" }}>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  type About = {
    name: string;
    title: string;
    bio: string;
    avatar_url: string | null;
    resume_url: string | null;
    github: string;
    linkedin: string;
    email: string;
  };
  type SkillGroup = { category: string; items: string[] };
  type SkillItem = { name: string; category?: string };
  type Experience = {
    id: number;
    role: string;
    company: string;
    duration?: string;
    date_range?: string;
    description: string;
  };
  type DataState = {
    projects: Project[] | null;
    skills: SkillGroup[] | SkillItem[] | null;
    experience: Experience[] | null;
    about: About | null;
  };

  const [data, setData] = useState<DataState>({ projects: null, skills: null, experience: null, about: null });
  const [loading, setLoading] = useState(true);
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState("About");
  const [resumeExpanded, setResumeExpanded] = useState(false);

  useEffect(() => {
    Promise.all([
      apiFetch(API.projects(), MOCK.projects),
      apiFetch(API.skills(), MOCK.skills),
      apiFetch(API.experience(), MOCK.experience),
      apiFetch(API.about(), MOCK.about),
    ]).then(([projects, skills, experience, about]) => {
      setData({ projects, skills, experience, about });
      setLoading(false);
    });
  }, []);

  // Normalize skills — API might return flat list or grouped
  const normalizedSkills = (() => {
    if (!data.skills) return MOCK.skills;
    if (Array.isArray(data.skills) && data.skills[0]?.category) return data.skills;
    // flat list — group by category field or just show as one group
    if (Array.isArray(data.skills) && (data.skills[0] as SkillItem)?.name) {
      const groups: Record<string, string[]> = {};
      data.skills.forEach(s => {
        const skill = s as SkillItem;
        const cat = skill.category || "Skills";
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(skill.name);
      });
      return Object.entries(groups).map(([category, items]) => ({ category, items }));
    }
    return MOCK.skills;
  })();

  const about = data.about || MOCK.about;
  const navSections = ["About", "Projects", "Skills", "Experience", "Resume", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      const offsets = navSections.map(s => {
        const el = document.getElementById(s.toLowerCase());
        return el ? { s, top: el.getBoundingClientRect().top } : null;
      }).filter((o): o is { s: string; top: number } => Boolean(o));
      const active = offsets.find(o => o.top > -80) || offsets[offsets.length - 1];
      if (active) setActiveNav(active.s);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navSections]);

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        a:hover { opacity: 0.8; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      `}</style>

      <Nav sections={navSections} active={activeNav} />

      {/* ── Hero / About ─────────────────────────────────────────────── */}
      <section id="about" style={{
        maxWidth: "880px", margin: "0 auto", padding: "100px 40px 80px",
        animation: "fadeUp 0.7s ease forwards",
      }}>
        <div style={{ display: "flex", gap: "40px", alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Avatar */}
          <div style={{
            width: "88px", height: "88px", borderRadius: "50%", flexShrink: 0,
            background: about.avatar_url ? `url(${about.avatar_url}) center/cover` : "linear-gradient(135deg,#dbeafe,#e0e7ff)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "28px", fontWeight: 700, color: "#4f46e5",
            border: "3px solid #fff", boxShadow: "0 0 0 2px #e2e8f0",
          }}>
            {!about.avatar_url && (loading ? "?" : initials(about.name || "A"))}
          </div>

          <div style={{ flex: 1, minWidth: "260px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#f0fdf4", border: "1px solid #bbf7d0",
              borderRadius: "100px", padding: "4px 12px",
              fontSize: "12px", color: "#15803d", fontWeight: 500, marginBottom: "16px",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "blink 2s infinite", display: "inline-block" }} />
              Open to opportunities
            </div>
            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Skeleton w="240px" h={40} r={8} />
                <Skeleton w="180px" h={20} r={6} />
                <Skeleton h={16} />
                <Skeleton w="80%" h={16} />
              </div>
            ) : (
              <>
                <h1 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(40px,6vw,60px)", color: "#0f172a",
                  letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "8px",
                }}>
                  {about.name || "Atul"}<span style={{ color: "#94a3b8" }}>.</span>
                </h1>
                <p style={{ fontSize: "16px", color: "#64748b", marginBottom: "20px", fontWeight: 400 }}>
                  {about.title || "4th Year CS Student"}
                </p>
                <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.8, maxWidth: "540px", marginBottom: "28px" }}>
                  {about.bio || MOCK.about.bio}
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {[
                    { href: about.github || MOCK.about.github, icon: <GithubIcon />, label: "GitHub" },
                    { href: `mailto:${about.email || MOCK.about.email}`, icon: <MailIcon />, label: "Email" },
                    { href: about.linkedin || "#", icon: <LinkedinIcon />, label: "LinkedIn" },
                  ].map(l => (
                    <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
                      display: "inline-flex", alignItems: "center", gap: "7px",
                      padding: "9px 18px", borderRadius: "8px",
                      background: "#fff", border: "1.5px solid #e2e8f0",
                      color: "#0f172a", fontSize: "13px", fontWeight: 500,
                      textDecoration: "none", transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "#94a3b8"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "#e2e8f0"}
                    >
                      {l.icon} {l.label}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────────────────── */}
      <Section id="projects" title="Projects" subtitle="Things I've built — click any card to expand.">
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ background: "#fff", borderRadius: "16px", padding: "28px", border: "1.5px solid #e2e8f0" }}>
                <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                  <Skeleton w={44} h={44} r={12} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Skeleton w="60%" h={16} />
                    <Skeleton w="40%" h={12} />
                  </div>
                </div>
                <Skeleton h={14} /><br />
                <Skeleton w="80%" h={14} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px", alignItems: "start" }}>
            {(data.projects || MOCK.projects).map(p => (
              <ProjectCard
                key={p.id}
                project={p}
                isOpen={openProject === p.id}
                onToggle={() => setOpenProject(openProject === p.id ? null : p.id)}
              />
            ))}
          </div>
        )}
      </Section>

      {/* ── Skills ───────────────────────────────────────────────────── */}
      <Section id="skills" title="Skills" subtitle="Technologies and tools I work with.">
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {(loading ? MOCK.skills : normalizedSkills).map((group, i) => (
            <div key={i}>
              <p style={{ fontSize: "11px", fontFamily: "'DM Mono', monospace", color: "#94a3b8", letterSpacing: "0.08em", marginBottom: "12px" }}>
                {group.category?.toUpperCase()}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {(loading ? ["···", "···", "···"] : group.items).map((skill, j) => (
                  <span key={j} style={{
                    padding: "7px 16px", borderRadius: "8px",
                    background: loading ? "#f1f5f9" : `${techColor(skill)}12`,
                    border: `1.5px solid ${loading ? "#e2e8f0" : techColor(skill) + "30"}`,
                    color: loading ? "#94a3b8" : techColor(skill),
                    fontSize: "13px", fontWeight: 500,
                    fontFamily: "'DM Mono', monospace",
                    transition: "transform 0.15s",
                    cursor: "default",
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  >{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Experience ───────────────────────────────────────────────── */}
      <Section id="experience" title="Experience" subtitle="Where I've worked and contributed.">
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {(loading ? MOCK.experience : (data.experience || MOCK.experience)).map((exp, i, arr) => (
            <div key={i} style={{ display: "flex", gap: "24px" }}>
              {/* Timeline */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#0f172a", flexShrink: 0, marginTop: "4px" }} />
                {i < arr.length - 1 && <div style={{ width: "1px", flex: 1, background: "#e2e8f0", margin: "6px 0" }} />}
              </div>
              {/* Content */}
              <div style={{ paddingBottom: i < arr.length - 1 ? "32px" : "0" }}>
                <p style={{ fontSize: "11px", fontFamily: "'DM Mono', monospace", color: "#94a3b8", marginBottom: "4px" }}>
                  {loading ? "···" : (exp.duration || exp.date_range)}
                </p>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", marginBottom: "2px" }}>
                  {loading ? <Skeleton w="200px" h={16} /> : exp.role}
                </h3>
                <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>
                  {loading ? "" : exp.company}
                </p>
                <p style={{ fontSize: "13.5px", color: "#475569", lineHeight: 1.7 }}>
                  {loading ? <Skeleton h={14} /> : exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Resume ───────────────────────────────────────────────────── */}
      <Section id="resume" title="Resume">
        <div>
          {/* Toggle */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            {["Half width", "Full width"].map((opt, i) => (
              <button key={opt} onClick={() => setResumeExpanded(i === 1)} style={{
                padding: "7px 16px", borderRadius: "7px", fontSize: "12px", fontWeight: 500,
                background: resumeExpanded === (i === 1) ? "#0f172a" : "#fff",
                color: resumeExpanded === (i === 1) ? "#fff" : "#64748b",
                border: "1.5px solid #e2e8f0",
                cursor: "pointer", transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
              }}>{opt}</button>
            ))}
          </div>

          <div style={{
            width: resumeExpanded ? "100%" : "50%",
            transition: "width 0.4s cubic-bezier(.22,1,.36,1)",
            background: "#fff", borderRadius: "16px",
            border: "1.5px solid #e2e8f0",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(15,23,42,0.07)",
          }}>
            {/* Resume card header */}
            <div style={{
              padding: "28px 32px 24px",
              borderBottom: "1px solid #f1f5f9",
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            }}>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#0f172a", marginBottom: "4px" }}>
                  {about.name || "Atul"} — Resume
                </h3>
                <p style={{ fontSize: "13px", color: "#94a3b8" }}>Computer Science · {new Date().getFullYear()}</p>
              </div>
              <a href={about.resume_url || "#"} download style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "9px 18px", borderRadius: "8px",
                background: "#0f172a", color: "#fff",
                fontSize: "13px", fontWeight: 500, textDecoration: "none",
              }}>
                <DownloadIcon /> Download PDF
              </a>
            </div>

            {/* Resume preview body */}
            <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Education */}
              <div>
                <p style={{ fontSize: "10px", fontFamily: "'DM Mono', monospace", color: "#94a3b8", letterSpacing: "0.1em", marginBottom: "10px" }}>EDUCATION</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>B.Tech in Computer Science</p>
                    <p style={{ fontSize: "13px", color: "#64748b" }}>University Name</p>
                  </div>
                  <p style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>2021 – 2025</p>
                </div>
              </div>
              {/* Divider */}
              <div style={{ height: "1px", background: "#f1f5f9" }} />
              {/* Skills summary */}
              <div>
                <p style={{ fontSize: "10px", fontFamily: "'DM Mono', monospace", color: "#94a3b8", letterSpacing: "0.1em", marginBottom: "10px" }}>TECHNICAL SKILLS</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {["Python", "Kotlin", "Django", "React", "TypeScript", "Linux", "Git", "PostgreSQL"].map(s => (
                    <span key={s} style={{
                      padding: "3px 10px", borderRadius: "5px",
                      background: "#f8fafc", border: "1px solid #e2e8f0",
                      fontSize: "12px", color: "#475569", fontFamily: "'DM Mono', monospace",
                    }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={{ height: "1px", background: "#f1f5f9" }} />
              {/* Projects count */}
              <div style={{ display: "flex", gap: "32px" }}>
                {[
                  { label: "Projects", val: (data.projects || MOCK.projects).length },
                  { label: "Technologies", val: [...new Set((data.projects || MOCK.projects).flatMap(p => p.technologies))].length },
                ].map(stat => (
                  <div key={stat.label}>
                    <p style={{ fontSize: "24px", fontFamily: "'Playfair Display', serif", color: "#0f172a" }}>{stat.val}</p>
                    <p style={{ fontSize: "12px", color: "#94a3b8" }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <Section id="contact" title="Contact" subtitle="Have a project in mind or just want to connect?">
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px",
        }}>
          {[
            { icon: <MailIcon />, label: "Email", value: about.email || "atul@example.com", href: `mailto:${about.email || "atul@example.com"}` },
            { icon: <GithubIcon />, label: "GitHub", value: "Atul101-oss", href: about.github || MOCK.about.github },
            { icon: <LinkedinIcon />, label: "LinkedIn", value: "Connect with me", href: about.linkedin || "#" },
          ].map(c => (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{
              display: "flex", alignItems: "center", gap: "16px",
              padding: "20px 24px", borderRadius: "14px",
              background: "#fff", border: "1.5px solid #e2e8f0",
              color: "#0f172a", textDecoration: "none",
              transition: "box-shadow 0.2s, border-color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(15,23,42,0.08)"; e.currentTarget.style.borderColor = "#cbd5e1"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
            >
              <div style={{
                width: "42px", height: "42px", borderRadius: "10px",
                background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#475569", flexShrink: 0,
              }}>{c.icon}</div>
              <div>
                <p style={{ fontSize: "11px", color: "#94a3b8", fontFamily: "'DM Mono', monospace", marginBottom: "3px" }}>{c.label}</p>
                <p style={{ fontSize: "14px", fontWeight: 500 }}>{c.value}</p>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "40px", borderTop: "1px solid #f1f5f9" }}>
        <p style={{ fontSize: "12px", color: "#cbd5e1", fontFamily: "'DM Mono', monospace" }}>
          built with React + Django · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
