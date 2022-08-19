import React from 'react';
import Table from 'react-data-table-component';

import { AdminListUser, getUsers } from 'utils/admin/users';

const UsersTable: React.FC = () => {
  const [data, setData] = React.useState<AdminListUser[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [totalRows, setTotalRows] = React.useState(0);
  const [perPage, setPerPage] = React.useState(10);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    const data = await getUsers(perPage, Math.max((page - 1) * perPage, 0));
    setData(data.data.data);
    setTotalRows(data.data.total);
    setLoading(false);
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true);
    setPerPage(newPerPage);
    const data = await getUsers(newPerPage, Math.max((page - 1) * newPerPage, 0));
    setData(data.data.data);
    setTotalRows(data.data.total);
    setLoading(false);
  }

  React.useEffect(() => {
    fetchUsers(1);
  }, []);

  // const data: AdminListUser[] = React.useMemo(async () => {
  //   return getUsers(10, 0);
  // }, []);

  const columns = React.useMemo(
    () => [
      {
        name: 'ID',
        selector: (row: AdminListUser) => row.id,
      },
      {
        name: 'Imię',
        selector: (row: AdminListUser) => row.name,
      },
      {
        name: 'Nazwisko',
        selector: (row: AdminListUser) => row.surname,
      },
      {
        name: 'E-mail',
        selector: (row: AdminListUser) => row.email,
      },
      {
        name: 'Rodzaj',
        selector: (row: AdminListUser) => row.type,
      },
      {
        name: 'Utworzony',
        selector: (row: AdminListUser) => row.createdAt,
      },
      {
        name: 'Firma',
        selector: (row: AdminListUser) => (row.company ? row.company.name : '-'),
      },
      {
        name: 'Aktywowany',
        selector: (row) => (row.active ? 'Tak' : 'Nie'),
      },
    ],
    [],
  );

  return <Table
    columns={columns}
    data={data}
    title="Użytkownicy"
    progressPending={loading}
    pagination
    paginationServer
    paginationTotalRows={totalRows}
    paginationPerPage={perPage}
    selectableRows
    onChangeRowsPerPage={handlePerRowsChange}
    onChangePage={fetchUsers}
  />;
};

export default UsersTable;
