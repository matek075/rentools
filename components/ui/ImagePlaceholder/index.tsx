import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer } from '@fortawesome/pro-duotone-svg-icons/faHammer';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

import css from './styles.module.scss';

interface OwnProps {
  size?: SizeProp;
}

const ImagePlaceholder: React.FC<OwnProps> = ({ size }) => {
  return (
    <div className={css.wrapper}>
      <FontAwesomeIcon icon={faHammer} className={css.icon} size={size || '3x'} />
    </div>
  );
};

export default ImagePlaceholder;
