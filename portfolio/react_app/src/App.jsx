import React, { useState, useEffect } from 'react';
import { 
  Code2, Server, Cloud, Cpu, Database, Terminal, 
  ExternalLink, Github, Mail, UserCheck, Sparkles, 
  Send, ChevronRight, CheckCircle2, FileText, Download, Eye, X, Maximize2
} from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    icon: Code2,
    color: "#60a5fa",
    bgColor: "rgba(96, 165, 250, 0.12)",
    cardBorder: "rgba(96, 165, 250, 0.25)",
    skills: [
      { name: "Python", icon: "🐍", color: "#38bdf8", bg: "linear-gradient(135deg, #0284c7, #1e3a8a)" },
      { name: "JavaScript", icon: "🟨", color: "#facc15", bg: "linear-gradient(135deg, #ca8a04, #713f12)" },
      { name: "C++", icon: "⚡", color: "#60a5fa", bg: "linear-gradient(135deg, #2563eb, #1e40af)" },
      { name: "Java", icon: "☕", color: "#fb923c", bg: "linear-gradient(135deg, #ea580c, #9a3412)" }
    ]
  },
  {
    title: "Backend Development",
    icon: Server,
    color: "#a855f7",
    bgColor: "rgba(168, 85, 247, 0.12)",
    cardBorder: "rgba(168, 85, 247, 0.25)",
    skills: [
      { name: "Django", icon: "🎸", color: "#34d399", bg: "linear-gradient(135deg, #059669, #064e3b)" },
      { name: "Flask", icon: "🧪", color: "#e2e8f0", bg: "linear-gradient(135deg, #475569, #1e293b)" },
      { name: "Node.js", icon: "💚", color: "#4ade80", bg: "linear-gradient(135deg, #16a34a, #14532d)" },
      { name: "Express.js", icon: "🚀", color: "#cbd5e1", bg: "linear-gradient(135deg, #334155, #0f172a)" },
      { name: "REST APIs", icon: "🔌", color: "#38bdf8", bg: "linear-gradient(135deg, #0284c7, #0c4a6e)" }
    ]
  },
  {
    title: "DevOps & Cloud Infrastructure",
    icon: Cloud,
    color: "#22d3ee",
    bgColor: "rgba(34, 211, 238, 0.12)",
    cardBorder: "rgba(34, 211, 238, 0.25)",
    skills: [
      { name: "Docker", icon: "🐳", color: "#38bdf8", bg: "linear-gradient(135deg, #0284c7, #0369a1)" },
      { name: "Git", icon: "🐙", color: "#f97316", bg: "linear-gradient(135deg, #ea580c, #9a3412)" },
      { name: "GitHub", icon: "🐈", color: "#f8fafc", bg: "linear-gradient(135deg, #334155, #0f172a)" },
      { name: "Linux", icon: "🐧", color: "#fbbf24", bg: "linear-gradient(135deg, #d97706, #78350f)" },
      { name: "AWS EC2", icon: "☁️", color: "#fb923c", bg: "linear-gradient(135deg, #d97706, #9a3412)" },
      { name: "Nginx", icon: "🌐", color: "#4ade80", bg: "linear-gradient(135deg, #15803d, #064e3b)" }
    ]
  },
  {
    title: "Databases & Storage",
    icon: Database,
    color: "#34d399",
    bgColor: "rgba(52, 211, 153, 0.12)",
    cardBorder: "rgba(52, 211, 153, 0.25)",
    skills: [
      { name: "MongoDB", icon: "🍃", color: "#4ade80", bg: "linear-gradient(135deg, #16a34a, #064e3b)" },
      { name: "MySQL", icon: "🐬", color: "#60a5fa", bg: "linear-gradient(135deg, #1d4ed8, #1e3a8a)" },
      { name: "SQLite", icon: "🗄️", color: "#38bdf8", bg: "linear-gradient(135deg, #0369a1, #075985)" }
    ]
  },
  {
    title: "AI & Machine Learning",
    icon: Cpu,
    color: "#fbbf24",
    bgColor: "rgba(251, 191, 36, 0.12)",
    cardBorder: "rgba(251, 191, 36, 0.25)",
    skills: [
      { name: "TensorFlow", icon: "🧠", color: "#fb923c", bg: "linear-gradient(135deg, #ea580c, #7c2d12)" },
      { name: "OpenCV", icon: "👁️", color: "#f87171", bg: "linear-gradient(135deg, #dc2626, #7f1d1d)" },
      { name: "scikit-learn", icon: "📊", color: "#38bdf8", bg: "linear-gradient(135deg, #0284c7, #0369a1)" },
      { name: "BLIP", icon: "🔮", color: "#c084fc", bg: "linear-gradient(135deg, #7e22ce, #581c87)" },
      { name: "FAISS Index", icon: "🔍", color: "#a78bfa", bg: "linear-gradient(135deg, #6d28d9, #4c1d95)" }
    ]
  },
  {
    title: "Currently Learning & Exploring",
    icon: Terminal,
    color: "#f472b6",
    bgColor: "rgba(244, 114, 182, 0.12)",
    cardBorder: "rgba(244, 114, 182, 0.25)",
    skills: [
      { name: "CI/CD Pipelines", icon: "🔄", color: "#f472b6", bg: "linear-gradient(135deg, #be185d, #831843)" },
      { name: "Kubernetes", icon: "📦", color: "#60a5fa", bg: "linear-gradient(135deg, #2563eb, #1e3a8a)" },
      { name: "Linux SysAdmin", icon: "⚙️", color: "#facc15", bg: "linear-gradient(135deg, #ca8a04, #713f12)" },
      { name: "Cloud Automation", icon: "🤖", color: "#38bdf8", bg: "linear-gradient(135deg, #0284c7, #075985)" }
    ]
  }
];

