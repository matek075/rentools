import React from 'react';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage, useIntl } from 'react-intl';

import Card from 'components/ui/Card';
import { Company } from 'context/company/types';

import css from '../../styles.module.scss';

interface OwnProps {
  data: Company;
}

const Header: React.FC<OwnProps> = ({ data }) => {
  const [url, setUrl] = React.useState('');
  const intl = useIntl();
  const title = encodeURIComponent(intl.formatMessage({ id: 'profile.name' }) + ' ' + data.name + ' | rentools.pl');

  React.useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <div className={css.header}>
      <Card>
        {data.logo?.path && <img src={data.logo?.path} alt={`${data.name} logo`} className={css.logo} />}
        <h1 className="mt-3">{data.name}</h1>
        <p>{data.description}</p>
        <div className={css.socials}>
          <div className={css.text}>
            <FormattedMessage id="profile.share" />
          </div>
          <div className={css.social}>
            <a
              href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </div>
          <div className={css.social}>
            <a
              href={`https://twitter.com/share?url=${url}&text=${title}&hashtags=zrobtosam`}
              target="_blank"
              rel="noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
          <div className={css.social}>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`}
              target="_blank"
              rel="noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Header;
