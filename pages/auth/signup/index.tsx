import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { faTools } from '@fortawesome/pro-duotone-svg-icons/faTools';
import { faWarehouseFull } from '@fortawesome/pro-duotone-svg-icons/faWarehouseFull';
import { useRouter } from 'next/router';

import Auth from 'components/layouts/Auth';
import SignupForm from 'components/form/forms/SignupForm';
import SelectCard from 'components/form/forms/SignupForm/components/SelectCard';
import { UserType } from 'context/user/types';
import Card from 'components/ui/Card';
import OnlyNotAuthenticated from 'components/navigation/routes/OnlyNotAuthenticated';

const Signup: React.FC = () => {
  const router = useRouter();

  const { formatMessage } = useIntl();

  const [type, setType] = React.useState<UserType | undefined>(undefined);

  React.useEffect(() => {
    if (router.query.type && (router.query.type === UserType.User || router.query.type === UserType.Partner)) {
      setType(router.query.type);
    }
  }, [router.query]);

  return (
    <OnlyNotAuthenticated>
      <Auth title={formatMessage({ id: 'auth.signup.title' })}>
        <h3 className="mt-10">
          <FormattedMessage id="auth.signup.stepOne" />
        </h3>
        <SelectCard
          icon={faTools}
          text={<FormattedMessage id="auth.registerUser" />}
          onClick={() => setType(UserType.User)}
          selected={type === UserType.User}
        />
        <SelectCard
          icon={faWarehouseFull}
          text={<FormattedMessage id="auth.registerPartner" />}
          onClick={() => setType(UserType.Partner)}
          selected={type === UserType.Partner}
        />
        {type === UserType.Partner && (
          <div className="text-gray-400 text-sm">
            <FormattedMessage id="auth.partner.hint" />
          </div>
        )}
        {type && (
          <>
            <h3 className="mt-10">
              <FormattedMessage id="auth.signup.stepTwo" />
            </h3>
            <Card>
              <SignupForm userType={type} />
            </Card>
          </>
        )}
      </Auth>
    </OnlyNotAuthenticated>
  );
};

export default Signup;
