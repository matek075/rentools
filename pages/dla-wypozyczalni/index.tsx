import React from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { faComputerMouseScrollwheel } from '@fortawesome/pro-duotone-svg-icons/faComputerMouseScrollwheel';
import { faAddressCard } from '@fortawesome/pro-duotone-svg-icons/faAddressCard';
import { faScrewdriverWrench } from '@fortawesome/pro-duotone-svg-icons/faScrewdriverWrench';
import { faBellExclamation } from '@fortawesome/pro-duotone-svg-icons/faBellExclamation';
import { faLightbulb } from '@fortawesome/pro-regular-svg-icons/faLightbulb';
import { faSearch } from '@fortawesome/pro-regular-svg-icons/faSearch';
import { faRobot } from '@fortawesome/pro-regular-svg-icons/faRobot';
import { faStar } from '@fortawesome/pro-regular-svg-icons/faStar';
import { faBrowser } from '@fortawesome/pro-regular-svg-icons/faBrowser';
import { faListCheck } from '@fortawesome/pro-duotone-svg-icons/faListCheck';
import { faWarehouseFull } from '@fortawesome/pro-duotone-svg-icons/faWarehouseFull';
import { faWandMagicSparkles } from '@fortawesome/pro-duotone-svg-icons/faWandMagicSparkles';
import { faDollar } from '@fortawesome/pro-duotone-svg-icons/faDollar';
import { faPhone } from '@fortawesome/pro-duotone-svg-icons/faPhone';
import { faMobile } from '@fortawesome/pro-duotone-svg-icons/faMobile';
import { faEnvelope } from '@fortawesome/pro-regular-svg-icons/faEnvelope';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';

import Settings from 'settings';
import Landing from 'components/layouts/Landing';
import Container from 'components/ui/Container';
import Button from 'components/ui/Button';
import Blurb from 'components/landing/Blurb';

