import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './tools.css';

const TextGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedText(`Generated text based on: "${prompt}"\n\nThis is a placeholder for AI-generated content. In a real implementation, this would connect to an AI service like OpenAI's GPT or similar.`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="aitools-layout">
      <div className="tool-container">
      <div className="back-navigation">
        <Link to="/aitools" className="back-link">← Back to AI Tools</Link>
      </div>
      <h2>Text Generator</h2>
      <div className="tool-content">
        <div className="input-section">
          <label htmlFor="prompt">Enter your prompt:</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to generate..."
            rows={4}
          />
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="generate-button"
          >
            {isGenerating ? 'Generating...' : 'Generate Text'}
          </button>
        </div>
        
        {generatedText && (
          <div className="output-section">
            <h3>Generated Text:</h3>
            <div className="generated-content">
              {generatedText}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default TextGenerator;
