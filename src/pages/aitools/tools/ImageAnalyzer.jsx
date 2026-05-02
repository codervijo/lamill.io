import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './tools.css';

const ImageAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setAnalysis(''); // Clear previous analysis
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysis(`Image Analysis Results:

• File name: ${selectedImage.name}
• File size: ${(selectedImage.size / 1024).toFixed(2)} KB
• File type: ${selectedImage.type}

AI Analysis (Simulated):
This appears to be an image file. In a real implementation, this would connect to an AI vision service like OpenAI's Vision API, Google Cloud Vision, or similar to provide detailed analysis of the image content, including object detection, text recognition, scene description, and more.

Key features that could be detected:
- Objects and their locations
- Text content (OCR)
- Faces and emotions
- Colors and composition
- Scene context and setting`);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="aitools-layout">
      <div className="tool-container">
      <div className="back-navigation">
        <Link to="/aitools" className="back-link">← Back to AI Tools</Link>
      </div>
      <h2>Image Analyzer</h2>
      <div className="tool-content">
        <div className="input-section">
          <label htmlFor="image-upload">Select an image to analyze:</label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="file-input"
          />
          
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Selected" style={{maxWidth: '300px', maxHeight: '300px'}} />
            </div>
          )}
          
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || !selectedImage}
            className="analyze-button"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </div>
        
        {analysis && (
          <div className="output-section">
            <h3>Analysis Results:</h3>
            <div className="analysis-content">
              <pre>{analysis}</pre>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;
