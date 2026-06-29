import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/aitools/text-generator")({
  head: () => ({
    meta: [
      { title: "Text Generator — LaMill AI Tools" },
      {
        name: "description",
        content: "Generate creative text content using AI.",
      },
    ],
  }),
  component: TextGeneratorPage,
});

function TextGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    // Placeholder — wire to a real LLM (e.g. Claude) when available.
    setTimeout(() => {
      setGeneratedText(
        `Generated text based on: "${prompt}"\n\nThis is a placeholder for AI-generated content. In a real implementation, this would connect to an AI service such as Anthropic's Claude.`,
      );
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <SiteShell>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-20 md:pt-28">
          <Link
            to="/aitools"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:text-primary"
          >
            ← Back to AI Tools
          </Link>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Text <span className="text-primary glow-text">Generator</span>
          </h1>

          <div className="mt-10 space-y-4">
            <label
              htmlFor="prompt"
              className="block font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
            >
              // Enter your prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to generate…"
              rows={4}
              className="w-full resize-none rounded-sm border border-border bg-card/30 p-4 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary"
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGenerating ? "Generating…" : "Generate text →"}
            </button>
          </div>

          {generatedText ? (
            <div className="mt-12">
              <div className="font-mono text-xs uppercase tracking-widest text-primary">
                // Generated text
              </div>
              <pre className="mt-3 whitespace-pre-wrap rounded-sm border border-border bg-card/30 p-6 font-sans text-sm leading-relaxed text-foreground">
                {generatedText}
              </pre>
            </div>
          ) : null}
        </div>
      </section>
    </SiteShell>
  );
}
