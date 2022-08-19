import React from 'react';
import { faHome } from '@fortawesome/pro-regular-svg-icons/faHome';
import { faChevronRight } from '@fortawesome/pro-regular-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import { userContext } from 'context/user';

import css from './styles.module.scss';

export interface Breadcrumb {
  url: string;
  name: string;
}

interface OwnProps {
  items?: Breadcrumb[];
}

const Divider = () => (
  <div className={css.divider}>
    <FontAwesomeIcon icon={faChevronRight} className={css.dividerImage} />
  </div>
);

const Breadcrumbs: React.FC<OwnProps> = ({ items }) => {
  const { authenticated } = React.useContext(userContext);

  return (
    <div className={css.wrapper}>
      <div className={css.breadcrumbs}>
        <Link href={authenticated ? '/user/dashboard' : '/'}>
          <a>
            <FontAwesomeIcon icon={faHome} className={css.breadcrumbHome} />
          </a>
        </Link>
        {items && items.length ? <Divider /> : null}
        {items
          ? items.map((item, index) => (
              <div className={css.breadcrumbWrapper} key={index}>
                <Link href={item.url}>
                  <a className={css.breadcrumb}>{item.name}</a>
                </Link>
                {index < items.length - 1 && <Divider />}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Breadcrumbs;
