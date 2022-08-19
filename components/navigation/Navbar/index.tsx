import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons/faChevronDown';

import Dropdown from 'components/navigation/dropdown/Dropdown';
import DropdownItem from 'components/navigation/dropdown/DropdownItem';
import DropdownToggle from 'components/navigation/dropdown/DropdownToggle';
import DropdownMenu from 'components/navigation/dropdown/DropdownMenu';
import Button from 'components/ui/Button';
import { userContext } from 'context/user';
import { companyContext } from 'context/company';
import { UserType } from 'context/user/types';

import css from './styles.module.scss';

const Navbar = () => {
  const user = React.useContext(userContext);
  const company = React.useContext(companyContext);

  const name = company.data?.name || user.data?.name;

  return (
    <div className={css.navbar}>
      <div className={css.leftSide}>
        <div
          className={clsx({
            [css.logo]: true,
            [css.hasBadge]: user.data?.type === UserType.Partner,
          })}>
          <Link href="/">
            <a>
              <img src="/identity/logo_black.svg" alt="logo" />
            </a>
          </Link>
          {user.data?.type === UserType.Partner && <div className={css.badge}>PARTNER</div>}
        </div>
      </div>
      <div className={css.rightSide}>
        <div className={css.menu}>
          {!user.authenticated ? (
            <>
              <Link href="/auth/signin">
                <a className={clsx({ [css.item]: true })}>
                  <FormattedMessage id="auth.signin.title" />
                </a>
              </Link>
              <Link href="/auth/signup">
                <Button as="a" href="/auth/signin" color="tertiary">
                  <FormattedMessage id="auth.signup.title" />
                </Button>
              </Link>
            </>
          ) : (
            <Dropdown orientation="bottom_left">
              <DropdownToggle className={`${css.item} ${css.bold}`}>
                <div>
                  {name}
                  <FontAwesomeIcon icon={faChevronDown} className={css.chevron} />
                </div>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/user/dashboard">Dashboard</DropdownItem>
                {company.data ? (
                  <DropdownItem href={'/user/products'}>
                    <FormattedMessage id="products.title" />
                  </DropdownItem>
                ) : null}
                {company.data ? (
                  <DropdownItem href={'/user/enquiries'}>
                    <FormattedMessage id="enquiries.title" />
                  </DropdownItem>
                ) : null}
                <DropdownItem href="/user/settings">
                  <FormattedMessage id="settings.title" />
                </DropdownItem>
                {company.data ? (
                  <DropdownItem href={`/wypozyczalnia/${company.data?.slug}`}>
                    <FormattedMessage id="profile.page" />
                  </DropdownItem>
                ) : null}
                {user.authenticated && (
                  <DropdownItem as="a" href="/auth/signout" onClick={user.signOut} color="tertiary">
                    <FormattedMessage id="auth.signout.title" />
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
