# Prompt Refinement System - Design & Rationale

## 1. Problem Solving Approach & Thought Process

When presented with the challenge of building a "Multi-Modal Prompt Refinement System," I approached it as a **Translation and Normalization** problem. The goal is to translate "Human Ambiguity" (sketches, vague texts, PDFs) into "Technical Clarity" (structured JSON).

My core thought process involved three stages:

1.  **Ingestion Strategy (The "Ears" & "Eyes")**:
    *   The system needs to blindly accept anything. I didn't want the user to categorize their input ("This is a requirement doc"). The system should just *see* it.
    *   *Decision*: Use a unified drop zone and leverage a Multi-Modal LLM's native capabilities rather than chaining separate OCR (Tesseract) or PDF parsers. This reduces architectural complexity and latency.

2.  **Structuring Strategy (The "Brain")**:
    *   Raw refined text is not enough for downstream automation. I needed a **Schema**.
    *   I asked: "What does a Senior Software Engineer need to start coding?"
        *   They need *What* (Intent), *How* (Tech Stack), *Who* (Audience), and most importantly, *What's Missing* (Ambiguities).

3.  **Delivery Information (The "Face")**:
    *   A CLI tool is proficient, but a Web UI demonstrates the "Product" aspect better.
    *   *Decision*: Build a modern, responsive Web App (Next.js) to visualize the contrast between "Raw Input" and "Polished Output".

## 2. Template & Data Structure Design

I designed a JSON schema that balances rigidity (for code) and flexibility (for ideas).

```typescript
interface RefinedPrompt {
  project_metadata: {
    title: string;
    type: "Web App" | "Mobile App" | "System" | ...;
    complexity_level: "Low" | "Medium" | "High";
  };
  core_intent: string;
  functional_requirements: {
    feature: string;
    priority: "Must Have" | "Should Have"; // MoSCoW method
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
```

### Rationale for Fields:

*   **`project_metadata`**: Immediate triage. Allows project managers to quickly categorize the scale and domain of the request without reading the whole spec.
*   **`functional_requirements` (MoSCoW)**: I explicitly enforced a priority field (`Must Have` vs `Should Have`). Clients often want "everything," and forcing the AI to infer priority based on language cues (e.g., "It is essential that..." vs "It would be nice if...") adds immense value.
*   **`ambiguities_and_questions`**: **This is the critical "Consultant" feature.** A junior developer builds exactly what is asked. A senior developer asks, "What happens if the API fails?" This field captures that critical thinking simulating a senior engineer's review of the raw prompt.

## 3. Information Extraction Strategy

I utilized **In-Context Learning** via System Prompts rather than fine-tuning.

*   **Prompt Engineering**: I instructed the AI to act as a "Product Architect." This persona setting frames the output to be technical and critical, rather than creative and marketing-oriented.
*   **Multi-Modal Pipeline**:
    *   **Text**: Passed directly.
    *   **Images/PDFs**: Converted to Base64 and fed natively to Gemini 2.5 Flash. This bypasses the error-prone step of "Image -> Text Description -> AI". Gemini "sees" the UI sketch and infers buttons/flows directly.

## 4. Alternative Approaches Considered

| Approach | Pros | Cons | Verdict |
| :--- | :--- | :--- | :--- |
| **Traditional NLP (Spacy/NLTK)** | Fast, offline | Fails completely on unstructured/vague/creative inputs. | **Rejected** |
| **Chained LLMs (GPT-4 for text + Vision Model)** | Powerful | High latency, higher cost, complex coordination. | **Rejected** |
| **Gemini 2.5 Flash (End-to-End)** | Native Multi-modal, Huge Context, Fast | Dependent on one provider. | **Selected** |

I chose **Gemini 2.5 Flash** specifically because of its speed-to-intelligence ratio. For a real-time "refinement" tool, waiting 30 seconds for GPT-4 is bad UX. Flash delivers in <5 seconds.

## 5. Unique Contribution & Distinction

*   **AI's Role**: The AI performs the heavy lifting of linguistic parsing, pattern matching, and OCR. It hallucinates component names based on sketches.
*   **My Role (Human)**:
    1.  **Schema Definition**: I defined *what* a "Good Specification" looks like. The AI didn't invent the JSON structure; I imposed it to ensure downstream utility.
    2.  **Architectural Resilience**: I built the error handling (JSON parsing recovery) and the UI/UX flow that guides the user.
    3.  **The "Ambiguity" Heuristic**: I specifically engineered the prompt to look for *holes* in the requirements, not just summarize them. This transforms the tool from a "Summarizer" to a "Critique Partner."