import css from './styles.module.scss';
import excavator from './exc.png';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const DlaWypozyczalni: React.FC = () => {
  const title = 'Przenieś swoją wypożyczalnią na wyższy poziom | rentools.pl';
  const description =
    'Dowiedz się, w jaki sposób Rentools pomoże w rozwoju twojej wypożyczalni sprzętu i maszyn budowlanych';
  return (
    <Landing>
      <NextSeo
        title={title}
        canonical={`${Settings.BASE_URL}dla-wypozyczalni`}
        description={description}
        openGraph={{
          url: `${Settings.BASE_URL}dla-wypozyczalni`,
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
        <Container>
          <div className={css.content}>
            <div className={css.left}>
              <img src="/svg/block.svg" width={800} height={20} alt="koparka" className={css.highlightBlock} />
              <h1 className={css.title}>
                Przenieś swoją wypożyczalnię <span className={css.highlight}>na wyższy poziom</span>
              </h1>
              <p className={css.sub}>
                Dołącz do nas i wykorzystaj szansę na dotarcie do tysięcy osób z okolicy, które są zainteresowane Twoją
                ofertą!
              </p>
            </div>

            <div className={css.image}>
              <Image src={excavator} />
            </div>

            <div className={css.actions}>
              <Button color="tertiary" size="md" as="a" href="/auth/signup?type=partner">
                Załóż konto
              </Button>
              <Button
                color="link"
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
        <Container paddingBottom={80} paddingTop={60}>
          <h2 id="scroll-target" className="text-center mb-0">
            Jak zacząć?
          </h2>
          <p className={clsx(css.light, 'text-center', 'mb-10')}>Nic prostszego.</p>
          <div className={css.blurbs}>
            <Blurb
              icon={faComputerMouseScrollwheel}
              title="1. Załóż konto"
              description="Wypełnij wszystkie pola, aby zarejestrować się w serwisie. Na wskazany e-mail wyślemy link aktywacyjny. Po kliknięciu Aktywuj konto Twój profil jest gotowy. Zajmie Ci to 1 minutę. "
            />
            <Blurb
              icon={faAddressCard}
              title="2. Uzupełnij profil"
              description="Podaj podstawowe dane o wypożyczalni: adres, telefon, adres e-mail, godziny otwarcia oraz krótki opis"
            />
            <Blurb
              icon={faScrewdriverWrench}
              title="3. Dodaj produkty"
              description="Cena, wysokość kaucji czy usługi dodatkowe, takie jak transport lub wynajem z operatorem"
            />
            <Blurb
              icon={faBellExclamation}
              title="4. Zbieraj zapytania"
              description="Odbieraj zapytania od klientów z okolicy, którzy są zainteresowani Twoją ofertą i rozwijaj swoją wypożyczalnię!"
            />
          </div>
          <div className="text-center mt-3">
            <Button color="primary" size="md" as="a" href="/auth/signup?type=partner">
              Załóż konto
            </Button>
          </div>
        </Container>
      </div>
      <div className={css.darkLightWrapper}>
        <Container paddingBottom={50} paddingTop={50} width={900}>
          <h2 className="text-center">Z korzyścią dla Twojej wypożyczalni.</h2>
          <p className="text-center mb-10 text-white">Rentools oferuje wiele korzyści:</p>
          <div className={css.listItem}>
            <FontAwesomeIcon icon={faSearch} className={css.icon} />
            <p className={css.text}>Poszerzenie bazy klientów i wejście na nowe rynki</p>
          </div>
          <div className={css.listItem}>
            <FontAwesomeIcon icon={faRobot} className={css.icon} />
            <p className={css.text}>
              Możliwość zautomatyzowania procesu wypożyczania sprzętu, tak, aby odbywał się bez ludzkiej obsługi
            </p>
          </div>
          <div className={css.listItem}>
            <FontAwesomeIcon icon={faStar} className={css.icon} />
            <p className={css.text}>
              Budowa wizerunku - dzięki pozytywnym opinion kreujesz profesjonalny wizerunek swojej wypożyczalni
            </p>
          </div>
          <div className={css.listItem}>
            <FontAwesomeIcon icon={faBrowser} className={css.icon} />
            <p className={css.text}>Jeżeli Twoja wypożyczalnia nie posiada strony WWW, możesz ją założyć u nas!</p>
          </div>
          <div className={css.listItem}>
            <FontAwesomeIcon icon={faLightbulb} className={css.icon} />
            <p className={css.text}>Intuicyjna obsługa</p>
          </div>
        </Container>
      </div>
      <div className={css.darkWrapper}>
        <Container paddingTop={70} paddingBottom={70}>
          <div className="text-center mb-14">
            <div className={css.new}>NOWOŚć</div>
            <br />
            <div className={css.logoCrm}>
              <img src="/identity/logo_white.svg" alt="rentools logo" />
              <div className={css.crm}>CRM</div>
            </div>
          </div>
          <div className={css.crmSection}>
            <div className={css.left}>
              <h4 className="text-white">System skrojony na miarę</h4>
              <p>
                Poza możliwością udostępnienia oferty i pozyskiwania nowych klientów oferujemy darmowy dostęp do
                oprogramowania CRM, które wspomaga profesjonalne zarządzanie Twoją wypożyczalnią.
              </p>
              <p className="mt-5">
                Tworzymy je wspólnie i elastycznie dostosowujemy funkcjonalność do Twoich potrzeb, dzięki czemu
                otrzymujesz do dyspozycji potężne narzędzie ułatwiające prowadzenie działalności. Odpowiadamy na Twoje
                wymagania i wprowadzamy pożądane zmiany czy nowe opcje, które będą Ci przydatne.
              </p>
            </div>
            <div className={css.right}>
              <img src="/landings/dla-wypozyczalni/browser-2.png" alt="CRM screenshot" />
            </div>
          </div>
          <div className={css.blurbsBottom}>
            <Blurb
              icon={faListCheck}
              title="Zarządzanie rezerwacjami"
              description="Zarówno tymi pochodzącymi z Rentools, jak i własnymi, które można dodać samodzielnie. Intuicyjny kalendarz ułatwia organizację pracy, a przypomnienia sprawiają, że pamiętasz o wszystkim, co najważniejsze.
"
            />
            <Blurb
              icon={faWarehouseFull}
              title="Magazyn produktów"
              description="Zakładka, która pozwala Ci na zarządzanie na bieżąco sprzętem i stanem magazynowym. Ponieważ dane są zsynchronizowane z informacjami pojawiającymi w wyszukiwarce, uzupełniają się automatycznie i nie ma potrzeby wprowadzania ich dwa razy w różnych miejscach.
"
            />
            <Blurb
              icon={faWandMagicSparkles}
              title="Automatyczne wystawianie dokumentów"
              description="Rentools samodzielnie wystawia i wysyła faktury po wykonaniu usługi, zgodnie z wprowadzonymi wcześniej ustawieniami. Dostępny jest także moduł do generowania umów."
            />
            <Blurb
              icon={faDollar}
              title="Oszczędność na oprogramowaniu"
              description="Zamiast płacić duże pieniądze za przygotowanie od początku autorskiego oprogramowania otrzymujesz dostęp do gotowego, profesjonalnego systemu, który spełnia Twoje wszystkie potrzeby."
            />
            <Blurb
              icon={faPhone}
              title="Pomoc we wdrożeniu i obsłudze"
              description=" W razie potrzeby gwarantujemy wszechstronne wsparcie w posługiwaniu się naszym oprogramowaniem"
            />
            <Blurb
              icon={faMobile}
              title="Dostęp z dowolnego urządzenia"
              description="Zarządzaj wypożyczalnią, gdziekolwiek jesteś!"
            />
          </div>
          <div className="text-center mt-10">
            <Button color="primary" size="md" as="a" href="/auth/signup?type=partner">
              Załóż konto
            </Button>
          </div>
        </Container>
      </div>
      <div className={css.primaryWrapper}>
        <Container>
          <div className="text-center">
            <FontAwesomeIcon icon={faEnvelope} size="4x" />
            <h2>Masz pytania?</h2>
            <p className="mb-5">
              Przyłącz się do budowania Rentools CRM – zostaw swoje dane, a my skontaktujemy się z Tobą!
            </p>
            <Button color="tertiary" size="md">
              Napisz do nas
            </Button>
          </div>
        </Container>
      </div>
    </Landing>
  );
};

export default DlaWypozyczalni;
