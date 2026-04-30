"use client";
import { useState, useEffect, useRef } from "react";

type AnimatedCounterProps = {
    target: number;
    duration?: number;
};

export function AnimatedCounter({ target, duration = 2000 }: AnimatedCounterProps) {
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

export default function Stats() {
    return (
        <div style={{
            position: "relative", zIndex: 1,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
        }}>
            <style>{`
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                }
                .stat-item {
                    padding: 32px 24px;
                    text-align: center;
                    border-right: 1px solid rgba(255,255,255,0.06);
                }
                .stat-item:last-child {
                    border-right: none;
                }
                @media (max-width: 900px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .stat-item:nth-child(2) {
                        border-right: none;
                    }
                    .stat-item:nth-child(1), .stat-item:nth-child(2) {
                        border-bottom: 1px solid rgba(255,255,255,0.06);
                    }
                }
                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                    .stat-item {
                        border-right: none !important;
                        border-bottom: 1px solid rgba(255,255,255,0.06);
                    }
                    .stat-item:last-child {
                        border-bottom: none;
                    }
                }
            `}</style>
            <div className="stats-grid" style={{
                maxWidth: "1100px", margin: "0 auto",
                padding: "0 40px",
            }}>
                {[
                    { val: 0, label: "Cloud dependency", prefix: "", suffix: "" },
                    { val: 100, label: "Your data ownership", prefix: "", suffix: "%" },
                    { val: 2, label: "Platforms supported", prefix: "", suffix: "+" },
                    { val: 1, label: "Git repo, unlimited devices", prefix: "", suffix: "" },
                ].map((s, i) => (
                    <div key={i} className="stat-item">
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
    );
}
