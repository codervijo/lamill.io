import type { WorkEntry } from "@/lib/content";

const entry: WorkEntry = {
  slug: "montereybayevents",
  title: "Monterey Bay Events",
  url: "https://montereybayevents.com/",
  summary:
    "A fast, mobile-first calendar of public events across Monterey and Santa Cruz counties — dates, places, and free-or-ticketed at a glance.",
  description:
    "Monterey Bay Events — a Monterey and Santa Cruz county event calendar built on Astro, with per-event pages, valid Event schema, and Car Week schedule and traffic guides.",
  date: "2026-08-03",
  tags: ["Content site", "Local SEO"],
  stack: ["Astro", "Cloudflare Workers"],
  status: "published",
  body: [
    "Monterey Bay Events is a calendar of public events across Monterey and Santa Cruz counties — Car Week, county fairs, festivals, parades, holiday markets, and the free community events that get buried on official sites.",
    "The region's event information is scattered across chamber calendars, city PDFs, and map widgets that search engines can't read. The site puts each event on its own indexable page with its date, location, free-or-ticketed status, and a link to the organizer.",
    "It's built on Astro and deployed to Cloudflare. Every event page emits structured Event data, and the Monterey Car Week section adds a schedule, a free-events page, and road-closure and parking guidance.",
  ],
};

export default entry;
