"use client";

import { Upload, Sparkles } from "lucide-react";
import { Card } from "../ui/Card";
import { FileUploader } from "./FileUploader";

interface InputSectionProps {
  textInput: string;
  setTextInput: (val: string) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  onRefine: () => void;
  isRefining: boolean;
  error: string | null;
}

export function InputSection({
  textInput,
  setTextInput,
  files,
  setFiles,
  onRefine,
  isRefining,
  error,
}: InputSectionProps) {
  return (
    <Card className="flex flex-col h-full relative overflow-hidden group border-gray-800">
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 -z-10 group-hover:scale-105 transition-transform duration-700" />

      <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
        <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
          <Upload className="w-5 h-5 text-blue-500" />
          Input Context
        </h2>
        <span className="text-xs font-mono text-gray-500 border border-gray-800 px-2 py-1 rounded-md">
           Markdown Supported
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-6">
        <textarea
          placeholder="Describe your idea here... (e.g., 'I want a sleek fitness dashboard with dark mode')"
          className="w-full h-40 p-4 rounded-xl bg-gray-950/50 border border-gray-800 text-gray-200 placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none font-sans"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />

        <FileUploader files={files} onFilesChanged={setFiles} />
        
        {error && (
             <div className="p-3 bg-red-900/20 border border-red-900/50 text-red-400 text-sm rounded-lg">
               {error}
             </div>
        )}

        <div className="mt-auto">
          <button
            onClick={onRefine}
            disabled={isRefining}
            className="w-full py-4 bg-gray-100 hover:bg-white text-gray-950 rounded-xl font-medium transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10"
          >
            {isRefining ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-purple-600 fill-purple-600" />
                Refine Prompt
              </>
            )}
          </button>
        </div>
      </div>
    </Card>
  );
}
