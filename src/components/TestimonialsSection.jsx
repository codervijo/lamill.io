// TestimonialsSection.jsx
import React from 'react';
import './Testimonials.css';

const Testimonial = ({ imageSrc, altText, quote, name, role }) => {
  return (
    <div className="col span-1-of-3">
      <blockquote>
        {quote}
        <cite>
          <img src={imageSrc} alt={altText} />
          {name}, {role}
        </cite>
      </blockquote>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="section-testimonials">
      <div className="row">
        <h2>Our Future customers love us</h2>
      </div>
      <div className="row">
        <Testimonial 
          imageSrc={import("./img/customer-1.jpg")} 
          altText="Alberto Duncan, Fake person" 
          quote="LaMill is just awesome! I just launched a startup which leaves me with no time for do most of OS/Linux related tasks, so LaMill is a life-saver." 
          name="Alberto Duncan" 
          role="Fake person" 
        />
        <Testimonial 
          imageSrc={import("./img/customer-2.jpg")} 
          altText="Joana Silva, Fake person" 
          quote="LaMill made the whole process simple. My site is fast now and easy to work with. Professional execution by LaMill saved my project time and money." 
          name="Joana Silva" 
          role="Fake person" 
        />
        <Testimonial 
          imageSrc={import("./img/customer-3.jpg")} 
          altText="Milton Chapman, Fake person" 
          quote="I was looking for quick and easy delivery of my project. I tried a lot of them and ended up with LaMill. Best service. Keep up the great work!" 
          name="Milton Chapman" 
          role="Fake person" 
        />
      </div>
    </section>
  );
};

export default TestimonialsSection;
