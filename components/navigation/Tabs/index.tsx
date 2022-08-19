import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import css from 'components/navigation/Tabs/styles.module.scss';

interface TabProps {
  name: string | ReactNode;
  href: string;
  selected: boolean;
}

const Tab: React.FC<TabProps> = ({ name, href, selected }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };

  return (
    <div role="button" tabIndex={0} className={clsx(css.tab, { [css.selected]: selected })} onClick={onClick}>
      {name}
    </div>
  );
};

interface OwnProps {
  tabs: TabProps[];
}

const Tabs: React.FC<OwnProps> = (props) => {
  return (
    <div className={css.tabs}>
      {props.tabs.map((tab) => (
        <Tab key={tab.href} selected={tab.selected} name={tab.name} href={tab.href} />
      ))}
    </div>
  );
};

export default Tabs;