const PROJECTS = [
  {
    id: "medical-diagnose",
    category: "ai",
    title: "Skin Disease Detection & Drug Recommendation",
    description: "Lightweight AI/ML web application for skin disease classification using computer vision and automated drug recommendations.",
    technologies: ["Python", "TensorFlow", "OpenCV", "Django", "React"],
    github_url: "https://github.com/Atul101-oss/portfolio",
    live_url: "/medical-diagnose/",
    is_live: true,
    badge: "Featured AI App",
    gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)"
  },
  {
    id: "digital-signature",
    category: "crypto",
    title: "Digital Signature & RSA Key Vault",
    description: "Cryptographic suite for RSA 2048-bit keypair generation, user account key vault, document signing, and SHA-256 verification.",
    technologies: ["Django", "Python", "OpenSSL", "React", "Cryptography"],
    live_url: "/DigitalSignature/",
    is_live: true,
    badge: "Security & Crypto",
    gradient: "linear-gradient(135deg, #10b981, #06b6d4)"
  },
  {
    id: "semantic-search",
    category: "ai",
    title: "Semantic Image Search System",
    description: "Advanced semantic image search engine powered by BLIP vision-language models, Sentence Transformers, and FAISS vector index.",
    technologies: ["Python", "BLIP", "Sentence Transformers", "FAISS", "PyTorch"],
    github_url: "https://github.com/Atul101-oss",
    is_live: false,
    badge: "AI / Search Engine",
    gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)"
  },
  {
    id: "restaurant-reservation",
    category: "fullstack",
    title: "Restaurant Reservation System",
    description: "Full-stack MERN web application enabling real-time table reservations, menu management, and user booking history.",
    technologies: ["MongoDB", "Express.js", "React", "Node.js"],
    github_url: "https://github.com/Atul101-oss",
    is_live: false,
    badge: "Full Stack MERN",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)"
  },
  {
    id: "telegram-bots",
    category: "tools",
    title: "Telegram Bot Automation Platform",
    description: "Multi-bot task automation engine, document conversion, and logging hub integrated with Django.",
    technologies: ["Python", "Telegram API", "Django", "React"],
    live_url: "/telegramBots/",
    is_live: true,
    badge: "Automation",
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)"
  },
  {
    id: "notesync",
    category: "tools",
    title: "NoteSync Cross-Platform Sync",
    description: "Web and desktop note synchronization platform enabling seamless note updates across devices.",
    technologies: ["JavaScript", "React", "Django", "TailwindCSS"],
    live_url: "/notesync/",
    is_live: true,
    badge: "Productivity",
    gradient: "linear-gradient(135deg, #6366f1, #a855f7)"
  },
  {
    id: "voicetype",
    category: "tools",
    title: "VoiceType Linux Tool",
    description: "Hands-free speech-to-text dictation application optimized for Linux desktop workflows.",
    technologies: ["Python", "SpeechRecognition", "Linux API"],
    live_url: "/voicetype/",
    is_live: true,
    badge: "Utility",
    gradient: "linear-gradient(135deg, #14b8a6, #0284c7)"
  }
];

