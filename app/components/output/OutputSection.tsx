"use client";

import { Check, Sparkles } from "lucide-react";
import { Card } from "../ui/Card";
import type { RefinedPrompt } from "@/lib/schemas";
import { RequirementsList } from "./RequirementsList";
import { TechStackView } from "./TechStackView";

interface OutputSectionProps {
  data: RefinedPrompt | null;
}

export function OutputSection({ data }: OutputSectionProps) {
  return (
    <Card className="flex flex-col h-full bg-gray-950 border-gray-800 relative overflow-hidden">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/80 backdrop-blur-md sticky top-0 z-10">
        <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-500" />
          Specification
        </h2>
        {data && (
          <span className="text-xs font-mono text-green-400 bg-green-950/30 border border-green-900/50 px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
            Ready
          </span>
        )}
      </div>

      {data ? (
        <div className="flex-1 overflow-y-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 scrollbar-thin scrollbar-thumb-gray-800">
          
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-white">
              {data.project_metadata.title || "Untitled Project"}
            </h1>
            <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700">
                    {data.project_metadata.type}
                </span>
                <span className="px-3 py-1 rounded-md bg-purple-950/30 text-purple-300 border border-purple-900/50">
                    Complexity: {data.project_metadata.complexity_level}
                </span>
            </div>
          </div>

          {/* Core Intent */}
          <div className="p-5 rounded-xl bg-gray-900/50 border border-gray-800">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Core Intent</h3>
             <p className="text-gray-300 leading-relaxed text-lg font-light">
               "{data.core_intent}"
             </p>
          </div>

          <RequirementsList requirements={data.functional_requirements} />

          <TechStackView 
              techStack={data.technical_specifications.suggested_stack} 
              ambiguities={data.ambiguities_and_questions}
          />

        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-900/50 flex items-center justify-center mb-6 ring-1 ring-gray-800">
               <Sparkles className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">Ready to Architect</h3>
            <p className="text-gray-500 max-w-sm">
              Provide your rough ideas on the left, and watch them transform into a professional specification here.
            </p>
        </div>
      )}
    </Card>
  );
}
