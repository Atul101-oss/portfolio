import React, { useState, useEffect } from 'react';
import { 
  Bot, Terminal, RefreshCw, ArrowLeft, CheckCircle2, 
  FileText, Image as ImageIcon, FileCheck, Shield, Activity,
  Lock, Key, Send, Cpu, Check, AlertCircle, HelpCircle, ExternalLink,
  Play, Layers, Eye, Zap, ChevronRight
} from 'lucide-react';

const ACTIVE_BOTS = [
  {
    id: "localOssbot",
    name: "localBot",
    username: "@localOssbot",
    telegram_url: "https://t.me/localOssbot",
    status: "online",
    description: "Modular task automation bot for file processing, document conversion, and image manipulation.",
    badge: "Primary Active Bot",
    gradient: "linear-gradient(135deg, #0284c7, #2563eb)",
    features: [
      "🖼️ Image Resizer & Format Converter",
      "📄 PDF Merger Engine",
      "📸 Image to PDF Converter",
      "📄➡🖼️ PDF Pages to Images Converter"
    ]
  }
];

export default function App() {
  /* Commented out state & variables for log streaming & visualizer console
  const [userIdInput, setUserIdInput] = useState('');
  const [activeUserId, setActiveUserId] = useState('');
  const [logs, setLogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [viewMode, setViewMode] = useState('visual');
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [notice, setNotice] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  */

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", backgroundColor: '#090d16', color: '#f8fafc', minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
        
        {/* Navigation & Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <a href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem' }}>
            <ArrowLeft size={16} /> Back to Portfolio
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '0.35rem 0.9rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600 }}>
            <Activity size={14} /> Telegram Bot Service Active
          </div>
        </div>

        {/* Header Title */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#f8fafc', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <Bot size={36} color="#38bdf8" /> Active Telegram Bots
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', margin: 0 }}>
            Connect with our active Telegram bots to process images, merge PDFs, and automate file tasks directly in chat.
          </p>
        </div>

        {/* 1. ACTIVE TELEGRAM BOTS DIRECTORY */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
            {ACTIVE_BOTS.map((bot) => (
              <div
                key={bot.id}
                style={{
                  backgroundColor: '#111827',
                  borderRadius: '0.85rem',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  padding: '1.85rem',
                  boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: bot.gradient }} />

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
                      {bot.badge}
                    </span>
                    <span style={{ fontSize: '0.78rem', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '0.2rem 0.6rem', borderRadius: '0.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <CheckCircle2 size={13} /> ONLINE
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 0.25rem 0' }}>
                    {bot.name} <span style={{ fontSize: '1rem', color: '#38bdf8', fontWeight: 600 }}>({bot.username})</span>
                  </h3>

                  <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.35rem' }}>
                    {bot.description}
                  </p>

                  <div style={{ marginBottom: '1.75rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: '0.6rem' }}>Integrated Capabilities & Tasks:</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      {bot.features.map((feat, idx) => (
                        <div key={idx} style={{ fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <Check size={15} color="#38bdf8" /> {feat}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Telegram Link Button */}
                <a
                  href={bot.telegram_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.9rem 1.25rem',
                    background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                    color: '#ffffff',
                    borderRadius: '0.5rem',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    boxShadow: '0 0 20px rgba(2, 132, 199, 0.4)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <Bot size={18} /> Open {bot.username} on Telegram <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 
          ========================================================================
          COMMENTED OUT LOG STREAM, USER ID SECURITY FILTER & VISUAL PIPELINE
          (Uncomment below if you want to re-enable live execution logging visualizer)
          ========================================================================

        {/* SECURITY & SESSION USER ID FILTER PANEL */}
        {/*
        <div style={{ backgroundColor: '#111827', borderRadius: '0.85rem', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '1.5rem', marginBottom: '2rem' }}>
          ...
        </div>
        */}

        {/* BACKEND WORKFLOW VISUALIZER & LOG CONSOLE */}
        {/*
        <div style={{ backgroundColor: '#0f172a', borderRadius: '0.75rem', border: '1px solid rgba(56, 189, 248, 0.3)', overflow: 'hidden' }}>
          ...
        </div>
        */}

      </div>
    </div>
  );
}
