import React from 'react';

const Empty: React.FC = (props) => {
  return <div style={{ height: '100%' }}>{props.children}</div>;
};

export default Empty;
