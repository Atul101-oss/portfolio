import React, { useState, useEffect } from 'react';
import { Terminal, Search, ExternalLink, Bot, Activity, AlertCircle } from 'lucide-react';

const BOTS = [
  { id: 'miniTaskBot', name: 'FileBot (miniTaskBot)', username: 'localOssbot', description: 'Modular file processing bot' },
  // Add more bots here as they are deployed
];

function App() {
  const [userId, setUserId] = useState('');
  const [selectedBot, setSelectedBot] = useState(BOTS[0]);
  const [logs, setLogs] = useState([]);
  const [isLive, setIsLive] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real logs from Django backend
  useEffect(() => {
    if (!isLive) return;

    const fetchLogs = async () => {
      try {
        const response = await fetch('/telegramBots/logs/');
        const data = await response.json();

        if (data.logs) {
          // Filter logs by userId if provided
          let filteredLogs = data.logs;
          if (userId) {
            filteredLogs = data.logs.filter(line => line.includes(userId));
          }

          // Filter by bot name if needed (optional since we have a central log)
          // For now showing all filtered by User ID
          setLogs(filteredLogs.reverse()); // Newest first
          setError(null);
        }
      } catch (err) {
        console.error('Failed to fetch logs:', err);
        setError('Connection to log server lost...');
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, [isLive, userId, selectedBot]);

  return (
    <div className="monitor-container">
      <header>
        <div className="brand">
          <Bot className="glow-icon" />
          <h1>BotLive <span>Monitor</span></h1>
        </div>
        <div className="controls">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Filter by User ID..."
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <button className={`live-toggle ${isLive ? 'active' : ''}`} onClick={() => setIsLive(!isLive)}>
            <Activity size={16} />
            {isLive ? 'LIVE' : 'PAUSED'}
          </button>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <main>
        <section className="bot-grid">
          <h2 className="section-title">Active Bots</h2>
          {BOTS.map(bot => (
            <div
              key={bot.id}
              className={`bot-card ${selectedBot.id === bot.id ? 'active' : ''}`}
              onClick={() => setSelectedBot(bot)}
            >
              <h3>{bot.name}</h3>
              <p>@{bot.username}</p>
              <div className="bot-meta">
                <span className="status-dot"></span> Online
              </div>
              <a href={`https://t.me/${bot.username}`} target="_blank" rel="noreferrer" className="redirect-btn">
                Launch Bot <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </section>

        <section className="terminal-section">
          <div className="terminal-header">
            <div className="terminal-title">
              <Terminal size={16} />
              <span>Log Stream: {userId ? `User ${userId}` : 'Global'}</span>
            </div>
            <div className="terminal-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div className="terminal-body">
            {logs.length === 0 ? (
              <div className="empty-state">
                <Activity size={48} className={isLive ? "pulse" : ""} />
                <p>{userId ? `No activity found for User ${userId}` : "Waiting for bot activity..."}</p>
              </div>
            ) : (
              logs.map((log, i) => {
                const isError = log.includes('ERROR') || log.includes('Critical');
                const isInfo = log.includes('INFO');
                return (
                  <div key={i} className={`log-entry ${isError ? 'err' : ''}`}>
                    <span className="log-line">{log}</span>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
