"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LiveDemo from "./components/LiveDemo";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Download from "./components/Download";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function VoiceType() {
    return (
        <div style={{
            minHeight: "100vh",
            background: "#080b0f",
            color: "#e2e8f0",
            fontFamily: "'Geist', 'DM Sans', sans-serif",
            overflowX: "hidden",
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&family=DM+Serif+Display:ital@0;1&display=swap');
        
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
        @keyframes glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes waveform {
          0% { height: 4px; }
          100% { height: 32px; }
        }
        @keyframes micPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,211,238,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(34,211,238,0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .dl-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(34, 211, 238, 0.25);
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #080b0f;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(34,211,238,0.2);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(34,211,238,0.4);
        }
      `}</style>

            {/* Background grid */}
            <div style={{
                position: "fixed", inset: 0, zIndex: 0,
                backgroundImage: `linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)`,
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)",
            }} />

            {/* Glow orbs */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
                <div style={{
                    position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
                    width: "900px", height: "600px",
                    background: "radial-gradient(ellipse, rgba(34,211,238,0.08) 0%, transparent 70%)",
                    animation: "glow 4s ease-in-out infinite",
                }} />
                <div style={{
                    position: "absolute", top: "60%", left: "-10%",
                    width: "500px", height: "500px",
                    background: "radial-gradient(ellipse, rgba(96,165,250,0.05) 0%, transparent 70%)",
                }} />
                <div style={{
                    position: "absolute", top: "40%", right: "-10%",
                    width: "500px", height: "500px",
                    background: "radial-gradient(ellipse, rgba(167,139,250,0.05) 0%, transparent 70%)",
                }} />
            </div>

            <Navbar />
            <Hero />
            <LiveDemo />
            <Features />
            <HowItWorks />
            <Download />
            <CTA />
            <Footer />
        </div>
    );
}
