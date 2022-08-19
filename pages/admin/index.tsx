import React from 'react';
import { GetServerSideProps } from 'next';

import Settings from 'settings';
import Dashboard from 'containers/admin/Dashboard';
import { fetchAdminStats } from 'utils/admin/stats';
import { OwnProps } from 'containers/admin/Dashboard';


export const getServerSideProps: GetServerSideProps<OwnProps> = async (ctx) => {

  if (!ctx.req.cookies[Settings.AUTH_ADMIN_COOKIE_NAME]) {
    return {
      redirect: {
        destination: '/admin/signin',
        permanent: false,
      }
    }
  }

  const stats = await fetchAdminStats(ctx.req.cookies[Settings.AUTH_ADMIN_COOKIE_NAME]);

  return {
    props: {
      stats,
    }
  }
}

const AdminPage: React.FC<OwnProps> = ({ stats }) => {

  return (
    <Dashboard stats={stats} />
  );
};

export default AdminPage;
