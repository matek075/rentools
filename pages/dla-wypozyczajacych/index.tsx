import React from 'react';
import { GetStaticProps } from 'next';
import clsx from 'clsx';
// import Image from 'next/image';
import { faComputerMouseScrollwheel } from '@fortawesome/pro-duotone-svg-icons/faComputerMouseScrollwheel';
import { faSortAmountDownAlt } from '@fortawesome/pro-duotone-svg-icons/faSortAmountDownAlt';
import { faScrewdriverWrench } from '@fortawesome/pro-duotone-svg-icons/faScrewdriverWrench';
import { faCartShopping } from '@fortawesome/pro-duotone-svg-icons/faCartShopping';
import { faBells } from '@fortawesome/pro-regular-svg-icons/faBells';
import { faCheck } from '@fortawesome/pro-regular-svg-icons/faCheck';
import { faLoveseat } from '@fortawesome/pro-regular-svg-icons/faLoveseat';
import { faClock } from '@fortawesome/pro-regular-svg-icons/faClock';
import { faUserHelmetSafety } from '@fortawesome/pro-regular-svg-icons/faUserHelmetSafety';
import { faPhone } from '@fortawesome/pro-duotone-svg-icons/faPhone';
import { NextSeo } from 'next-seo';

import Landing from 'components/layouts/Landing';
import Container from 'components/ui/Container';
import Button from 'components/ui/Button';
import Blurb from 'components/landing/Blurb';
import Text from 'components/ui/Text';
import Settings from 'settings';