const RESUME_PATH = "/static/Atul_Arya_Resume.pdf";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setFormSent(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', message: '' });
      setFormSent(false);
    }, 5000);
  };

  // Interactive 3D Card Mouse Tilt handlers
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) translateY(-8px)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)`;
  };

  const filteredProjects = selectedFilter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === selectedFilter);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#f8fafc', backgroundColor: '#090d16', minHeight: '100vh', scrollBehavior: 'smooth' }}>
      
      {/* CSS Keyframes & 3D Animations */}
      <style>{`
        @keyframes cardFadeIn {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .project-3d-wrapper {
          perspective: 1000px;
        }

        .animated-project-card {
          animation: cardFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-style: preserve-3d;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5);
        }

        .animated-project-card:hover {
          border-color: rgba(56, 189, 248, 0.55) !important;
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.85), 0 0 35px rgba(56, 189, 248, 0.3) !important;
        }

        .animated-project-card:hover .card-glow-bar {
          transform: scaleX(1) !important;
          opacity: 1 !important;
        }

        .animated-project-card .card-3d-content {
          transform-style: preserve-3d;
          transition: transform 0.25s ease;
        }

        .animated-project-card:hover .card-3d-content {
          transform: translateZ(30px);
        }

        .animated-project-card:hover .card-3d-title {
          color: #38bdf8 !important;
        }

        .animated-project-card:hover .demo-btn-action {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6) !important;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5) !important;
          transform: translateZ(35px) scale(1.03);
        }

        .animated-project-card:hover .demo-btn-action svg {
          transform: translateX(4px);
        }

        .tech-pill-tag {
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .tech-pill-tag:hover {
          transform: translateY(-2px) scale(1.05);
          background-color: rgba(59, 130, 246, 0.25) !important;
          color: #60a5fa !important;
        }

        .resume-preview-container:hover {
          border-color: rgba(56, 189, 248, 0.5) !important;
          box-shadow: 0 0 35px rgba(56, 189, 248, 0.2) !important;
        }

        .resume-preview-container:hover .resume-expand-badge {
          transform: scale(1.05);
          background: linear-gradient(135deg, #0284c7, #2563eb) !important;
        }

        /* 3D TECHNOLOGY KEYWORD BADGE STYLING */
        .skill-3d-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 0.95rem;
          border-radius: 0.6rem;
          font-weight: 700;
          font-size: 0.88rem;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.35);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease;
          cursor: pointer;
          user-select: none;
        }

        .skill-3d-badge:hover {
          transform: translateY(-5px) scale(1.06);
          border-color: rgba(255, 255, 255, 0.5) !important;
          box-shadow: 0 12px 25px -5px rgba(0, 0, 0, 0.6), 0 0 18px rgba(255, 255, 255, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.6) !important;
        }

        .skill-3d-badge .skill-3d-icon {
          font-size: 1.15rem;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
          transition: transform 0.25s ease;
        }

        .skill-3d-badge:hover .skill-3d-icon {
          transform: scale(1.25) rotate(6deg);
        }
      `}</style>

      {/* 1. NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: isScrolled ? 'rgba(15, 23, 42, 0.92)' : 'rgba(9, 13, 22, 0.75)',
        backdropFilter: 'blur(16px)',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 10px 25px -5px rgba(0, 0, 0, 0.5)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: '0.9rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Logo / Name */}
          <div 
            onClick={() => scrollToSection('home')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 800, fontSize: '1.1rem', boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }}>
              A
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              Atul <span style={{ color: '#38bdf8' }}>Arya</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    border: isActive ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                    background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                    color: isActive ? '#38bdf8' : '#94a3b8',
                    padding: '0.45rem 1rem',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Auth Link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href="/login/"
              style={{
                textDecoration: 'none',
                fontWeight: 600,
                color: '#ffffff',
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                padding: '0.45rem 1.1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                boxShadow: '0 0 15px rgba(37, 99, 235, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              Dashboard Login
            </a>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="home" style={{ paddingTop: '9rem', paddingBottom: '6rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', background: 'radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.15) 0%, rgba(9, 13, 22, 1) 75%)', textAlign: 'center' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(99, 102, 241, 0.12)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.25)', padding: '0.4rem 1.1rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.75rem' }}>
            <Sparkles size={16} /> B.Sc. (Hons.) Computer Science @ Aryabhatta College, DU
          </div>

          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#f8fafc', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
            Software Developer & <br />
            <span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Backend / DevOps Engineer
            </span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.65, maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
            Building high-performance backend systems, automated deployment pipelines, AI applications, and Linux operating system utilities.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsResumeModalOpen(true)}
              style={{
                padding: '0.8rem 1.85rem',
                background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 0 20px rgba(2, 132, 199, 0.4)',
                cursor: 'pointer'
              }}
            >
              <Eye size={18} /> View Full Resume (PDF)
            </button>

            <button
              onClick={() => scrollToSection('projects')}
              style={{ padding: '0.8rem 1.85rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#f8fafc', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', backdropFilter: 'blur(8px)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              Explore Projects <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION & RESUME PREVIEW IMAGE CARD */}
      <section id="about" style={{ padding: '5.5rem 1.5rem', maxWidth: '1120px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 0.5rem 0' }}>About & Resume Preview</h2>
          <div style={{ width: '60px', height: '4px', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'stretch' }}>
          
          {/* Bio Text Card */}
          <div style={{ backgroundColor: '#111827', padding: '2.25rem', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginTop: 0, marginBottom: '1rem' }}>
                Hi, I'm Atul Arya 👋
              </h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '1rem', marginBottom: '1.25rem' }}>
                I am a <strong>B.Sc. (Hons.) Computer Science student at Aryabhatta College, University of Delhi</strong> with a passion for backend systems, DevOps engineering, Linux operating systems, cloud architecture, and machine learning.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '1rem', marginBottom: '1.5rem' }}>
                I enjoy constructing robust full-stack applications, setting up automated CI/CD deployment infrastructure, and mastering software internals from OS system calls up to cloud scale.
              </p>
            </div>

            <div style={{ padding: '1rem 1.25rem', backgroundColor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '0.65rem' }}>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', display: 'block' }}>📄 Official Resume Document</span>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Updated CV (Backend, DevOps & AI/ML)</span>
              </div>
            </div>
          </div>

          {/* INTERACTIVE RESUME PREVIEW IMAGE CARD */}
          <div 
            onClick={() => setIsResumeModalOpen(true)}
            className="resume-preview-container"
            style={{
              backgroundColor: '#0f172a',
              borderRadius: '1rem',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              transition: 'all 0.35s ease'
            }}
          >
            {/* Top Ribbon Header */}
            <div style={{ backgroundColor: '#1e293b', padding: '0.8rem 1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: 700, fontSize: '0.875rem' }}>
                <FileText size={16} /> Resume Preview Image
              </div>
              <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontWeight: 600 }}>
                Click to Expand
              </span>
            </div>

            {/* Document Content Image Preview */}
            <div style={{ position: 'relative', height: '290px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
              <img
                src="/static/resume_preview.png"
                alt="Atul Arya Resume Preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block'
                }}
              />

              {/* Bottom Fade Gradient Mask Overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px',
                background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.88) 65%, rgba(15, 23, 42, 1) 100%)',
                pointerEvents: 'none'
              }} />
            </div>

            {/* Bottom Floating CTA Button */}
            <div style={{ padding: '1.25rem', backgroundColor: '#0f172a', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', position: 'relative', zIndex: 10 }}>
              <button
                className="resume-expand-badge"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsResumeModalOpen(true);
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem 1.25rem',
                  background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 0 15px rgba(37, 99, 235, 0.4)',
                  transition: 'all 0.3s ease'
                }}
              >
                <Maximize2 size={16} /> Click to View Complete Resume (PDF)
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. SKILLS SECTION WITH 3D ICONS AND DOMAIN GROUPING */}
      <section id="skills" style={{ padding: '5.5rem 1.5rem', backgroundColor: '#0f172a', borderTop: '1px solid rgba(255, 255, 255, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 0.5rem 0' }}>Technical Stack & 3D Skills</h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', margin: 0 }}>Grouped by domain with 3D technology badges and interactive micro-animations.</p>
            <div style={{ width: '60px', height: '4px', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', margin: '0.75rem auto 0 auto', borderRadius: '2px' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '2rem' }}>
            {SKILL_CATEGORIES.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div 
                  key={idx}
                  style={{
                    backgroundColor: '#111827',
                    borderRadius: '1rem',
                    padding: '1.75rem',
                    border: `1px solid ${cat.cardBorder}`,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Category Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.4rem' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '0.65rem', backgroundColor: cat.bgColor, border: `1px solid ${cat.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconComp size={24} color={cat.color} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>{cat.title}</h3>
                  </div>

                  {/* 3D Skill Badges Grid */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="skill-3d-badge"
                        style={{
                          background: skill.bg,
                        }}
                      >
                        <span className="skill-3d-icon">{skill.icon}</span>
                        <span style={{ color: skill.color }}>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. FEATURED PROJECTS SECTION WITH 3D CARD TILT & SPATIAL MOTION */}
      <section id="projects" style={{ padding: '5.5rem 1.5rem', maxWidth: '1180px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 0.5rem 0' }}>Featured Projects</h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', margin: 0 }}>Interactive 3D cards with spatial perspective tilt and depth elevation.</p>
          <div style={{ width: '60px', height: '4px', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', margin: '0.75rem auto 0 auto', borderRadius: '2px' }}></div>
        </div>

        {/* Filter Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'ai', label: '🤖 AI & ML' },
            { id: 'crypto', label: '🔐 Security & Crypto' },
            { id: 'fullstack', label: '💻 Full Stack' },
            { id: 'tools', label: '⚙️ Automation & Tools' }
          ].map((tab) => {
            const isSelected = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: '9999px',
                  border: isSelected ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: isSelected ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(168, 85, 247, 0.25))' : 'rgba(15, 23, 42, 0.6)',
                  color: isSelected ? '#38bdf8' : '#94a3b8',
                  fontSize: '0.875rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? '0 0 15px rgba(56, 189, 248, 0.25)' : 'none'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Interactive 3D Card Perspective Grid */}
        <div className="project-3d-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.25rem' }}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="animated-project-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                backgroundColor: '#111827',
                borderRadius: '1rem',
                padding: '1.95rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <div 
                className="card-glow-bar" 
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                  background: project.gradient,
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  opacity: 0,
                  transition: 'all 0.35s ease'
                }} 
              />

              <div className="card-3d-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
                    {project.badge}
                  </span>
                </div>

                <h3 className="card-3d-title" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.7rem', lineHeight: 1.3, transition: 'color 0.25s ease' }}>
                  {project.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.4rem' }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
                  {project.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="tech-pill-tag" style={{ padding: '0.22rem 0.65rem', backgroundColor: '#1e293b', color: '#cbd5e1', fontSize: '0.78rem', borderRadius: '0.25rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.06)', cursor: 'default' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-3d-footer" style={{ display: 'flex', gap: '0.75rem', paddingTop: '1.1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                {project.is_live && (
                  <a
                    href={project.live_url}
                    className="demo-btn-action"
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      textDecoration: 'none',
                      padding: '0.6rem 0.9rem',
                      background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                      color: '#ffffff',
                      borderRadius: '0.4rem',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      boxShadow: '0 0 12px rgba(37, 99, 235, 0.3)',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    Launch Demo <ExternalLink size={14} style={{ transition: 'transform 0.25s ease' }} />
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: '0.6rem 0.9rem',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#e2e8f0',
                      borderRadius: '0.4rem',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <Github size={14} /> Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" style={{ padding: '5.5rem 1.5rem', backgroundColor: '#0f172a', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 0.5rem 0' }}>Get In Touch</h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', margin: 0 }}>Have a question or interested in collaborating? Send a message below!</p>
            <div style={{ width: '60px', height: '4px', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', margin: '0.75rem auto 0 auto', borderRadius: '2px' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            
            <div style={{ backgroundColor: '#1e293b', padding: '2.25rem', borderRadius: '0.85rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginTop: 0, marginBottom: '1.5rem' }}>
                Contact Information
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={20} color="#60a5fa" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block' }}>Email</span>
                    <strong style={{ fontSize: '0.95rem', color: '#f8fafc' }}>atul101.oss@gmail.com</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Github size={20} color="#c084fc" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block' }}>GitHub Profile</span>
                    <a href="https://github.com/Atul101-oss" target="_blank" rel="noreferrer" style={{ fontSize: '0.95rem', color: '#38bdf8', fontWeight: 600, textDecoration: 'none' }}>
                      github.com/Atul101-oss
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(34, 211, 238, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={20} color="#22d3ee" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block' }}>Resume / CV</span>
                    <button
                      onClick={() => setIsResumeModalOpen(true)}
                      style={{ border: 'none', background: 'none', padding: 0, fontSize: '0.9rem', color: '#38bdf8', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      View & Download Resume PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#111827', padding: '2.25rem', borderRadius: '0.85rem', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}>
              {formSent ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                  <CheckCircle2 size={48} color="#34d399" style={{ margin: '0 auto 1rem auto' }} />
                  <h4 style={{ fontSize: '1.25rem', color: '#34d399', margin: '0 0 0.5rem 0' }}>Message Sent Successfully!</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Thank you for reaching out, Atul will respond to your message shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '0.4rem' }}>Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Atul Arya"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem', borderRadius: '0.375rem', border: '1px solid rgba(255, 255, 255, 0.15)', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '0.9rem', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '0.4rem' }}>Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem', borderRadius: '0.375rem', border: '1px solid rgba(255, 255, 255, 0.15)', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '0.9rem', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '0.4rem' }}>Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your message..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem', borderRadius: '0.375rem', border: '1px solid rgba(255, 255, 255, 0.15)', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '0.9rem', boxSizing: 'border-box' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ width: '100%', padding: '0.8rem', background: 'linear-gradient(135deg, #2563eb, #3b82f6)', color: '#ffffff', border: 'none', borderRadius: '0.375rem', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 0 15px rgba(37, 99, 235, 0.3)' }}
                  >
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer style={{ padding: '2.5rem 1.5rem', textAlign: 'center', color: '#64748b', backgroundColor: '#090d16', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <p style={{ margin: '0 0 0.5rem 0', color: '#94a3b8', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} Atul Arya — Built with React, Django & Modern Dark Aesthetics.
        </p>
        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
          <button onClick={() => setIsResumeModalOpen(true)} style={{ border: 'none', background: 'none', color: '#38bdf8', fontWeight: 600, cursor: 'pointer', padding: 0 }}>View Full Resume PDF</button> • Aryabhatta College, DU
        </p>
      </footer>

      {/* 8. FULL-SCREEN INTERACTIVE RESUME PDF MODAL */}
      {isResumeModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(9, 13, 22, 0.88)',
          backdropFilter: 'blur(12px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            backgroundColor: '#0f172a',
            borderRadius: '1rem',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            width: '100%',
            maxWidth: '900px',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            overflow: 'hidden'
          }}>
            {/* Modal Header Bar */}
            <div style={{
              padding: '1rem 1.5rem',
              backgroundColor: '#1e293b',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <FileText size={20} color="#38bdf8" />
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc' }}>
                  Atul Arya — Official Resume (PDF Viewer)
                </h3>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <a
                  href={RESUME_PATH}
                  download="Atul_Arya_Resume.pdf"
                  style={{
                    padding: '0.45rem 1rem',
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    borderRadius: '0.375rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Download size={15} /> Download PDF
                </a>
                <button
                  onClick={() => setIsResumeModalOpen(false)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#e2e8f0',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '0.375rem',
                    padding: '0.45rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Embedded Live PDF Document Viewer */}
            <div style={{ flex: 1, backgroundColor: '#1e293b', position: 'relative' }}>
              <iframe
                src={RESUME_PATH}
                title="Atul Arya Resume PDF"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
