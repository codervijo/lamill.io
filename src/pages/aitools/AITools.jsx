import React from 'react';
import { Link } from 'react-router-dom';
import './AITools.css';

const AITools = () => {
  return (
    <div className="aitools-layout">
      <div className="aitools-container">
      <div className="aitools-header">
        <h1>AI Tools</h1>
        <p>A collection of AI-powered tools and utilities</p>
      </div>
      
      <div className="tools-grid">
        <div className="tool-card">
          <h3>Text Generator</h3>
          <p>Generate creative text content using AI</p>
          <Link to="/aitools/text-generator">
            <button className="tool-button">Try Now</button>
          </Link>
        </div>
        
        <div className="tool-card">
          <h3>Image Analyzer</h3>
          <p>Analyze and describe images with AI</p>
          <Link to="/aitools/image-analyzer">
            <button className="tool-button">Try Now</button>
          </Link>
        </div>
        
        <div className="tool-card">
          <h3>Code Assistant</h3>
          <p>Get help with coding tasks and debugging</p>
          <button className="tool-button">Coming Soon</button>
        </div>
        
        <div className="tool-card">
          <h3>Language Translator</h3>
          <p>Translate text between multiple languages</p>
          <button className="tool-button">Coming Soon</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AITools;
