import React from 'react';
import { motion } from 'motion/react';
import { 
  Image as ImageIcon, 
  Settings2, 
  Target, 
  Box, 
  Maximize2, 
  Scissors, 
  Binary, 
  Layers, 
  Expand, 
  ArrowRight,
  Zap,
  Fingerprint
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const PipelineStep = ({ icon: Icon, title, description, tags, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg relative group overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-5 rounded-full ${color}`} />
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color} bg-opacity-10 text-opacity-100`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
    <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-sm text-slate-500 mb-4 leading-relaxed">{description}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: string) => (
        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

export const PreprocessingPipeline: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Preprocessing & ROI Pipeline</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Deep dive into our image normalization and Region of Interest (ROI) extraction logic used to prepare images for classification.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 relative">
        {/* Stage 1: Input */}
        <div className="flex flex-col items-center">
          <PipelineStep 
            icon={ImageIcon}
            title="Input Image Packet"
            description="Receiving raw image data from the user interface or camera stream."
            tags={["RGB", "Raw Data"]}
            color="bg-pink-500"
          />
          <ArrowRight className="w-6 h-6 text-slate-300 my-6 rotate-90" />
          <PipelineStep 
            icon={Settings2}
            title="MediaPipe Conversion"
            description="Normalizing image tensors and converting to a format compatible with landmark detection."
            tags={["Normalization", "Tensor conversion"]}
            color="bg-blue-500"
          />
        </div>

        {/* Branching Logic */}
        <div className="flex flex-col items-center my-8">
          <div className="bg-amber-50 border-2 border-amber-200 p-8 rounded-3xl text-center relative">
            <Target className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <h3 className="font-black text-amber-900">Landmark Detection</h3>
            <div className="absolute top-1/2 -left-12 w-12 h-0.5 bg-slate-200 hidden lg:block" />
            <div className="absolute top-1/2 -right-12 w-12 h-0.5 bg-slate-200 hidden lg:block" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Branch 1: Standard Shot */}
          <div className="space-y-6">
            <div className="text-center py-2 px-4 bg-green-50 text-green-700 rounded-full text-xs font-bold inline-block mx-auto mb-4">
              CASE: Landmarks Found (Standard View)
            </div>
            <PipelineStep 
              icon={Box}
              title="Bounding Box Calculation"
              description="Generating 2D coordinates around the detected anatomical landmarks."
              tags={["Coordinate Mapping"]}
              color="bg-green-500"
            />
            <PipelineStep 
              icon={Maximize2}
              title="Padding & Normalization"
              description="Adding safety margins (15-20%) to ensure context around the lesion is preserved."
              tags={["Margin Padding", "Relative Scale"]}
              color="bg-green-500"
            />
            <PipelineStep 
              icon={Scissors}
              title="High-Res Crop"
              description="Extracting the final ROI from the original high-resolution source image."
              tags={["Bilinear Interpolation"]}
              color="bg-green-500"
            />
          </div>

          {/* Branch 2: Macro Shot */}
          <div className="space-y-6">
            <div className="text-center py-2 px-4 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold inline-block mx-auto mb-4">
              CASE: No Landmarks (Macro/Close-up)
            </div>
            <PipelineStep 
              icon={Fingerprint}
              title="Selfie Segmentation Fallback"
              description="Using a segmentation mask to isolate foreground skin from background noise."
              tags={["Mask Generation"]}
              color="bg-indigo-500"
            />
            <PipelineStep 
              icon={Binary}
              title="Alpha Masking"
              description="Removing background and generating a transparency alpha channel for clean extraction."
              tags={["Background Removal", "Alpha"]}
              color="bg-indigo-500"
            />
            <PipelineStep 
              icon={Layers}
              title="Lesion Contour Analysis"
              description="Finding the largest contour area within the mask to define the lesion boundaries."
              tags={["Canny Edge", "Contour Detection"]}
              color="bg-indigo-500"
            />
          </div>
        </div>

        {/* Final Stage */}
        <div className="flex flex-col items-center mt-12 pt-12 border-t border-slate-100">
          <ArrowRight className="w-6 h-6 text-slate-300 mb-8 rotate-90" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <PipelineStep 
              icon={Expand}
              title="Resizing Engine"
              description="Final scaling of the refined stream to exact model input dimensions (e.g., 224x224)."
              tags={["Aspect Ratio lock", "224x224"]}
              color="bg-slate-900"
            />
            <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-center items-center text-center">
              <Zap className="w-12 h-12 text-yellow-400 mb-4 animate-pulse" />
              <h3 className="text-xl font-bold mb-2">Refined Stream Output</h3>
              <p className="text-slate-400 text-sm mb-4">Ready for secondary disease classification</p>
              <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-[10px] font-bold tracking-widest uppercase">
                To Acne/Eczema Classifier
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Reference */}
      <div className="mt-24 rounded-3xl overflow-hidden shadow-2xl relative h-64">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1695627152455-ca96d270d63f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3Njb3BlJTIwc2tpbiUyMHRleHR1cmUlMkMlMjBjb21wdXRlciUyMHZpc2lvbiUyMGJvdW5kaW5nJTIwYm94JTJDJTIwZGlnaXRhbCUyMGltYWdlJTIwc2VnbWVudGF0aW9uJTJDJTIwaW1hZ2UlMjBwcm9jZXNzaW5nJTIwZ3JpZCUyQyUyMG1hY3JvJTIwZGVybWF0b2xvZ3klMjBwaG90b3xlbnwxfHx8fDE3NzEyMTI0MzF8MA"
          alt="Processing Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-600/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-8 text-center">
          <h3 className="text-2xl font-black mb-2">Automated Precision</h3>
          <p className="max-w-md opacity-90">Our pipeline ensures that every image is framed perfectly for our neural network, regardless of camera distance or lighting.</p>
        </div>
      </div>
    </div>
  );
};
