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

import css from './styles.module.scss';

const Navbar = () => {
  return (
    <div className={css.navbar}>
      <div className={css.leftSide}>
        <div
          className={clsx({
            [css.logo]: true,
            [css.hasBadge]: true,
          })}>
          <Link href="/">
            <a>
              <img src="/identity/logo_black.svg" alt="logo" />
            </a>
          </Link>
          <div className={css.badge}>ADMIN</div>
        </div>
      </div>
      <div className={css.rightSide}>
        <div className={css.menu}>
          <Dropdown orientation="bottom_left">
            <DropdownToggle className={`${css.item} ${css.bold}`}>
              <div>
                konrad
                <FontAwesomeIcon icon={faChevronDown} className={css.chevron} />
              </div>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="/admin/signout">
                <FormattedMessage id="auth.signout.title" />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
