import React from 'react';
import { motion } from 'motion/react';
import { User, Mail, Calendar, History, Settings, ChevronRight, LogOut, ShieldCheck, Activity } from 'lucide-react';

interface ProfilePageProps {
  user: string;
  onLogout: () => void;
  onBackToHome: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout, onBackToHome }) => {
  const scanHistory = [
    { id: 1, date: 'Feb 12, 2026', result: 'Eczema', accuracy: '94%', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=150' },
    { id: 2, date: 'Jan 28, 2026', result: 'Healthy', accuracy: '98%', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=150' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header/Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <button onClick={onBackToHome} className="hover:text-blue-600 transition-colors">Dashboard</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-medium">My Profile</span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar / User Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-black ring-4 ring-white shadow-lg">
                  {user[0].toUpperCase()}
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">{user}</h2>
              <p className="text-sm text-slate-500 mb-6">Patient ID: #88291</p>
              
              <div className="space-y-3 pt-6 border-t border-slate-50">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                  <User className="w-4 h-4" /> Edit Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                  <Settings className="w-4 h-4" /> Account Settings
                </button>
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>

            <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-bold">Pro Plan</span>
              </div>
              <p className="text-sm text-blue-100 mb-4 leading-relaxed">You have unlimited AI scans and priority support active.</p>
              <button className="w-full bg-white text-blue-600 py-2 rounded-xl text-sm font-bold">Manage Subscription</button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg">
                <p className="text-sm text-slate-500 font-medium mb-1">Total Scans</p>
                <p className="text-3xl font-black text-slate-900">12</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg">
                <p className="text-sm text-slate-500 font-medium mb-1">Avg. Accuracy</p>
                <p className="text-3xl font-black text-slate-900">96.4%</p>
              </div>
            </div>

            {/* History */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-slate-900">Recent Analysis History</h3>
                </div>
                <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
              </div>
              <div className="divide-y divide-slate-50">
                {scanHistory.map((scan) => (
                  <div key={scan.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4 group">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img src={scan.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-slate-800">{scan.result}</h4>
                        <span className="text-xs font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{scan.accuracy} Accuracy</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {scan.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3" /> Analyzed
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications / Security */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl">
              <h3 className="font-bold text-slate-900 mb-4">Account Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Two-Factor Authentication</p>
                      <p className="text-xs text-slate-500">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-blue-600 hover:underline">Enable</button>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Email Notifications</p>
                      <p className="text-xs text-slate-500">Get scan reports in your inbox</p>
                    </div>
                  </div>
                  <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
