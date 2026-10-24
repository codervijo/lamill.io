import type { ExtensionPageInput } from "@/lib/extension-pages";

// Facts: only the operator's 2026-10-17 list (docs/Prompts.md) — nothing beyond
// it. Never claim it blocks or removes ads (operator, 2026-10-23).
const DIR = "/extensions/save-page-pdf-md";

const page: ExtensionPageInput = {
  slug: "save-page-pdf-md",
  title: "Save Webpage as Markdown or PDF – Free Chrome Extension | LaMill",
  h1: "Save Webpage as Markdown or PDF",
  description:
    "Free Chrome extension that saves the page you're reading as clean Markdown or a print-ready PDF. Runs locally — page content never leaves your browser.",
  valueProp:
    "Save the current page as clean Markdown or a print-ready PDF. Runs locally — nothing is uploaded.",
  facts: ["Free", "v0.1.0", "Manifest V3", "~34 KB", "Runs locally"],
  version: "0.1.0",
  video: {
    src: `${DIR}/save-page-silent-16x9.web.mp4`,
    alt: "Demo: saving a web article as Markdown and as a PDF with the extension's popup",
    youtube: {
      id: "h2GWC_BamQQ",
      title: "Save Any Web Page as Markdown or PDF in One Click (Free Chrome Extension)",
      description:
        "Save the page you're reading as clean Markdown or a print-ready PDF with the free Save Page as Markdown or PDF Chrome extension. Runs locally — page content never leaves your browser.",
      uploadDate: "2026-10-23",
    },
  },
  steps: [
    "Open the page you want to keep.",
    "Click the extension and choose Markdown or PDF.",
    "Markdown downloads a .md file. For PDF, pick “Save as PDF” in Chrome's print dialog.",
  ],
  gallery: [
    {
      src: `${DIR}/shot-before-after.png`,
      alt: "Before and after: a James Clear articles page with its newsletter sign-up box, and the same article in the extension's clean print view",
      caption: "Before → After",
    },
    {
      src: `${DIR}/shot-popup.png`,
      alt: "The Save Page as Markdown or PDF popup opened from the Chrome toolbar, with Save as Markdown and Save as PDF buttons",
      caption: "One click: Markdown or PDF",
    },
    {
      src: `${DIR}/shot-pdf.png`,
      alt: "Chrome's print dialog with Save as PDF chosen as the destination",
      caption: "Save as PDF from Chrome's print dialog",
    },
  ],
  sections: [
    {
      kicker: "What you get",
      heading: "Clean Markdown or a print-ready PDF.",
      paragraphs: [
        "Save as Markdown downloads a .md file with the article, plus its title, source URL and the date you saved it at the top.",
        "Save as PDF opens the article in a clean print view without menus and sidebars. Pick “Save as PDF” in Chrome's print dialog to keep it.",
        "It uses Mozilla Readability to find the main article. On pages with no article — homepages, web apps — the Markdown save falls back to the whole page and says so.",
      ],
    },
    {
      kicker: "Great for",
      heading: "Text you can keep, search and reuse.",
      items: [
        "Clipping pages into Obsidian, Logseq or Notion",
        "Clean Markdown for ChatGPT, Claude or a local LLM",
        "Docs and code pages you want offline",
        "Research and archiving",
      ],
    },
    {
      kicker: "Privacy",
      heading: "Runs locally.",
      paragraphs: [
        "Page content never leaves your browser. The extension asks for three permissions — activeTab, scripting and storage — and each is explained below.",
      ],
    },
  ],
  faq: [
    { q: "Is it free?", a: "Yes. The extension is free." },
    {
      q: "Does it upload anything?",
      a: "No. It runs locally: page content never leaves your browser, and it collects no data.",
    },
    {
      q: "Why doesn't it work on some pages?",
      a: "Chrome doesn't let any extension run on chrome:// pages or the Chrome Web Store, so it can't save those.",
    },
    {
      q: "Why did it save the whole page instead of the article?",
      a: "It uses Mozilla Readability to find the main article. Some pages — homepages, web apps — don't have one, so the Markdown save falls back to the whole page and says so.",
    },
    {
      q: "How do I get pages into Obsidian?",
      a: "Choose Save as Markdown, then move the downloaded .md file into your Obsidian vault. The title, source URL and saved date are at the top of the file.",
    },
    {
      q: "Markdown or PDF?",
      a: "Markdown if you want to edit, search or link the text — in a notes app, or pasted into an LLM. PDF if you want a fixed, print-ready copy to read, share or archive.",
    },
  ],
  links: [
    {
      label: "Guide: how to save a webpage as a clean PDF",
      href: "https://markpdf.dev/save-webpage-as-pdf/?utm_source=lamill.io",
    },
    {
      label: "Need branded PDFs from Markdown? Try MarkPDF",
      href: "https://markpdf.dev/?utm_source=lamill.io",
    },
  ],
  ogImage: `${DIR}/og.png`,
};

export default page;
