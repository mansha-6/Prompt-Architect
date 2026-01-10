import PromptRefiner from "./components/PromptRefiner";

export default function Home() {
  return (
    <main className="min-h-screen p-4 lg:p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-100">
            Prompt<span className="text-blue-500">Architect</span>
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Transform vague ideas, sketches, and documents into professional technical specifications using Gemini 2.5 Flash.
          </p>
        </header>

        <PromptRefiner />
      </div>
    </main>
  );
}
