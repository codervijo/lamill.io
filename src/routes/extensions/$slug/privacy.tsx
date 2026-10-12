import { createFileRoute, redirect } from "@tanstack/react-router";

// One shared policy covers every extension (Tabmill D-036); old per-extension
// URLs redirect to it.
export const Route = createFileRoute("/extensions/$slug/privacy")({
  beforeLoad: () => {
    throw redirect({ to: "/extensions/privacy", statusCode: 301 });
  },
});
