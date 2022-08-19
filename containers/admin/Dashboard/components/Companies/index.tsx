import React from 'react';

import { AdminStats } from 'utils/admin/stats';
import ActionLink from 'components/navigation/ActionLink';
import Card from 'components/ui/Card';

export interface OwnProps {
  stats: AdminStats;
}

const Companies: React.FC<OwnProps> = ({ stats }) => {
  return (
    <Card>
      <table style={{ width: '100%' }}>
        <tbody>
        {
          stats.lastCompanies.map(company => (
            <tr key={company.id}>
              <td width={30}>{ company.id }</td>
              <td><strong>{ company.name }</strong></td>
              <td width={100}><ActionLink href={`/wypozyczalnia/${company.slug}`} target="_blank">Wizytówka</ActionLink></td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </Card>
  )
}

export default Companies;
