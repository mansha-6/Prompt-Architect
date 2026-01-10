"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { clsx } from "clsx";
import type { RefinedPrompt } from "@/lib/schemas";

export function RequirementsList({
  requirements,
}: {
  requirements: RefinedPrompt["functional_requirements"];
}) {
  return (
    <ul className="space-y-3">
      {requirements.map((req, idx) => (
        <li
          key={idx}
          className="flex gap-4 p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors group"
        >
          <div className="mt-1 flex-shrink-0">
             {req.priority === "Must Have" ? (
               <CheckCircle2 className="w-5 h-5 text-green-500" />
             ) : (
               <Circle className="w-5 h-5 text-blue-500" />
             )}
          </div>
          <div className="flex-1">
             <div className="flex items-center justify-between mb-1">
               <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                 {req.feature}
               </span>
               <span className={clsx(
                 "text-xs font-mono px-2 py-0.5 rounded border uppercase tracking-wider",
                 req.priority === "Must Have"
                   ? "bg-green-950/30 text-green-400 border-green-900"
                   : "bg-blue-950/30 text-blue-400 border-blue-900"
               )}>
                 {req.priority}
               </span>
             </div>
             <p className="text-sm text-gray-400 leading-relaxed">
               {req.description}
             </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
