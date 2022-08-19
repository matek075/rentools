import React from 'react';

import LandingNavbar from 'components/navigation/LandingNavbar';
import Footer from 'components/navigation/Footer';
import SocialSection from 'components/landing/sections/SocialSection';

const Landing: React.FC = (props) => {
  return (
    <div>
      <LandingNavbar />
      {props.children}
      <SocialSection />
      <Footer />
    </div>
  );
};

export default Landing;
