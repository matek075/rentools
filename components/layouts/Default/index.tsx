import React from 'react';

import Navbar from 'components/navigation/Navbar';
import Footer from 'components/navigation/Footer';

const Default: React.FC = (props) => {
  return (
    <div>
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
};

export default Default;
