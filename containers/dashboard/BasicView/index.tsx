import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/pro-regular-svg-icons';
import clsx from 'clsx';

import Button from 'components/ui/Button';
import Container from 'components/ui/Container';

import css from './styles.module.scss';

interface OwnProps {
  center?: boolean;
  overlay?: boolean;
}

const BasicView: React.FC<OwnProps> = ({ center, overlay }) => {
  return (
    <>
      <div
        className={clsx(css.content, {
          [css.center]: !!center,
          [css.overlay]: !!overlay,
        })}>
        <div className={css.window}>
          <Container paddingBottom={22} paddingTop={25} width={440}>
            <div className="text-center">
              Twój obecny plan:<span className={css.basicIcon}>BASIC</span>
            </div>
            <h5 className={clsx(css.title, 'text-center')}>Odblokuj resztę funkcji</h5>
            <div className={css.listItem}>
              <FontAwesomeIcon icon={faCheckCircle} className={css.icon} />
              <p className={css.text}>dodawaj ogłoszenia ze swoimi produktami</p>
            </div>
            <div className={css.listItem}>
              <FontAwesomeIcon icon={faCheckCircle} className={css.icon} />
              <p className={css.text}>zbieraj zgłoszenia od klientów</p>
            </div>
            <div className={css.listItem}>
              <FontAwesomeIcon icon={faCheckCircle} className={css.icon} />
              <p className={css.text}>zarządzaj stanem magazynowym swoich produktów</p>
            </div>
            <div className={css.listItem}>
              <FontAwesomeIcon icon={faCheckCircle} className={css.icon} />
              <p className={css.text}>zarządzaj rezerwacjami w swojej wypożyczalni</p>
            </div>
            <div className="text-center">
              <Button as="a" size="lg" color="primary" href="mailto:team@rentools.pl" className={css.button}>
                Zostań naszym partnerem
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default BasicView;
