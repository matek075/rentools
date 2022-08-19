import React from 'react';
import clsx from 'clsx';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons/faChevronRight';
import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons/faChevronLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import css from '../../styles.module.scss';

interface ArrowProps extends  OwnProps {
  type: 'next' | 'prev';
  onClick: () => void;
}

interface PageProps extends OwnProps {
  type: 'page';
  page: number;
  onClick: (page: number) => void;
}

interface OwnProps {
  currentPage: number;
  disabled?: boolean;
}

const PaginationButton: React.FC<PageProps | ArrowProps> = (props) => {

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (props.type === 'page') {
      props.onClick(props.page);
    } else {
      props.onClick();
    }
  }

  return (
      <div role="button" tabIndex={-1} onClick={handleClick} className={clsx(css.button, { [css.active]: props.type === 'page' && props.page === props.currentPage, [css.disabled]: props.disabled })}>
        {
          props.type === 'page' && (
            props.page
          )
        }
        {
          props.type  !== 'page' &&
            <FontAwesomeIcon icon={props.type === 'next' ? faChevronRight : faChevronLeft} />
        }
      </div>
  )
}

export default PaginationButton;
