"use client";

import { useState } from "react";
import type { RefinedPrompt } from "@/lib/schemas";
import { InputSection } from "./input/InputSection";
import { OutputSection } from "./output/OutputSection";

export default function PromptRefiner() {
  const [textInput, setTextInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isRefining, setIsRefining] = useState(false);
  const [refinedData, setRefinedData] = useState<RefinedPrompt | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRefine = async () => {
    if (!textInput && files.length === 0) {
      setError("Please provide some text or a file to refine.");
      return;
    }

    setIsRefining(true);
    setError(null);

    const formData = new FormData();
    formData.append("text", textInput);
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/refine", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to refine");

      setRefinedData(data.structured);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[85vh]">
      <InputSection 
        textInput={textInput}
        setTextInput={setTextInput}
        files={files}
        setFiles={setFiles}
        onRefine={handleRefine}
        isRefining={isRefining}
        error={error}
      />
      <OutputSection data={refinedData} />
    </div>
  );
}
