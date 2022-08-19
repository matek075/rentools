import React from 'react';

import { userContext } from 'context/user';
import { UserType } from 'context/user/types';
import UserMenu from 'components/navigation/Menu/components/UserMenu';
import PartnerMenu from 'components/navigation/Menu/components/PartnerMenu';

import css from './styles.module.scss';

const Menu: React.FC = () => {
  const user = React.useContext(userContext);

  return (
    <div className={css.menu}>
      <div className={css.items}>{user.data?.type === UserType.User ? <UserMenu /> : <PartnerMenu />}</div>
    </div>
  );
};

export default Menu;
