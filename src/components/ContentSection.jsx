import React, { Component } from 'react';
import { Fade } from 'react-awesome-reveal';
import { FaStar, FaTwitter } from 'react-icons/fa';
import './vendors/css/grid.css';
import './Content.css';
import img1 from './img/photos.jpg';
import img2 from './img/video.jpg';
import img3 from './img/articles.jpg';
import img4 from './img/articles2.jpg';

class ContentSection extends Component {
  render() {
    return (
      <section className="section-content section-steps" id="content">
        <div className="row">
          <h2>Content Creation</h2>
        </div>

        <Fade right>
          <div className="row">
            <div className="col span-1-of-4 box">
              <img
                src={img4}
                height="165"
                alt="Articles depicting original, translated, and search engine-friendly content"
              />
              <h3>Articles</h3>
              <div className="city-feature">
                <FaStar className="icon-small" />
                Original Content
              </div>
              <div className="city-feature">
                <FaStar className="icon-small" />
                Translation
              </div>
              <div className="city-feature">
                <FaStar className="icon-small" />
                Search Engine friendly
              </div>
              <div className="city-feature">
                <FaTwitter className="icon-small" />
                <a href="#">@lamill_content</a>
              </div>
            </div>
            <div className="col span-1-of-4 box">
              <img
                src={img1}
                height="165"
                alt="Photography showcasing pictures, graphics, and exclusivity"
              />
              <h3>Photography</h3>
              <div className="city-feature">
                <FaStar className="icon-small" />
                Pictures
              </div>
              <div className="city-feature">
                <FaStar className="icon-small" />
                Graphics
              </div>
              <div className="city-feature">
                <FaStar className="icon-small" />
                Exclusive
              </div>
              <div className="city-feature">
                <FaTwitter className="icon-small" />
                <a href="#">@lamill_pics</a>
              </div>
            </div>
            <div className="col span-1-of-4 box">
              <img
                src={img2}
                height="165"
                alt="Videos focused on educational, review, and entertainment content"
              />
              <h3>Videos</h3>
              <div className="city-feature">
                <FaStar className="icon-small" />
                Educational Videos
              </div>
              <div className="city-feature">
                <FaStar className="icon-small" />
                Review Videos
              </div>
              <div className="city-feature">
                <FaStar className="icon-small" />
                Entertainment
              </div>
              <div className="city-feature">
                <FaTwitter className="icon-small" />
                <a href="#">@lamill_studio</a>
              </div>
            </div>
            <div className="col span-1-of-4 box">
              <img
                src={img3}
                height="165"
                alt="Design services offering web design, digital design, and infographics"
              />
              <h3>Design</h3>
              <div className="city-feature">
                <FaStar className="icon-small" />
                Web Design
              </div>
              <div className="city-feature">
                <FaStar className="icon-small" />
                Digital Design
              </div>
              <div className="city-feature">
                <FaStar className="icon-small" />
                Infographics
              </div>
              <div className="city-feature">
                <FaTwitter className="icon-small" />
                <a href="#">@lamill_design</a>
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default ContentSection;
