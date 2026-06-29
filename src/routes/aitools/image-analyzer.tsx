import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ChangeEvent } from "react";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/aitools/image-analyzer")({
  head: () => ({
    meta: [
      { title: "Image Analyzer — LaMill AI Tools" },
      {
        name: "description",
        content: "Analyze and describe images with AI.",
      },
    ],
  }),
  component: ImageAnalyzerPage,
});

function ImageAnalyzerPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview((e.target?.result as string) ?? "");
    reader.readAsDataURL(file);
    setAnalysis("");
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    // Placeholder — wire to a real vision model (e.g. Claude) when available.
    setTimeout(() => {
      setAnalysis(
        `Image Analysis Results:\n\n` +
          `• File name: ${selectedImage.name}\n` +
          `• File size: ${(selectedImage.size / 1024).toFixed(2)} KB\n` +
          `• File type: ${selectedImage.type}\n\n` +
          `AI Analysis (Simulated):\n` +
          `This is a placeholder. In a real implementation, this would connect to a vision model ` +
          `such as Anthropic's Claude to describe objects, text (OCR), scene, and composition.`,
      );
      setIsAnalyzing(false);
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
            Image <span className="text-primary glow-text">Analyzer</span>
          </h1>

          <div className="mt-10 space-y-4">
            <label
              htmlFor="image-upload"
              className="block font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
            >
              // Select an image to analyze
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-sm file:border-0 file:bg-primary file:px-4 file:py-2 file:font-mono file:text-xs file:font-semibold file:uppercase file:tracking-widest file:text-primary-foreground hover:file:bg-primary/90"
            />

            {imagePreview ? (
              <div className="overflow-hidden rounded-sm border border-border">
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="max-h-[320px] w-auto object-contain"
                />
              </div>
            ) : null}

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !selectedImage}
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing…" : "Analyze image →"}
            </button>
          </div>

          {analysis ? (
            <div className="mt-12">
              <div className="font-mono text-xs uppercase tracking-widest text-primary">
                // Analysis results
              </div>
              <pre className="mt-3 whitespace-pre-wrap rounded-sm border border-border bg-card/30 p-6 font-sans text-sm leading-relaxed text-foreground">
                {analysis}
              </pre>
            </div>
          ) : null}
        </div>
      </section>
    </SiteShell>
  );
}
