import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/pro-light-svg-icons/faHome';
import { faComment } from '@fortawesome/pro-light-svg-icons/faComment';
import { faCog } from '@fortawesome/pro-light-svg-icons/faCog';
import { faHammer } from '@fortawesome/pro-light-svg-icons/faHammer';
import { faBuildings } from '@fortawesome/pro-light-svg-icons/faBuildings';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import css from 'components/navigation/Menu/styles.module.scss';
import { companyContext } from 'context/company';

const PartnerMenu: React.FC = () => {
  const router = useRouter();
  const { data } = React.useContext(companyContext);

  return (
    <>
      <Link href="/user/dashboard" shallow>
        <a
          className={clsx({
            [css.item]: true,
            [css.active]: router.pathname === '/user/dashboard',
          })}>
          <div className={css.icon}>
            <FontAwesomeIcon icon={faHome} size="2x" />
          </div>
          <div className={css.label}>Home</div>
        </a>
      </Link>
      <Link href="/user/products" shallow>
        <a
          className={clsx({
            [css.item]: true,
            [css.active]: router.pathname.startsWith('/user/products'),
          })}>
          <div className={css.icon}>
            <FontAwesomeIcon icon={faHammer} size="2x" />
          </div>
          <div className={css.label}>
            <FormattedMessage id="products.title" />
          </div>
        </a>
      </Link>
      <Link href="/user/enquiries" shallow>
        <a
          className={clsx({
            [css.item]: true,
            [css.active]: router.pathname === '/user/enquiries',
          })}>
          <div className={css.icon}>
            <FontAwesomeIcon icon={faComment} size="2x" />
          </div>
          <div className={css.label}>
            <FormattedMessage id="enquiries.title" />
          </div>
        </a>
      </Link>
      {data && (
        <Link href="/user/company" shallow>
          <a
            className={clsx({
              [css.item]: true,
              [css.active]: router.pathname.startsWith('/user/company'),
            })}>
            <div className={css.icon}>
              <FontAwesomeIcon icon={faBuildings} size="2x" />
            </div>
            <div className={css.label}>
              <FormattedMessage id="ui.company" />
            </div>
          </a>
        </Link>
      )}
      <Link href="/user/settings" shallow>
        <a
          className={clsx({
            [css.item]: true,
            [css.active]: router.pathname.startsWith('/user/settings'),
          })}>
          <div className={css.icon}>
            <FontAwesomeIcon icon={faCog} size="2x" />
          </div>
          <div className={css.label}>
            <FormattedMessage id="account.title" />
          </div>
        </a>
      </Link>
    </>
  );
};

export default PartnerMenu;
