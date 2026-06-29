import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, PageHeader } from "@/components/site-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — LaMill" },
      {
        name: "description",
        content:
          "Tell us about your project. We'll respond within one business day with a concrete plan.",
      },
      { property: "og:title", content: "Contact — LaMill" },
      {
        property: "og:description",
        content: "Start a project with LaMill. One business day response.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteShell>
      <PageHeader
        kicker="Contact"
        title={
          <>
            We're happy to <span className="text-primary glow-text">hear from you.</span>
          </>
        }
        intro="Tell us about your project. We respond within one business day with a concrete plan."
      />

      <section>
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 md:grid-cols-[1fr_2fr] md:py-28">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary">
              // Direct
            </div>
            <a
              href="mailto:hello@lamill.io"
              className="mt-3 block text-2xl font-semibold tracking-tight text-foreground transition hover:text-primary md:text-3xl"
            >
              hello@lamill.io
            </a>
            <p className="mt-6 text-muted-foreground">
              Prefer email? Skip the form. Mention scope, timeline, and what success looks like.
            </p>

            <div className="mt-12 space-y-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <div>
                <div className="text-primary">// Response</div>
                <div className="mt-1 text-foreground">≤ 1 business day</div>
              </div>
              <div>
                <div className="text-primary">// Engagements</div>
                <div className="mt-1 text-foreground">Project · Retainer · Embedded</div>
              </div>
              <div>
                <div className="text-primary">// Timezone</div>
                <div className="mt-1 text-foreground">Distributed — US + EU coverage</div>
              </div>
            </div>
          </div>

          <form
            className="rounded-sm border border-border bg-card/30 p-8 md:p-10"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            {submitted ? (
              <div className="flex min-h-[400px] flex-col items-start justify-center">
                <div className="font-mono text-xs uppercase tracking-widest text-primary">
                  // Received
                </div>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight">
                  Thanks — we'll be in touch.
                </h3>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Expect a reply within one business day. If it's urgent, email{" "}
                  <a href="mailto:hello@lamill.io" className="text-primary hover:underline">
                    hello@lamill.io
                  </a>
                  .
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <Field label="Name">
                  <input
                    type="text"
                    required
                    className="w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition focus:border-primary"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    required
                    className="w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition focus:border-primary"
                  />
                </Field>
                <Field label="How did you find us?">
                  <select
                    className="w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition focus:border-primary"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="friends" className="bg-background">
                      Friends
                    </option>
                    <option value="search" className="bg-background">
                      Search engine
                    </option>
                    <option value="ad" className="bg-background">
                      Advertisement
                    </option>
                    <option value="other" className="bg-background">
                      Other
                    </option>
                  </select>
                </Field>
                <Field label="Project">
                  <textarea
                    rows={5}
                    required
                    placeholder="Scope, timeline, what success looks like…"
                    className="w-full resize-none border-b border-border bg-transparent py-3 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary"
                  />
                </Field>
                <label className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <input type="checkbox" className="accent-primary" />
                  Newsletter? Yes, please
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
                >
                  Send brief →
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        // {label}
      </span>
      {children}
    </label>
  );
}