import css from './styles.module.scss';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const DlaWypozyczajacych: React.FC = () => {
  const title =
    'Planujesz prace budowlane i poszukujesz wypożyczalni sprzętu, która dostarczy Ci wysokiej jakości urządzenia, maszyny czy narzędzia?';
  const description =
    'Dowiedz się, w jaki sposób Rentools pomoże w rozwoju twojej wypożyczalni sprzętu i maszyn budowlanych';
  return (
    <Landing>
      <NextSeo
        title={title}
        description={description}
        canonical={`${Settings.BASE_URL}dla-wypozyczajacych`}
        openGraph={{
          url: `${Settings.BASE_URL}dla-wypozyczajacych`,
          title,
          description,
          locale: 'pl',
          images: [
            {
              url: 'https://rentools-files.s3.eu-central-1.amazonaws.com/files/opengraph.jpg',
              alt: 'default rentools',
            },
          ],
        }}
      />
      <div className={css.banner}>
        <div className={css.overlay} />
        <img src="/svg/light-block.svg" alt="tło" className={css.highlightBlock} />
        <Container>
          <div className={css.content}>
            <h1 className={css.title}>
              Planujesz prace budowlane i poszukujesz
              <br />
              <Text as="span" size="normal" type="focused">
                wypożyczalni sprzętu,
              </Text>{' '}
              która dostarczy Ci wysokiej <br />
              jakości urządzenia, maszyny czy{' '}
              <Text as="span" type="focused" size="normal">
                narzędzia
              </Text>
              ?
            </h1>

            <div className={css.actions}>
              <Button color="primary" size="md" as="a" href="/auth/signup">
                Załóż konto
              </Button>
              <Button
                color="link-white"
                size="md"
                onClick={() => {
                  // @ts-ignore
                  document.getElementById('scroll-target').scrollIntoView({
                    behavior: 'smooth',
                  });
                }}>
                Dowiedz się więcej
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <div className={css.darkWrapper}>
        <Container paddingBottom={80} paddingTop={50} width={930}>
          <div className="text-center mb-14">
            <h2>Jesteś we właściwym miejscu</h2>
          </div>
          <div className={css.splitSection}>
            <div className={css.left}>
              <p>
                Zapraszamy do skorzystania z naszych zasobów zarówno osoby indywidualne, jak i firmy, które chcą znaleźć
                profesjonalną wypożyczalnię w swojej okolicy.
              </p>
              <p className="mt-5">
                Dowiedz się, jak działa wyszukiwarka i użyj jej, żeby szybko, łatwo i wygodnie zaopatrzyć się w
                potrzebny Ci sprzęt!
              </p>
            </div>
            <div className={css.right}>
              <img src="/landings/dla-wypozyczajacych/img1.jpg" alt="Tools" />
            </div>
          </div>
        </Container>
      </div>
      <div className={css.lightWrapper}>
        <Container paddingBottom={80} paddingTop={58}>
          <div className="text-center mb-14">
            <h2>Jak to działa?</h2>
          </div>
          <div className={clsx(css.splitSection, 'mb-14')}>
            <div className={css.left}>
              <img src="/landings/dla-wypozyczajacych/img2.jpg" alt="Tools" />
            </div>
            <div className={css.right}>
              <div className="mb-5">
                <h4>To proste!</h4>
              </div>
              <p>
                Wystarczy kilka kroków do uzyskania dostępu do bogatej bazy maszyn, urządzeń i narzędzi budowlanych
                oferowanych przez wypożyczalnie z całej Polski, również w Twojej okolicy
              </p>
              <p className="mt-5">
                Pierwszym etapem jest założenie konta, po czym możesz zacząć wyszukiwanie określonego sprzętu –
                wystarczy wpisać jego nazwę w pasku wyszukiwania lub znaleźć w drzewie kategorii. W ramach wyników
                uzyskujesz informację o wypożyczalniach oferujących dany sprzęt, dzięki czemu możesz od razu się z nimi
                skontaktować i ustalić warunki współpracy.
              </p>
            </div>
          </div>
          <div className={css.splitSection}>
            <div className={css.left_reverse}>
              <div className="mb-5">
                <h4>Porównuj do woli</h4>
              </div>
              <p>
                Zapraszamy do skorzystania z naszych zasobów zarówno osoby indywidualne, jak i firmy, które chcą znaleźć
                profesjonalną wypożyczalnię w swojej okolicy.
              </p>
              <p className="mt-5 mb-5">
                Dowiedz się, jak działa wyszukiwarka i użyj jej, żeby szybko, łatwo i wygodnie zaopatrzyć się w
                potrzebny Ci sprzęt!
              </p>
            </div>
            <div className={css.right_reverse}>
              <img src="/landings/dla-wypozyczajacych/img3.jpg" alt="Tools" />
            </div>
          </div>
          <div className="text-center mt-10">
            <Button color="primary" size="md" as="a" href="/auth/signup">
              Załóż konto
            </Button>
          </div>
        </Container>
      </div>
      <div className={css.darkWrapper} id="scroll-target">
        <Container paddingBottom={80} paddingTop={32} className="steps">
          <div className="text-center mb-0">
            <h2>Czego chcieć więcej?</h2>
          </div>
          <h6 className="text-center mb-10">
            To proste, szybkie i łatwe - wystarczą cztery kroki do zamówienia sprzętu:
          </h6>
          <div className={css.blurbs}>
            <Blurb
              icon={faComputerMouseScrollwheel}
              title="Załóż konto"
              colorPalette="steps"
              iconColor="#20ace9"
              description="Załóż konto i aktywuj je, odbierając wiadomość e-mail i klikając w znajdujący się w treści link."
            />
            <Blurb
              icon={faScrewdriverWrench}
              title="Wyszukaj sprzęt"
              colorPalette="steps"
              iconColor="#20ace9"
              description="Wyszukuj sprzęt, wpisując jego nazwę lub znajdując w drzewie kategorii."
            />
            <Blurb
              icon={faSortAmountDownAlt}
              title="Filtruj wyniki"
              colorPalette="steps"
              iconColor="#20ace9"
              description="Skorzystaj z filtrów, żeby zawęzić wyniki zgodnie z indywidualnymi wymaganiami, jak np. transport czy lokalizacja."
            />
            <Blurb
              icon={faCartShopping}
              title="Wybierz ofertę"
              colorPalette="steps"
              iconColor="#20ace9"
              description="Wybierz najlepszą ofertę i zamów interesujący Cię sprzęt."
            />
          </div>
          <div className="text-center mt-3">
            <Button color="primary" size="md" as="a" href="/auth/signup">
              Załóż konto
            </Button>
          </div>
        </Container>
      </div>
      <div className={css.lightWrapper}>
        <Container paddingBottom={120} paddingTop={45}>
          <div className="text-center mb-0">
            <h2 id="scroll-target">Dlaczego warto?</h2>
          </div>
          <h6 className="text-center mb-14">
            Oto najważniejsze korzyści wynikające z wynajmu sprzętu budowlanego za pośrednictwem naszej wypożyczalni.
          </h6>
          <div className={css.blurbsBottom}>
            <Blurb
              icon={faCheck}
              title="Wiarygodność i rzetelność ofert"
              colorPalette="benefits"
              iconColor="#3DFB50"
              description="Współpracujemy wyłącznie z profesjonalnymi, zweryfikowanymi wypożyczalniami, które cieszą się dobrymi opiniami i mogą zapewnić rzetelność świadczonych usług. Dzięki temu masz gwarancję, że wybierasz wiarygodną ofertę, a informacje podawane na jej temat znajdują odzwierciedlenie w rzeczywistości."
            />
            <Blurb
              icon={faLoveseat}
              title="Wygoda"
              colorPalette="benefits"
              iconColor="#5FC39F"
              description="Wiele ofert w jednym miejscu, dostępność wszystkich najważniejszych informacji, prostota obsługi – wszystko to sprawia, że nasza wyszukiwania wypożyczalni sprzętu budowlanego jest niezwykle komfortowa w użytkowaniu. Intuicyjność nawigacji i łatwa dostępność wszystkich informacji umożliwiają sprawne korzystanie z niej każdemu."
            />
            <Blurb
              icon={faClock}
              title="Oszczędność czasu"
              colorPalette="benefits"
              iconColor="#FF44F8"
              description="Zamiast marnować cenne godziny na sprawdzanie kolejnych ofert jedna po drugiej w kilka chwil znajdujesz wszystkie te, które spełniają Twoje wymagania i możesz je sprawnie porównać ze sobą w jednym miejscu. W ten sposób oszczędzasz czas i możesz go przeznaczyć na inne, produktywniejsze czynności"
            />
            <Blurb
              icon={faUserHelmetSafety}
              title="Dostępność sprzętu z operatorem"
              colorPalette="benefits"
              iconColor="#FCE466"
              description="Zdajemy sobie sprawę, że możesz nie dysponować uprawnieniami lub umiejętnościami pozwalającymi na obsługę wynajętych maszyn, urządzeń czy narzędzi budowlanych, dlatego umożliwiamy wyszukiwanie ofert z operatorem. Na jednej stronie możesz porównać propozycje różnych firm, które spełniają Twoje wymagania. "
            />
            <Blurb
              icon={faPhone}
              title="Merytoryczne wsparcie"
              colorPalette="benefits"
              iconColor="#64F6FF"
              description="Zastanawiasz, jaki model danego urządzenia wybrać? Nie wiesz, jak obsługiwać wybrany sprzęt i do jakich dokładnie prac się nadaje? Jeśli potrzebujesz merytorycznego wsparcia, nasz zespół zapewni Ci je. Skontaktuj się z nami i daj znać, jak możemy Ci pomóc w doborze i wypożyczeniu sprzętu!"
            />
            <Blurb
              icon={faBells}
              title="Przypomnienia"
              colorPalette="benefits"
              iconColor="#DC3434"
              description="W panelu klienta dostępna jest możliwość ustawienia przypomnień w związku ze zbliżającym się wygaśnięciem umowy wypożyczenia sprzętu budowlanego. Korzystając z niej, masz pewność, że nie przegapisz terminu i oddasz wyposażenie na czas lub przedłużysz okres wynajmu w razie potrzeby."
            />
          </div>
        </Container>
      </div>
      <div className={css.primaryWrapper}>
        <Container paddingBottom={55} paddingTop={65} width={730}>
          <div className="text-center">
            <h2 id="scroll-target">Przekonaj się sam</h2>
            <h6 className="mb-5">
              Już teraz szybko, łatwo i wygodnie załóż konto w naszym serwisie i w kilka chwil znajdź wypożyczalnię
              poszukiwanego sprzętu budowlanego w Twojej okolicy!
            </h6>
            <div className="text-center mt-10">
              <Button color="primary" size="md" as="a" href="/auth/signup">
                Załóż konto
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </Landing>
  );
};

export default DlaWypozyczajacych;
