# AI Tools Directory

This directory contains AI-powered tools and utilities for the application.

## Structure

```
src/pages/aitools/
├── AITools.jsx          # Main AI tools landing page
├── AITools.css          # Styles for the main page
├── README.md           # This file
└── tools/              # Individual AI tools
    ├── index.js        # Tool exports
    ├── tools.css       # Shared styles for tools
    ├── TextGenerator.jsx    # Text generation tool
    └── ImageAnalyzer.jsx    # Image analysis tool
```

## Routes

- `/aitools` - Main AI tools page with tool grid
- `/aitools/text-generator` - Text generation tool
- `/aitools/image-analyzer` - Image analysis tool

## Adding New Tools

1. Create a new component in the `tools/` directory
2. Import and add the CSS: `import './tools.css';`
3. Add navigation: `import { Link } from 'react-router-dom';`
4. Include back navigation: `<Link to="/aitools" className="back-link">← Back to AI Tools</Link>`
5. Add the route in `src/App.jsx`
6. Add the tool card to `AITools.jsx`
7. Export the component in `tools/index.js`

## Features

- Responsive design
- Clean, modern UI
- Navigation between tools
- Placeholder functionality for future AI integrations
- No links from main site (hidden section)
- Header and footer are hidden when in AI tools section
- Full-height layout with custom styling for AI tools
- Gradient background for AI tools pages

## Future Enhancements

- Connect to actual AI APIs (OpenAI, Google Cloud Vision, etc.)
- Add more tools (Code Assistant, Language Translator, etc.)
- Implement user authentication if needed
- Add tool usage analytics
- Implement tool favorites/bookmarks
