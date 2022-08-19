import React from 'react';
import Link from 'next/link';

import Button from 'components/ui/Button';

const UserDashboard: React.FC = () => {
  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <div className="mb-5">
          <p>Witaj w twoim dashboardzie!</p>
        </div>
        <Link href="/search">
          <Button color="primary" className="mt-2" as="a">
            Wyszukaj narzędzia
          </Button>
        </Link>
      </div>
    </>
  );
};

export default UserDashboard;
