import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/pro-light-svg-icons/faHome';
import { faUsers } from '@fortawesome/pro-light-svg-icons/faUsers';
import { faBuildings } from '@fortawesome/pro-light-svg-icons/faBuildings';
import { faCog } from '@fortawesome/pro-light-svg-icons/faCog';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import css from './styles.module.scss';

const Menu: React.FC = () => {
  const router = useRouter();

  return (
    <div className={css.menu}>
      <div className={css.items}>
        <Link href="/admin">
          <a
            className={clsx({
              [css.item]: true,
              [css.active]: router.pathname === '/admin',
            })}>
            <div className={css.icon}>
              <FontAwesomeIcon icon={faHome} size="2x" />
            </div>
            <div className={css.label}>
              <FormattedMessage id="ui.dashboard" />
            </div>
          </a>
        </Link>
        <Link href="/admin/users">
          <a
            className={clsx({
              [css.item]: true,
              [css.active]: router.pathname.includes('/admin/users'),
            })}>
            <div className={css.icon}>
              <FontAwesomeIcon icon={faUsers} size="2x" />
            </div>
            <div className={css.label}>
              <FormattedMessage id="cms.users" />
            </div>
          </a>
        </Link>
        <Link href="/admin/companies">
          <a
            className={clsx({
              [css.item]: true,
              [css.active]: router.pathname.includes('/admin/companies'),
            })}>
            <div className={css.icon}>
              <FontAwesomeIcon icon={faBuildings} size="2x" />
            </div>
            <div className={css.label}>
              <FormattedMessage id="cms.companies" />
            </div>
          </a>
        </Link>
        <Link href="/admin/settings">
          <a
            className={clsx({
              [css.item]: true,
              [css.active]: router.pathname.includes('/admin/settings'),
            })}>
            <div className={css.icon}>
              <FontAwesomeIcon icon={faCog} size="2x" />
            </div>
            <div className={css.label}>
              <FormattedMessage id="settings.title" />
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
