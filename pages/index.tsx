import React from 'react';
import Head from 'next/head';
import { faEnvelope } from '@fortawesome/pro-regular-svg-icons/faEnvelope';
import { faSearch } from '@fortawesome/pro-regular-svg-icons/faSearch';
import { faToolbox } from '@fortawesome/pro-regular-svg-icons/faToolbox';
import { faWrench } from '@fortawesome/pro-solid-svg-icons/faWrench';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons/faCheckCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import { GetStaticProps } from 'next';

import LaunchSubscribe from 'components/form/forms/LaunchSubscribe';
import Button from 'components/ui/Button';
import Container from 'components/ui/Container';
import { getPosts } from 'utils/blog/posts';
import { Post } from 'types';
import BlogPosts from 'components/landing/sections/BlogPosts';

import Layout from '../components/layouts/Landing';

import css from './styles.module.scss';

interface OwnProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<OwnProps> = async () => {
  const posts = await getPosts(3);

  return {
    props: {
      posts,
    },
  };
};

const IndexPage: React.FC<OwnProps> = ({ posts }) => {
  const title = 'rentools.pl - Wszystkie wypożyczalnie w jednym miejscu';
  const description =
    'Rentools to wyszukiwarka narzędzi do wypożyczenia. Oszczędź czas i pieniądze, i zacznij wypożyczać sprzęt.';

  return (
    <Layout>
      <Head>
        <link rel="preload" href="/home/banner.webp" />
      </Head>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          images: [
            {
              url: 'https://rentools-files.s3.eu-central-1.amazonaws.com/files/opengraph.jpg',
              alt: 'Rentools logo',
            },
          ],
        }}
      />
      <div className={css.banner}>
        <h1>
          <span className={css.lineFirst}>Wszystkie wypożyczalnie narzędzi</span>
          <span className={css.lineSecond}>w jednym miejscu</span>
        </h1>
        <div className={css.caption}>Chcesz być pierwszy, który dowie się o starcie usługi?</div>
        <div className={css.subscribeForm}>
          <LaunchSubscribe />
        </div>
      </div>
      <div className={css.section}>
        <h2 id="how-it-works">Jak to działa?</h2>
        <p>Rentools to prosta wyszukiwarka narzędzi, zrzeszająca wiele wypożyczalni w całej Polsce</p>

        <div className={css.steps}>
          <div className={css.step}>
            <div className={css.icon}>
              <FontAwesomeIcon icon={faSearch} size="5x" transform="flip-h" />
              <FontAwesomeIcon icon={faWrench} className={css.secondaryIcon1} size="2x" transform="flip-h" />
            </div>
            <div className={css.bottom}>
              <div className={css.index}>1</div>
              <div className={css.titles}>
                <div className={css.titleFirst}>Wyszukaj</div>
                <div className={css.titleSecond}>narzędzia</div>
              </div>
            </div>
          </div>
          <div className={css.step}>
            <div className={css.icon}>
              <FontAwesomeIcon icon={faEnvelope} size="5x" />
              <FontAwesomeIcon icon={faCheckCircle} className={css.secondaryIcon2} size="2x" />
            </div>
            <div className={css.bottom}>
              <div className={css.index}>2</div>
              <div className={css.titles}>
                <div className={css.titleFirst}>Zarezerwuj</div>
                <div className={css.titleSecond}>termin</div>
              </div>
            </div>
          </div>
          <div className={css.step}>
            <div className={css.icon}>
              <FontAwesomeIcon icon={faToolbox} size="5x" />
              <FontAwesomeIcon icon={faWrench} className={css.secondaryIcon3} size="3x" />
            </div>
            <div className={css.bottom}>
              <div className={css.index}>3</div>
              <div className={css.titles}>
                <div className={css.titleFirst}>Odbierz</div>
                <div className={css.titleSecond}>i ciesz się sprzętem</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={css.subscribeCaption}>Podaj swój adres email, by być powiadomionym o starcie usługi</div>
          <div className={css.subscribeForm}>
            <LaunchSubscribe />
          </div>
        </div>
      </div>
      <div className={css.doubleSection}>
        <div className={css.sectionLeft}>
          <div className={css.titleFirst}>Świetny dla</div>
          <div className={css.titleSecond}>wypożyczających</div>
          <div className={css.dotBlack} />
          <p>
            Rentools to Twoje jedyne miejsce, gdzie bezproblemowo znajdziesz sprzęt budowlany do wypożyczenia. Załóż
            konto, i natychmiastowo kontaktuj się z wybranymi wypożyczalniami
          </p>
        </div>
        <div className={css.sectionRight}>
          <div className={css.titleFirst}>Idealny dla</div>
          <div className={css.titleSecond}>wypożyczalni</div>
          <div className={css.dot} />
          <p>
            Dzięki Rentools, Twój biznes dotrze do tysięcy osób poszukujących narzędzi budowlanych oraz pozwoli na
            zwiększenie obrotów i widoczności w sieci.
          </p>
          <p className="mb-4">Rentools to również świetna platforma do gromadzenia opinii od Twoich klientów</p>
          <Button as="a" href="/dla-wypozyczalni" size="md">
            Dowiedz się więcej
          </Button>
        </div>
      </div>
      <div className={clsx({ [css.section]: true, [css.white]: true })}>
        <Container>
          <div className={css.crmLogo}>
            <img src="/identity/logo_black.svg" className={css.logo} alt="Rentools logo" />
            <div className={css.crm}>CRM</div>
          </div>
          <div className={css.subscribeCaption}>
            Rentools CRM to intuicyjny i prosty w użyciu system obsługi wypożyczalni, który automatycznie synchronizuje
            się z wyszukiwarką Rentools.
          </div>
          <div className={css.featureList}>
            <div className={css.featureItem}>
              <FontAwesomeIcon icon={faCheckCircle} className={css.bullet} size="lg" />
              <div className={css.text}>Zarządzaj magazynem</div>
            </div>
            <div className={css.featureItem}>
              <FontAwesomeIcon icon={faCheckCircle} className={css.bullet} size="lg" />
              <div className={css.text}>Obsługuj zamówienia i kontroluj dostępność sprzętu</div>
            </div>
            <div className={css.featureItem}>
              <FontAwesomeIcon icon={faCheckCircle} className={css.bullet} size="lg" />
              <div className={css.text}>Automatycznie wystawiaj i wysyłaj faktury dla klientów</div>
            </div>
            <div className={css.featureItem}>
              <FontAwesomeIcon icon={faCheckCircle} className={css.bullet} size="lg" />
              <div className={css.text}>Zbieraj zweryfikowane opinie o Twojej firmie</div>
            </div>
            <div className={css.featureItem}>
              <FontAwesomeIcon icon={faCheckCircle} className={css.bullet} size="lg" />
              <div className={css.text}>Automatycznie synchronizuj sprzęt z wyszukiwarką Rentools</div>
            </div>
          </div>
          <div className="mt-14">
            <div className={css.subscribeCaption}>Brzmi nieźle?</div>
            <Button as="a" href="/dla-wypozyczalni" style={{ marginTop: '-10px' }}>
              Dowiedz się więcej
            </Button>
          </div>
          <BlogPosts posts={posts} />
        </Container>
      </div>
    </Layout>
  );
};

export default IndexPage;
