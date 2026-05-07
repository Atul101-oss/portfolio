import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ImageUploader } from './components/ImageUploader';
import { ResultsSection } from './components/ResultsSection';
import { AuthForm } from './components/AuthForm';
import { ProfilePage } from './components/ProfilePage';
import { HowItWorks } from './components/HowItWorks';
import { PreprocessingPipeline } from './components/PreprocessingPipeline';
import { Shield, Lock, Zap, Clock, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'register' | 'profile' | 'how-it-works' | 'pipeline'>('home');
  const [user, setUser] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    original: string;
    processed: string;
  } | null>(null);

  const handleAnalyze = (image: string) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults({
        original: image,
        processed: image, 
      });
      window.scrollTo({ top: 800, behavior: 'smooth' });
    }, 2500);
  };

  const handleAuthSuccess = (username: string) => {
    setUser(username);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setUser(null);
    setResults(null);
    setCurrentView('home');
  };

  // Mock data
  const mockStats = [
    { name: 'Eczema (Atopic Dermatitis)', percentage: 78, severity: 'medium' as const },
    { name: 'Contact Dermatitis', percentage: 12, severity: 'low' as const },
    { name: 'Psoriasis', percentage: 4, severity: 'high' as const },
  ];

  const drugImage = "https://images.unsplash.com/photo-1668440246393-e0b8b19a0bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwZHJ1ZyUyMHBpbGxzJTIwYm90dGxlc3xlbnwxfHx8fDE3NzExNjYzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080";
  const skincareImage = "https://images.unsplash.com/photo-1655865556450-98430857f6b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXJtYXRvbG9neSUyMHNraW5jYXJlJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzcxMTY2MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080";

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar 
        onAuthClick={(type) => setCurrentView(type)} 
        user={user}
        onLogout={handleLogout}
        onProfileClick={() => setCurrentView('profile')}
        onHomeClick={() => {
          setCurrentView('home');
          setResults(null);
        }}
        onHowItWorksClick={() => setCurrentView('how-it-works')}
        onPipelineClick={() => setCurrentView('pipeline')}
      />

      <main className="pt-12 md:pt-20">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold mb-6"
                >
                  <Zap className="w-4 h-4 fill-blue-700" />
                  <span>Advanced AI-Powered Diagnosis Support</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6"
                >
                  Instant Skin Health <br /> 
                  <span className="text-blue-600">Analysis at Home</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-slate-500 max-w-2xl mx-auto mb-12"
                >
                  Upload a photo of any skin condition and get immediate insights using our state-of-the-art 
                  dermatological neural network. Secure, private, and precise.
                </motion.p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
                  {[
                    { icon: Shield, label: 'Secure Data' },
                    { icon: Lock, label: '100% Private' },
                    { icon: Activity, label: 'High Accuracy' },
                    { icon: Clock, label: 'Result in 3s' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-center gap-2 text-slate-400 font-medium text-sm">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Upload Section */}
              <section className="px-4">
                <ImageUploader onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
              </section>

              {/* Results Section */}
              <AnimatePresence>
                {results && (
                  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ResultsSection 
                      originalImage={results.original}
                      processedImage={results.processed}
                      stats={mockStats}
                      drugImage={drugImage}
                      skincareImage={skincareImage}
                    />
                  </section>
                )}
              </AnimatePresence>
            </motion.div>
          ) : currentView === 'how-it-works' ? (
            <motion.div
              key="how-it-works"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HowItWorks />
            </motion.div>
          ) : currentView === 'pipeline' ? (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PreprocessingPipeline />
            </motion.div>
          ) : currentView === 'profile' && user ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <ProfilePage 
                user={user} 
                onLogout={handleLogout} 
                onBackToHome={() => setCurrentView('home')}
              />
            </motion.div>
          ) : (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-4 pb-20"
            >
              <AuthForm 
                type={currentView as 'login' | 'register'} 
                onSwitch={() => setCurrentView(currentView === 'login' ? 'register' : 'login')}
                onSuccess={handleAuthSuccess}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            © 2026 DermAI Scan. All rights reserved. 
            <br />
            <span className="text-xs mt-2 block opacity-60">
              Disclaimer: This tool is for educational purposes only and does not replace professional medical advice.
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
