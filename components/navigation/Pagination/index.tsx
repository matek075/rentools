import React from 'react';

import PaginationButton from 'components/navigation/Pagination/components/PaginationButton';

import css from './styles.module.scss';

interface OwnProps {
  page: number;
  total: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<OwnProps> = (props) => {


  const handlePrev = () => {
    if (props.page > 1) {
      props.onChangePage(props.page - 1);
    }
  }

  const handleNext = () => {
    if (props.page < props.total) {
      props.onChangePage(props.page + 1);
    }
  }

  const handlePage = (page: number) => {
    props.onChangePage(page);
  }

  const items: React.ReactElement[] = React.useMemo(() => {
    let itemsAdded: React.ReactElement[] = [];


    if (props.total && props.total > 0) {
      itemsAdded = [...Array(props.total)].map((_, i) =>
        (<PaginationButton key={`page-${i}`} type="page" currentPage={props.page} page={i + 1} onClick={() => handlePage(i + 1)} />));

    }

    return itemsAdded;
  }, [props.page, props.total])

  return (
    <div className={css.pagination}>
      <PaginationButton type="prev" currentPage={props.page} onClick={handlePrev} disabled={props.page === 1} />
      { items }
      <PaginationButton type="next" currentPage={props.page} onClick={handleNext} disabled={props.page === props.total} />
    </div>
  )
}

export default Pagination
