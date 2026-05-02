import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import AITools from './pages/aitools/AITools.jsx';
import TextGenerator from './pages/aitools/tools/TextGenerator.jsx';
import ImageAnalyzer from './pages/aitools/tools/ImageAnalyzer.jsx';

const AppContent = () => {
  const location = useLocation();
  const isAIToolsRoute = location.pathname.startsWith('/aitools');

  return (
    <div className="AppContainer">
      {!isAIToolsRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/aitools" element={<AITools />} />
        <Route path="/aitools/text-generator" element={<TextGenerator />} />
        <Route path="/aitools/image-analyzer" element={<ImageAnalyzer />} />
      </Routes>
      {!isAIToolsRoute && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
