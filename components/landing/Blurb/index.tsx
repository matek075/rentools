import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import css from './styles.module.scss';

interface OwnProps {
  icon: IconProp;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  iconColor?: string;
  colorPalette?: 'steps' | 'benefits';
}

const Blurb: React.FC<OwnProps> = ({ icon, title, description, iconColor, colorPalette = '' }) => {
  const classes = {
    [css[colorPalette] || '']: !!colorPalette,
  };

  return (
    <div className={clsx(css.blurb, classes)}>
      <div className={css.iconCircle}>
        <FontAwesomeIcon icon={icon} className={css.icon} size="4x" style={{ color: iconColor || '#38687c' }} />
      </div>
      <div className={css.title}>{title}</div>
      <div className={css.description}>{description}</div>
    </div>
  );
};

export default Blurb;
