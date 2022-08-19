import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Landing from 'components/layouts/Landing';
import Button from 'components/ui/Button';

import image from './image.png';
import css from './styles.module.scss';

const NotFound: React.FC = () => {

  return (
    <Landing>
      <div className={css.page}>
        <h1>404</h1>
        <div className={css.sub}>Strona nie istnieje</div>
        <Image src={image} />
        <div className={css.body}>Strona, której szukasz, nie istnieje bądź została usunięta.</div>
        <Link href="/">
          <Button as="a" color="tertiary" size="md">
            Przejdź do strony głównej
          </Button>
        </Link>
      </div>
    </Landing>
  )
}

export default NotFound;
