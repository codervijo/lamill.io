import React, { Component } from 'react';
import './Pictures.css';

// Import images
import lens2 from './img/lens2.jpg';
import windmill from './img/windmill.jpg';
import lens from './img/lens.jpg';
import bridge from './img/bridge.jpg';
import comp1 from './img/comp1.jpg';
import comp2 from './img/comp2.jpg';

class PicturesSection extends Component {
  render() {
    return (
      <section className="section-pictures">
        <ul className="pics-showcase clearfix">
          <li>
            <figure className="pics-photo">
              <img src={lens2} alt="Pictures" />
            </figure>
          </li>
          <li>
            <figure className="pics-photo">
              <img src={windmill} alt="Pictures" />
            </figure>
          </li>
          <li>
            <figure className="pics-photo">
              <img src={lens} alt="Pictures" />
            </figure>
          </li>
          <li>
            <figure className="pics-photo">
              <img src={bridge} alt="Pictures" />
            </figure>
          </li>
        </ul>
        <ul className="pics-showcase clearfix">
          <li>
            <figure className="pics-photo">
              <img src={comp1} alt="Pictures" />
            </figure>
          </li>
          <li>
            <figure className="pics-photo">
              <img src={comp2} alt="Pictures" />
            </figure>
          </li>
          <li>
            <figure className="pics-photo">
              <img src={comp2} alt="Pictures" />
            </figure>
          </li>
          <li>
            <figure className="pics-photo">
              <img src={comp1} alt="Pictures" />
            </figure>
          </li>
        </ul>
      </section>
    );
  }
}

export default PicturesSection;
