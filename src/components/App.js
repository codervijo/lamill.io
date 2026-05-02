import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import SectionList from './SectionList.js';

class App extends Component {
  render() {
    return (
      <div className="AppContainer">
        <Header />
        <SectionList />
        <Footer />
      </div>
    );
  }
}

export default App;
