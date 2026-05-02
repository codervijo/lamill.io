import React, { Component } from 'react';
import ServicesSection  from './ServicesSection.jsx';
import PicturesSection  from './PicturesSection.jsx';
import ContentSection   from './ContentSection.jsx';
import SoftwareSection  from './SoftwareSection.jsx';
import TestimonialsSection from './TestimonialsSection.jsx';
import FormSection from './FormSection.jsx';

class SectionList extends Component {
  render() {
    return (
      <div >
        <ServicesSection />
        <PicturesSection />
        <ContentSection />
        <SoftwareSection />
        <TestimonialsSection />
        <FormSection />
      </div>
    );
  }
}

export default SectionList;
