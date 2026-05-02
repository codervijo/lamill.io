import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
                        <li><a href="#"><i className="ion-logo-facebook"></i></a></li>
                        <li><a href="#"><i className="ion-logo-twitter"></i></a></li>
                        <li><a href="#"><i className="ion-logo-googleplus"></i></a></li>
                        <li><a href="#"><i className="ion-logo-instagram"></i></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
  }
}

export default Footer;
