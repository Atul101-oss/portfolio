import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Image as ImageIcon, X, RefreshCw, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageUploaderProps {
  onAnalyze: (image: string) => void;
  isAnalyzing: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onAnalyze, isAnalyzing }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Callback ref: attaches stream to video element as soon as it mounts
  const setVideoRef = (node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node && stream) {
      node.srcObject = stream;
    }
  };

  // Also handle the case where stream changes after video is already mounted
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      let mediaStream: MediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
      } catch (e) {
        console.warn("Failed to get environment camera, falling back to any camera", e);
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
      }
      setIsCapturing(true);
      setStream(mediaStream);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please ensure you have given permission.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCapturing(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        setPreview(imageData);
        stopCamera();
      }
    }
  };

  const handleClear = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Upload Skin Sample</h2>
        <p className="text-slate-500 mb-8">Please provide a clear, well-lit photo of the affected skin area for analysis.</p>

        <div className="relative group">
          <AnimatePresence mode="wait">
            {isCapturing ? (
              <motion.div
                key="camera"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative rounded-2xl overflow-hidden aspect-video bg-black"
              >
                <video
                  ref={setVideoRef}
                  autoPlay
                  playsInline
                  muted
                  onLoadedMetadata={(e) => {
                    (e.target as HTMLVideoElement).play().catch(err => {
                      console.error("Error playing video:", err);
                    });
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
                  <button
                    onClick={captureImage}
                    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all active:scale-95"
                  >
                    <Camera className="w-6 h-6" />
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-white/90 backdrop-blur p-4 rounded-full text-slate-800 hover:bg-red-50 hover:text-red-600 transition-all shadow-lg active:scale-95"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <canvas ref={canvasRef} className="hidden" />
              </motion.div>
            ) : !preview ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center bg-slate-50 hover:bg-blue-50/50 transition-colors cursor-pointer"
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('button')) return;
                  fileInputRef.current?.click();
                }}
              >
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-slate-700 font-semibold">Drop your image here</p>
                <p className="text-slate-400 text-sm mt-1">or click to browse from device</p>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={startCamera}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-all"
                  >
                    <Camera className="w-4 h-4" /> Capture Live
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative rounded-2xl overflow-hidden aspect-video bg-black"
              >
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={handleClear}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full text-slate-800 hover:bg-red-50 hover:text-red-600 transition-all shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div className="mt-8">
          <button
            onClick={() => preview && onAnalyze(preview)}
            disabled={!preview || isAnalyzing}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${!preview
              ? 'bg-slate-300 cursor-not-allowed'
              : isAnalyzing
                ? 'bg-blue-400'
                : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
              }`}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Analyzing Skin Pattern...
              </>
            ) : (
              <>
                <Activity className="w-5 h-5" />
                Analyze Skin Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
