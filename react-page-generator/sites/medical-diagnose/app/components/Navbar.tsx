import React from 'react';
import { Stethoscope, ShieldCheck, Activity, Menu } from 'lucide-react';

interface NavbarProps {
  onAuthClick: (type: 'login' | 'register') => void;
  user: string | null;
  onLogout: () => void;
  onProfileClick: () => void;
  onHomeClick: () => void;
  onHowItWorksClick: () => void;
  onPipelineClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onAuthClick, 
  user, 
  onLogout, 
  onProfileClick, 
  onHomeClick,
  onHowItWorksClick,
  onPipelineClick
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onHomeClick}>
            <div className="bg-blue-600 p-2 rounded-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Derm<span className="text-blue-600">AI</span> Scan
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={onHowItWorksClick} 
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              How it works
            </button>
            <button 
              onClick={onPipelineClick} 
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              ROI Process
            </button>
            <button 
              onClick={onHomeClick} 
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Analyzer
            </button>
            
            {user ? (
              <div className="flex items-center gap-4 border-l border-slate-200 pl-8">
                <button 
                  onClick={onProfileClick}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs group-hover:ring-2 group-hover:ring-blue-500 transition-all">
                    {user[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{user}</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="text-sm font-bold text-slate-400 hover:text-red-500 transition-colors ml-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 border-l border-slate-200 pl-8">
                <button 
                  onClick={() => onAuthClick('login')}
                  className="text-sm font-bold text-slate-600 hover:text-blue-600"
                >
                  Login
                </button>
                <button 
                  onClick={() => onAuthClick('register')}
                  className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <Menu className="w-6 h-6 text-slate-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};
