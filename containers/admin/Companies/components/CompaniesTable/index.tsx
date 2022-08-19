import React from 'react';
import Table from 'react-data-table-component';

import { AdminListCompany, getCompanies } from 'utils/admin/companies';
import ActionLink from 'components/navigation/ActionLink';

const CompaniesTable: React.FC = () => {
  const [data, setData] = React.useState<AdminListCompany[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [totalRows, setTotalRows] = React.useState(0);
  const [perPage, setPerPage] = React.useState(10);

  const fetchCompanies = async (page: number) => {
    setLoading(true);
    const data = await getCompanies(perPage, Math.max((page - 1) * perPage, 0));
    setData(data.data.data);
    setTotalRows(data.data.total);
    setLoading(false);
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true);
    setPerPage(newPerPage);
    const data = await getCompanies(newPerPage, Math.max((page - 1) * newPerPage, 0));
    setData(data.data.data);
    setTotalRows(data.data.total);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchCompanies(1);
  }, []);

  const columns = React.useMemo(
    () => [
      {
        name: 'ID',
        selector: (row: AdminListCompany) => row.id,
      },
      {
        name: 'Nazwa',
        selector: (row: AdminListCompany) => row.name,
      },
      {
        name: 'Nr tel',
        selector: (row: AdminListCompany) => row.phone,
      },
      {
        name: 'Wizyty',
        selector: (row: AdminListCompany) => row.visits,
      },
      {
        name: 'Adres wizytówki',
        selector: (row: AdminListCompany) => row.slug,
      },
      {
        name: 'Miasto',
        selector: (row: AdminListCompany) => (row.geolocation ? row.geolocation.name : '-'),
      },
      {
        name: 'Akcje',
        cell: (row: AdminListCompany) => (
          <ActionLink href={`/admin/companies/${row.id}`}>Edytuj</ActionLink>
        )
      }
    ],
    [],
  );

  return <Table
    columns={columns}
    data={data}
    title="Firmy"
    progressPending={loading}
    pagination
    paginationServer
    paginationTotalRows={totalRows}
    paginationPerPage={perPage}
    selectableRows
    onChangeRowsPerPage={handlePerRowsChange}
    onChangePage={fetchCompanies}
  />;
};

export default CompaniesTable;
