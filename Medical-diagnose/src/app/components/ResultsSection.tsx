import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, AlertCircle, Pill, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DiseaseStat {
  name: string;
  percentage: number;
  severity: 'low' | 'medium' | 'high';
}

interface ResultsSectionProps {
  originalImage: string;
  processedImage: string;
  stats: DiseaseStat[];
  drugImage: string;
  skincareImage: string;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  originalImage, 
  processedImage, 
  stats,
  drugImage,
  skincareImage
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto mt-12 space-y-8 pb-24"
    >
      {/* Comparison View */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-slate-400" />
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Original Upload</h3>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
            <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl overflow-hidden relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider">Analyzed Output</h3>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 relative">
            <img src={processedImage} alt="Processed" className="w-full h-full object-cover" />
            {/* Mock detection overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 border-2 border-blue-500 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
              <div className="absolute w-24 h-24 border border-blue-400/50 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="absolute bottom-10 right-10 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Pattern Identified
          </div>
        </div>
      </div>

      {/* Disease Stats Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 p-2 rounded-xl">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Diagnostic Probability</h3>
              <p className="text-slate-500 text-sm">Top 3 conditions identified by the model</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <AlertCircle className="w-4 h-4" />
            <span>Not a medical diagnosis</span>
          </div>
        </div>

        <div className="space-y-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-bold text-slate-700">{stat.name}</span>
                <span className="text-2xl font-black text-blue-600">{stat.percentage}%</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.percentage}%` }}
                  transition={{ duration: 1, delay: idx * 0.2 }}
                  className={`h-full rounded-full ${
                    idx === 0 ? 'bg-blue-600' : idx === 1 ? 'bg-blue-400' : 'bg-blue-200'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Drugs */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl flex flex-col group">
          <div className="h-48 relative">
            <ImageWithFallback 
              src={drugImage} 
              alt="Recommended Drugs" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-6 flex items-center gap-2 text-white">
              <Pill className="w-5 h-5" />
              <span className="font-bold">Suggested Medications</span>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-slate-600 text-sm leading-relaxed">
              Based on the analysis, these common therapeutic options are often prescribed for identified patterns.
            </p>
            <ul className="space-y-2">
              {['Topical Corticosteroids', 'Antihistamines', 'Antibacterial Creams'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-4 flex items-center text-blue-600 font-bold text-sm hover:gap-2 transition-all">
              Consult a specialist <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Skincare */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl flex flex-col group">
          <div className="h-48 relative">
            <ImageWithFallback 
              src={skincareImage} 
              alt="Skincare Products" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-6 flex items-center gap-2 text-white">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold">Recommended Care</span>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-slate-600 text-sm leading-relaxed">
              Supportive care routine to help maintain the skin barrier and soothe irritation.
            </p>
            <ul className="space-y-2">
              {['Ceramide-rich Moisturizer', 'Soap-free Cleanser', 'Mineral SPF 50+'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-4 flex items-center text-teal-600 font-bold text-sm hover:gap-2 transition-all">
              View daily routine <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
