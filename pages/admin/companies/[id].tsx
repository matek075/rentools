import React from 'react';
import { GetServerSideProps } from 'next';

import Settings from 'settings';
import Admin from 'components/layouts/Admin';
import CompanyEdit from 'containers/admin/CompanyEdit';
import { Company } from 'context/company/types';
import { getCompany } from 'utils/admin/companies';

interface OwnProps {
    company: Company;
}

export const getServerSideProps: GetServerSideProps<OwnProps> = async (ctx) => {
  try {

    if (typeof ctx.params?.id === 'string') {
      const company = await getCompany(+ctx.params.id, ctx.req.cookies[Settings.AUTH_ADMIN_COOKIE_NAME]);

      console.log('data', company);

      if (!company) {
        throw new Error();
      }

      return {
        props: {
          company,
        }
      }
    } else {
      throw new Error();
    }
  } catch (e) {
    return {
      redirect: {
        destination: '/admin/companies',
        permanent: false,
      }
    }
  }
}

const AdminCompanies: React.FC<OwnProps> = ({ company }) => {
  return (
    <Admin>
      <CompanyEdit company={company} />
    </Admin>
  );
};

export default AdminCompanies;
