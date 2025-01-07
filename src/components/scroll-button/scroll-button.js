import React from 'react';
import { ArrowDown } from '@carbon/icons-react';
// import './ScrollButton.css'; // Import the CSS file

const ScrollButton = ({ scrollToCategories }) => {
  return (
    <div className="scroll-button-container">
      <div className="scroll-button" onClick={scrollToCategories}>
        <ArrowDown className="scroll-button-icon" />
      </div>
      <span className="scroll-button-tooltip">Scroll to Games</span>
    </div>
  );
};

export default ScrollButton;