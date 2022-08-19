import React from 'react';
import clsx from 'clsx';
import { faPartyHorn } from '@fortawesome/pro-regular-svg-icons/faPartyHorn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { hasOpeningHours } from 'utils/company/common';
import { Company, CompanyPlan } from 'context/company/types';
import CompletionPoint from 'containers/dashboard/PublicProfileScore/components/CompletionPoint';
import CircularProgressBar from 'components/charts/CircularProgressBar';
import Button from 'components/ui/Button';

import css from './styles.module.scss';

interface OwnProps {
  company: Company;
  questionsCount: number;
}

const PublicProfileScore: React.FC<OwnProps> = (props) => {
  let score = 0;

  // 1 points
  const hasLogo = !!props.company.logo?.id;

  // 1 point
  const hasShortDescription = !!props.company.description;

  // 2 point
  const hasLongDescription = !!(props.company.information && props.company.information.length > 20);

  // 1 point
  const hasOH = hasOpeningHours(props.company.openingHours);

  // 1 point
  const hasEmail = !!props.company.email;

  // 1 point
  const hasPhone = !!props.company.phone;

  // 3 points (1 point per Q)

  if (hasLogo) {
    score += 1;
  }

  if (hasShortDescription) {
    score += 1;
  }

  if (hasLongDescription) {
    score += 2;
  }

  if (hasOH) {
    score += 1;
  }

  if (hasEmail) {
    score += 1;
  }

  if (hasPhone) {
    score += 1;
  }

  score += Math.min(props.questionsCount, 3);

  let color = 'yellow';

  if (score < 5) {
    color = 'red';
  } else if (score === 10) {
    color = 'green';
  }

  return (
    <div className={css.wrapper}>
      <div className={css.left}>
        <h4>
          Ocena wizytówki{' '}
          <div
            className={clsx(css.level, {
              [css.red]: score < 5,
              [css.orange]: score < 7 && score >= 5,
              [css.yellow]: score < 10 && score >= 7,
              [css.green]: score === 10,
            })}>
            {score}/10
          </div>
        </h4>
        {score < 10 ? (
          <>
            <p className="text-gray-400 text-sm">
              Hej! Do pełni szczęścia brakuje Ci jeszcze kilka punktów do zrobienia. <br />
              Skorzystaj z poniższej ściągawki i uzupełnij potrzebne informacje, by wystrzelić swoją wizytówkę w kosmos!
            </p>
            <CompletionPoint
              title="Logo firmy"
              description="Dodaj logo swojej firmy, by nadać profilowi unikalny akcent"
              actionLink="/user/company"
              actionName="Dodaj logo firmy"
              completed={hasLogo}
            />
            <CompletionPoint
              title="Firmowy adres e-mail"
              description="Dodaj adres e-mail swojej firmy, by umożliwić klientom możliwość kontaktu"
              actionLink="/user/company"
              actionName="Dodaj adres e-mail"
              completed={hasEmail}
            />
            <CompletionPoint
              title="Firmowy numer telefonu"
              description="Dodaj firmowy numer telefonu, pod którym można składać zamówienia"
              actionLink="/user/company"
              actionName="Dodaj numer kontaktowy"
              completed={hasPhone}
            />
            <CompletionPoint
              title="Krótki opis firmy"
              description="Ten opis jest wyświetlany na samej górze wizytówki. To pierwsza rzecz, jaką przeczytają Twoi klienci"
              actionLink="/user/company"
              actionName="Dodaj krótki opis firmy"
              completed={hasShortDescription}
            />
            <CompletionPoint
              title="Informacje o wypożyczalni"
              description="Te informacje wyświetlają się w osobnej sekcji na twojej wizytówce. Ta sekcja pozwala Ci na rozwinięcie się na temat Twojej wypożyczalni, wyróżnienie oddziałów, oraz rodzajów oferowanego sprzętu"
              actionLink="/user/company"
              actionName="Dodaj informacje o firmie"
              completed={hasLongDescription}
            />
            <CompletionPoint
              title="Godziny otwarcia"
              description="Dodaj godziny otwarcia wypożyczalni"
              actionLink="/user/company/opening-hours"
              actionName="Dodaj godziny otwarcia"
              completed={hasOH}
            />
            <CompletionPoint
              title="Przynajmniej 3 pytania i odpowiedzi"
              description="Twoi klienci mają wiele pytań. Wiele z nich się powtarza, więc ta sekcja może Ci posłużyć do odpowiedzenia na najbardziej popularne pytania. Możesz skorzystać także z listy przygotowanych pytań przez nas."
              actionLink="/user/company/questions"
              actionName="Dodaj pytania i odpowiedzi"
              completed={props.questionsCount >= 3}
            />
            <Button
              className="mt-5"
              color="gray"
              size="lg"
              as="a"
              href={`/wypozyczalnia/${props.company.slug}`}
              target="_blank">
              Otwórz swoją wizytówkę
            </Button>
          </>
        ) : (
          <div className={css.done}>
            <div className={css.title}>
              Brawo <FontAwesomeIcon icon={faPartyHorn} />
            </div>
            <p className={css.sub}>Twoja wizytówka wygląda obiecująco!</p>
            <p className="text-gray-400 text-sm">
              Pamiętaj, że dane swojej wizytówki możesz aktualizować, klikając w zakładkę “Firma” w menu po lewej
              stronie.
            </p>

            <div className={clsx(css.title, 'mt-10')}>No dobra, ale co dalej?</div>
            <p className="text-gray-400 text-sm">
              Wyprzedź konkurencję, i dodaj swój sprzęt do Rentools, co pozwoli dotrzeć Ci do większej liczby klientów!
            </p>
            {props.company.plan === CompanyPlan.Basic && (
              <Button
                style={{ marginRight: '20px' }}
                className="mt-5 mr-5"
                color="primary"
                size="lg"
                as="a"
                href="mailto:team@rentools.pl">
                Odblokuj dodawanie produktów
              </Button>
            )}
            <Button
              className="mt-5"
              color="gray"
              size="lg"
              as="a"
              href={`/wypozyczalnia/${props.company.slug}`}
              target="_blank">
              Otwórz swoją wizytówkę
            </Button>
          </div>
        )}
      </div>
      <div className={css.right}>
        <div className={css.chartWrapper}>
          <CircularProgressBar value={score * 10} size={250} strokeWidth={20} color={color as any} />
        </div>
      </div>
    </div>
  );
};

export default PublicProfileScore;
