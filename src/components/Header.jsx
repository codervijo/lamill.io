import React, { Component } from 'react';
import './Header.css';
import { Waypoint } from 'react-waypoint';
import { Link } from 'react-router-dom';
import { FaHome, FaBars, FaTimes } from 'react-icons/fa'; 

class Header extends Component {
  constructor() {
    super();
    this.state = {
      navclass: "sticky",
      isMenuOpen: false
    };
    this.handleScrollUp = this.handleScrollUp.bind(this);
    this.handleScrollDown = this.handleScrollDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleScrollDown() {
    this.setState({ navclass: "sticky" });
  }

  handleScrollUp() {
    this.setState({ navclass: "" });
  }

  toggleMenu() {
    this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));
  }

  render() {
    const { navclass, isMenuOpen } = this.state;
    
    return (
      <header>
        <nav className={navclass}>
          <div className="nav-container">
            <div className="brand">
              <Link to="/" className="brand-logo">
                <span style={{ marginRight: '0.5rem', display: 'flex', alignItems: 'center' }}>
                  <FaHome size={30} color="#fff" />
                </span>
                Lamill
              </Link>
            </div>

            <button className="mobile-nav-icon" onClick={this.toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            <ul className={`main-nav ${isMenuOpen ? 'nav-active' : ''}`}>
              <li><a href="#services" onClick={this.toggleMenu}>Services</a></li>
              <li><a href="#content" onClick={this.toggleMenu}>Content</a></li>
              <li><a href="#software" onClick={this.toggleMenu}>Software</a></li>
              <li><a href="#form" onClick={this.toggleMenu}>Signup</a></li>
            </ul>
          </div>
        </nav>

        <Waypoint onEnter={this.handleScrollUp} onLeave={this.handleScrollDown}>
          <div className="hero-text-box">
            <h1><span className="normal">LaMill - Build. Deploy. Advance.</span></h1>
            <a className="btn btn-full js--scroll-to-form" href="#form">Signup</a>
            <a className="btn btn-ghost js--scroll-to-services" href="#services">Show me more</a>
          </div>
        </Waypoint>
      </header>
    );
  }
}

export default Header;

