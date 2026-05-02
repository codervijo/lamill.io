import React, { Component } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
        <footer>
            <div className="row">
                <div className="col span-1-of-2">
                    <ul className="footer-nav">
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">iOS App</a></li>
                        <li><a href="#">Android App</a></li>
                    </ul>
                </div>
                <div className="col span-1-of-2">
                    <ul className="social-links">
                        <li><a href="#" aria-label="Facebook"><FaFacebook /></a></li>
                        <li><a href="#" aria-label="Twitter"><FaTwitter /></a></li>
                        <li><a href="#" aria-label="Instagram"><FaInstagram /></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
  }
}

export default Footer;
