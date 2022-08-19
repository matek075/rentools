import React from 'react';
import { faEnvelope } from '@fortawesome/pro-regular-svg-icons/faEnvelope';
import { faPhone } from '@fortawesome/pro-regular-svg-icons/faPhone';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons/faInstagramSquare';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';

import SmallFooter from 'components/navigation/SmallFooter';
import Container from 'components/ui/Container';
// import LaunchSubscribe from "components/form/forms/LaunchSubscribe";

import css from './styles.module.scss';

const Footer: React.FC = () => {
  return (
    <>
      <div className={css.footer}>
        <Container>
          <div className={css.columns}>
            <div className={css.column}>
              <img src="/identity/logo_white.svg" className={css.logo} alt="logo" />
              {/*<div className={css.iconedRow}>*/}
              {/*  <div className={css.icon}>*/}
              {/*    <FontAwesomeIcon icon={faLocation} />*/}
              {/*  </div>*/}
              {/*  <div className={css.content}>*/}
              {/*    <p>Rentools </p>*/}
              {/*    <p>ul. Jakastam 123</p>*/}
              {/*    <p>00-123 Gdziekolwiek, Polska</p>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div className={css.iconedRow}>
                <div className={css.icon}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className={css.content}>
                  <a href="mailto:team@rentools.pl">team@rentools.pl</a>
                </div>
              </div>
              <div className={css.iconedRow}>
                <div className={css.icon}>
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className={css.content}>
                  <a href="tel:+48 777-123-456">+48 500 581 393</a>
                </div>
              </div>
            </div>
            <div className={css.column}>
              <a href="/blog/" className={css.link}>
                Blog
              </a>
              <a href="mailto:team@rentools.pl" className={css.link}>
                Zostań naszym partnerem
              </a>
              <div className={css.text}>Dla kogo jest Rentools:</div>
              <a href="/dla-wypozyczalni" className={css.link}>
                Dla wypożyczalni sprzętu
              </a>
              <a href="/dla-wypozyczajacych" className={css.link}>
                Dla wypożyczających sprzęt
              </a>
            </div>
            <div className={css.column}>
              <a href="/search" className={css.link}>
                <FormattedMessage id="search.cta" />
              </a>
              <a href="/auth/signup" className={css.link}>
                <FormattedMessage id="auth.signup.title" />
              </a>
              <a href="/auth/signin" className={css.link}>
                <FormattedMessage id="auth.signin.title" />
              </a>
            </div>
          </div>
          <div className={css.socials}>
            <a href="https://facebook.com/rentoolspl" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faFacebookSquare} className={css.social} size="lg" />
            </a>
            <a href="https://instagram.com/rentoolspl" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faInstagramSquare} className={css.social} size="lg" />
            </a>
            <a href="https://www.linkedin.com/company/rentoolspl" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className={css.social} size="lg" />
            </a>
          </div>
        </Container>
      </div>
      <SmallFooter />
    </>
  );
};

export default Footer;
