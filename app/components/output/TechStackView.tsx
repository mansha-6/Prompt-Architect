"use client";

import { Code2, HelpCircle } from "lucide-react";

interface TechStackViewProps {
  techStack: string[];
  ambiguities: string[];
}

export function TechStackView({ techStack, ambiguities }: TechStackViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Tech Stack */}
      <div className="p-5 rounded-xl bg-blue-950/10 border border-blue-900/30 backdrop-blur-sm">
        <h4 className="flex items-center gap-2 font-medium mb-3 text-blue-300">
          <Code2 className="w-4 h-4" />
          Recommended Stack
        </h4>
        <div className="flex flex-wrap gap-2">
          {techStack.map((t, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-blue-900/40 border border-blue-700/50 rounded-md text-xs text-blue-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Ambiguities */}
      <div className="p-5 rounded-xl bg-orange-950/10 border border-orange-900/30 backdrop-blur-sm">
        <h4 className="flex items-center gap-2 font-medium mb-3 text-orange-300">
          <HelpCircle className="w-4 h-4" />
          Pending Questions
        </h4>
        <ul className="list-disc list-inside space-y-2">
          {ambiguities.map((q, i) => (
            <li key={i} className="text-sm text-orange-200/80 leading-snug">
              {q}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
