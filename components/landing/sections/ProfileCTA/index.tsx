import React from 'react';
import Link from 'next/link';

import Container from 'components/ui/Container';
import Button from 'components/ui/Button';

import css from './styles.module.scss';

const ProfileCTA: React.FC = () => {
  return (
    <div className={css.section}>
      <div className={css.overlay}>
        <img src="/company-profile/background-items.svg" alt="narzedzia ikony" />
      </div>
      <Container>
        <h4>Załóż włąsną wizytówkę w Rentools</h4>
        <p>
          Zakłądając wizytówkę, otwierasz się na nowych klientów, umożliwiasz zbieranie opinii o Twojej firmie, a także
          możesz reklamować swój sprzęt
        </p>
        <Link href="/auth/signup?type=partner">
          <Button color="tertiary" as="a" size="md" className="mt-5">
            Załóż wizytówkę
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default ProfileCTA;
