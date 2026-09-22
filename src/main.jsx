import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ParticleCanvas from "./components/layouts/ParticleCanvas";

function LoadingScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => onDone(), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020617] flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-amber-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6" style={{ boxShadow: "0 0 40px rgba(13,148,136,.15)" }}>
            <span className="text-emerald-400 font-bold text-xl">&lt;/&gt;</span>
          </div>
          <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/40 to-amber-500/40 blur-xl mx-auto mb-6" />
        </div>
        <p className="text-emerald-400/60 text-xs font-light tracking-[0.4em] uppercase mb-4">Initializing</p>
        <div className="w-48 h-0.5 bg-zinc-800 rounded-full overflow-hidden mx-auto">
          <div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #0d9488, #14b8a6, #f59e0b)", backgroundSize: "200% 100%", animation: "shimmer 1.5s ease-in-out infinite" }} />
        </div>
        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
        `}</style>
      </div>
    </div>
  );
}

function AppWrapper() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <div className={`min-h-screen bg-[#020617] transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <ParticleCanvas />
        <div className="relative z-10"><App /></div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
