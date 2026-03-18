"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import UseCases from "./components/UseCases";
import Download from "./components/Download";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function NoteSync() {
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

      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <UseCases />
      <Download />
      <CTA />
      <Footer />
    </div>
  );
}
