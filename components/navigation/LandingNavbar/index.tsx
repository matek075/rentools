import React from 'react';
import Link from 'next/link';
import { faBars } from '@fortawesome/pro-regular-svg-icons/faBars';
import { faTimes } from '@fortawesome/pro-regular-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import Button from 'components/ui/Button';
import { userContext } from 'context/user';

import css from './styles.module.scss';

const MenuItems: React.FC = () => {
  const user = React.useContext(userContext);

  return (
    <>
      <Link href="/dla-wypozyczalni">
        <a className={css.item}>Dla wypożyczalni</a>
      </Link>
      <Link href="/dla-wypozyczajacych">
        <a className={css.item}>Dla wypożyczających</a>
      </Link>
      <Link href="/blog">
        <a className={css.item}>Blog</a>
      </Link>
      {user.authenticated ? (
        <Link href="/user/dashboard">
          <Button as="a" color="tertiary" size="md" className={css.button}>
            Przejdź do panelu
          </Button>
        </Link>
      ) : (
        <>
          <Button as="a" href="/auth/signup" color="tertiary" size="md" className={css.button}>
            Załóż konto
          </Button>
        </>
      )}
    </>
  );
};

const LandingNavbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className={css.navbar}>
      <div className={css.leftSide}>
        <Link href="/">
          <a>
            <img alt="Logo" className={css.logo} src="/identity/logo_black.svg" />
          </a>
        </Link>
      </div>
      <div className={css.rightSide}>
        <a href="#" className={css.toggle} onClick={() => setMobileOpen(true)}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </a>
        <div className={clsx(css.mobileMenu, { [css.open]: mobileOpen })}>
          <a href="#" className={css.closeButton}>
            <FontAwesomeIcon icon={faTimes} size="2x" onClick={() => setMobileOpen(false)} />
          </a>
          <MenuItems />
        </div>
        <div className={css.menu}>
          <MenuItems />
        </div>
      </div>
    </div>
  );
};

export default LandingNavbar;
