// components/Header.js
import React from 'react';
import ardaaImage from '../Ardaa.png'; // Import the image
import logoName from '../Ardaaname-04.png';

const Header = () => {
  return (
    <div className="app-header">
      {/* <h1>لاعب العرضة</h1> */}
      <Logo logoSrc={ardaaImage} logoName="logo-image" />
      <Logo logoSrc={logoName} logoName="logo-name" />
    </div>
  );
};

export default Header;


const Logo = ({ logoSrc, logoName }) => {
  return (
    <div className="logo">
      {/* Add your logo image or text here */}
      <img src={logoSrc} alt="Logo" className={logoName} />
    </div>
  );
};



