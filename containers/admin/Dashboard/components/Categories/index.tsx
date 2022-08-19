import React from 'react';

import { AdminStats } from 'utils/admin/stats';
import Card from 'components/ui/Card';

export interface OwnProps {
  stats: AdminStats;
}

const Categories: React.FC<OwnProps> = ({ stats }) => {
  return (
    <Card>
      <table>
        <tbody>
        { stats.categoriesCount.sort((a, b) => a.total <= b.total ? 1 : -1).map(category => (
          <tr key={category.id}>
            <td>
              <strong>
                { category.name }:
              </strong>
            </td>
            <td>
              { category.total }
            </td>
          </tr>
        )) }
        </tbody>
      </table>
    </Card>
  )
}

export default Categories;
