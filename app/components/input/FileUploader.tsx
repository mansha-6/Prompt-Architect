"use client";

import { useDropzone } from "react-dropzone";
import { Upload, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FileUploaderProps {
  files: File[];
  onFilesChanged: (files: File[]) => void;
}

export function FileUploader({ files, onFilesChanged }: FileUploaderProps) {
  const onDrop = (acceptedFiles: File[]) => {
    onFilesChanged([...files, ...acceptedFiles]);
  };

  const removeFile = (index: number) => {
    onFilesChanged(files.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col gap-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 transition-all cursor-pointer min-h-[160px]",
          isDragActive
            ? "border-blue-500 bg-blue-500/10"
            : "border-gray-700 hover:border-blue-500/50 hover:bg-gray-800/50"
        )}
      >
        <input {...getInputProps()} />
        <div className="p-3 bg-gray-800 rounded-full mb-3">
             <Upload className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm text-gray-400 text-center font-medium">
          {isDragActive
            ? "Drop files now..."
            : "Drag & drop images, PDFs, or docs"}
        </p>
        <p className="text-xs text-gray-500 mt-1">Max 10MB per file</p>
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {files.map((file, i) => (
              <motion.div
                key={file.name + i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700 text-sm group"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span className="truncate max-w-[120px] text-gray-300">
                  {file.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                  className="bg-gray-700 hover:bg-red-500/20 hover:text-red-400 rounded-full p-0.5 ml-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
