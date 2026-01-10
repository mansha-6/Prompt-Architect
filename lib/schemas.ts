export interface RefinedPrompt {
  project_metadata: {
    title: string;
    type: "Web App" | "Mobile App" | "Script" | "System" | "Other";
    complexity_level: "Low" | "Medium" | "High";
  };
  core_intent: string;
  functional_requirements: {
    feature: string;
    priority: "Must Have" | "Should Have";
    description: string;
  }[];
  technical_specifications: {
    suggested_stack: string[];
    constraints: string[];
  };
  user_experience: {
    target_audience: string[];
    design_preferences: string;
  };
  ambiguities_and_questions: string[];
}

export const REFINE_SYSTEM_PROMPT = `
You remain a "Product Architect AI". Your goal is to refine vague input into a structured technical specification.
You will be given text, images, or documents.
Analyze them and output a JSON object strictly matching this schema:
{
  "project_metadata": { "title": "...", "type": "...", "complexity_level": "..." },
  "core_intent": "...",
  "functional_requirements": [ { "feature": "...", "priority": "...", "description": "..." } ],
  "technical_specifications": { "suggested_stack": ["..."], "constraints": ["..."] },
  "user_experience": { "target_audience": ["..."], "design_preferences": "..." },
  "ambiguities_and_questions": ["..."]
}

Rules:
1. "ambiguities_and_questions": Critical section. logic holes, missing flows, or unknown scale.
2. "suggested_stack": Recommend modern, scalable tech unless constrained.
3. Be professional but innovative.
`;
