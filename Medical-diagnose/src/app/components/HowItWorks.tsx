import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowDown, 
  Layers, 
  Cpu, 
  Search, 
  Zap, 
  Microscope, 
  Database, 
  Activity,
  Maximize,
  Filter,
  BrainCircuit,
  UserCheck
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const stages = [
  {
    level: "Input Stage",
    title: "Initial Image Capture",
    description: "High-resolution dermatoscopic or mobile image capture followed by preprocessing and hair removal algorithms to ensure clear lesion visibility.",
    icon: <Search className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-600",
    image: "https://images.unsplash.com/photo-1701120285820-976b36f4e5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luJTIwYW5hbHlzaXMlMjBjYW1lcmF8ZW58MXx8fHwxNzcxMjEyMjY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    details: ["Hair removal", "Contrast enhancement", "Normalization"]
  },
  {
    level: "Level 1",
    title: "Localization & ROI",
    description: "MediaPipe landmark detection identifies the body part, while U-Net segmentation creates a precise mask around the lesion for ROI cropping.",
    icon: <Maximize className="w-6 h-6" />,
    color: "bg-indigo-100 text-indigo-600",
    image: "https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NzEyMTIyNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    details: ["MediaPipe Tasks", "U-Net Segmentation", "ROI Cropping"]
  },
  {
    level: "Level 2",
    title: "Superclass Classification",
    description: "A dual-stream architecture (EfficientNet-B4 & Swin Transformer) classifies the lesion into broad categories like Inflammatory, Neoplastic, or Viral.",
    icon: <Layers className="w-6 h-6" />,
    color: "bg-purple-100 text-purple-600",
    image: "https://images.unsplash.com/photo-1766297247287-9bf80d5f8281?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGFiJTIwdGVjaG5vbG9neSUyMHJlc2VhcmNofGVufDF8fHx8MTc3MTIxMjI2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    details: ["EfficientNet-B4", "Swin Transformer", "Category Branching"]
  },
  {
    level: "Level 3",
    title: "Disease Specialists",
    description: "Specialized models for each category perform fine-grained analysis to distinguish between similar-looking conditions like Acne vs. Eczema.",
    icon: <Microscope className="w-6 h-6" />,
    color: "bg-cyan-100 text-cyan-600",
    image: "https://images.unsplash.com/photo-1631558554770-74e921444006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBjaGVja2luZyUyMHJlc3VsdHMlMjB0YWJsZXR8ZW58MXx8fHwxNzcxMjEyMjY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    details: ["Inflammatory Model", "Neoplastic Model", "Infectious Model"]
  },
  {
    level: "Level 4",
    title: "Multi-Modal Fusion",
    description: "The final layer merges AI visual predictions with clinical metadata (age, location, symptoms) to produce a context-aware diagnosis.",
    icon: <Database className="w-6 h-6" />,
    color: "bg-amber-100 text-amber-600",
    image: "https://images.unsplash.com/photo-1576091160550-2173bdb999ef?auto=format&fit=crop&q=80&w=1080",
    details: ["Late Fusion Layer", "Metadata Integration", "Patient Context"]
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
          <BrainCircuit className="w-4 h-4" />
          The Technology Pipeline
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
          How Our AI <span className="text-blue-600">Actually Works</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Our diagnostic engine uses a hierarchical multi-stage neural network architecture to ensure clinical-grade precision.
        </p>
      </motion.div>

      <div className="relative">
        {/* The Vertical Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 hidden md:block" />

        <div className="space-y-24 md:space-y-40">
          {stages.map((stage, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative flex flex-col md:flex-row items-center gap-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Connector Point */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg -translate-x-1/2 z-10 hidden md:block" />

              {/* Content Card */}
              <div className="flex-1 w-full">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl relative overflow-hidden group">
                  <div className={`absolute top-0 left-0 w-2 h-full ${stage.color.split(' ')[0].replace('bg-', 'bg-')}`} />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-2xl ${stage.color}`}>
                      {stage.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stage.level}</span>
                      <h3 className="text-2xl font-black text-slate-900 leading-tight">{stage.title}</h3>
                    </div>
                  </div>

                  <p className="text-slate-500 mb-8 leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {stage.details.map((detail, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-100">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image Preview (Simulating server-side analysis) */}
              <div className="flex-1 w-full">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video md:aspect-square group">
                  <ImageWithFallback 
                    src={stage.image} 
                    alt={stage.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <p className="text-white text-sm font-medium">Neural Processing Layer Visualization: {stage.level}</p>
                  </div>
                  {/* Mock Scanning Effect */}
                  <motion.div 
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-0.5 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] z-20 pointer-events-none opacity-50"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final Output Node */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="inline-block p-8 bg-blue-600 rounded-full text-white shadow-2xl shadow-blue-300 relative">
            <UserCheck className="w-12 h-12" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-blue-600 rounded-full -z-10 opacity-30"
            />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mt-8 mb-4">Final Clinical Diagnosis</h2>
          <p className="text-slate-500 max-w-md mx-auto">
            The system provides a confidence score and potential classifications to assist healthcare professionals.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
