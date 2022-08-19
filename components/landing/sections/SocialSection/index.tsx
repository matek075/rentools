import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons/faInstagramSquare';
import { faEnvelope as faEnvelopeSolid } from '@fortawesome/pro-solid-svg-icons/faEnvelope';

import Container from 'components/ui/Container';

import css from './styles.module.scss';

const SocialSection: React.FC = () => {
  return (
    <div className={css.section}>
      <div className="text-center">
        <h2>Znajdź nas</h2>
      </div>
      <Container>
        <div className={css.socialItems}>
          <a className={css.socialItem} href="https://www.facebook.com/rentoolspl/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faFacebookSquare} size="2x" className={css.icon} />
            <div className={css.name}>rentoolspl</div>
          </a>
          <a className={css.socialItem} href="https://instagram.com/rentoolspl/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faInstagramSquare} size="2x" className={css.icon} />
            <div className={css.name}>rentoolspl</div>
          </a>
          <a className={css.socialItem} href="mailto:team@rentools.pl">
            <FontAwesomeIcon icon={faEnvelopeSolid} size="2x" className={css.icon} />
            <div className={css.name}>team@rentools.pl</div>
          </a>
        </div>
      </Container>
    </div>
  );
};

export default SocialSection;
