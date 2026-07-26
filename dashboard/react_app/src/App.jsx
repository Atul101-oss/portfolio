import React from 'react';
import { User, LogOut, LayoutDashboard, FolderKanban, Settings } from 'lucide-react';

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#0f172a', color: '#f8fafc', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LayoutDashboard size={20} /> Dashboard App
          </h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="#" style={{ color: '#f8fafc', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FolderKanban size={18} /> Projects Management
            </a>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Settings size={18} /> Account Settings
            </a>
          </nav>
        </div>

        <div>
          <a href="/logout/" style={{ color: '#ef4444', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogOut size={18} /> Sign Out
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', backgroundColor: '#ffffff', padding: '1rem 1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Overview & Management</h1>
          <a href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>← Back to Portfolio</a>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#64748b' }}>Active Projects</h4>
            <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#0284c7' }}>5</p>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#64748b' }}>Connected APIs</h4>
            <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#16a34a' }}>v1 REST</p>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#64748b' }}>Database Status</h4>
            <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#7c3aed' }}>SQLite3 Online</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#0f172a' }}>Dashboard React App Template</h3>
          <p style={{ color: '#475569' }}>
            This React app manages user dashboard features, profile actions, and API integrations for the Django backend.
          </p>
        </div>
      </div>
    </div>
  );
}
