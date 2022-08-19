import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/pro-light-svg-icons/faHome';
import { faStar } from '@fortawesome/pro-light-svg-icons/faStar';
import { faComment } from '@fortawesome/pro-light-svg-icons/faComment';
import { faCog } from '@fortawesome/pro-light-svg-icons/faCog';

import css from 'components/navigation/Menu/styles.module.scss';

const UserMenu: React.FC = () => {
  return (
    <>
      <Link href="/user/dashboard">
        <a className={css.item}>
          <div className={css.icon}>
            <FontAwesomeIcon icon={faHome} size="2x" />
          </div>
          <div className={css.label}>Home</div>
        </a>
      </Link>
      <Link href="/user/starred">
        <a className={css.item}>
          <div className={css.icon}>
            <FontAwesomeIcon icon={faStar} size="2x" />
          </div>
          <div className={css.label}>Ulubione</div>
        </a>
      </Link>
      <Link href="/user/enquiries">
        <a className={css.item}>
          <div className={css.icon}>
            <FontAwesomeIcon icon={faComment} size="2x" />
          </div>
          <div className={css.label}>Zapytania</div>
        </a>
      </Link>
      <Link href="/user/settings">
        <a className={css.item}>
          <div className={css.icon}>
            <FontAwesomeIcon icon={faCog} size="2x" />
          </div>
          <div className={css.label}>Konto</div>
        </a>
      </Link>
    </>
  );
};

export default UserMenu;
