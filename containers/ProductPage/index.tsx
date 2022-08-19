import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { faEdit } from '@fortawesome/pro-regular-svg-icons/faEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import Default from 'components/layouts/Default';
import Card from 'components/ui/Card';
import Container from 'components/ui/Container';
import CompanyDetails from 'containers/ProductPage/components/CompanyDetails';
import Gallery from 'containers/ProductPage/components/Gallery';
import Details from 'containers/ProductPage/components/Details';
import { CompanyQuestions, ProductPage as IProduct } from 'types';
import { companyContext } from 'context/company';
import Questions from 'components/landing/Questions';
import Breadcrumbs, { Breadcrumb } from 'components/navigation/Breadcrumbs';
import { getSlugForProduct } from 'utils/product/slug';

import css from './styles.module.scss';

interface OwnProps {
  data: IProduct;
  questions: CompanyQuestions;
}

const ProductPage: React.FC<OwnProps> = (props) => {
  const company = useContext(companyContext);

  const breadcrumbs: Breadcrumb[] = [{
    url: `/wypozyczalnia/${props.data.company.slug}`,
    name: props.data.company.name,
  }, {
    url: `/products/${props.data.product.id}/${getSlugForProduct(props.data.product.brand, props.data.product.model)}`,
    name: `${props.data.product.brand} ${props.data.product.model}`
  }]

  return (
    <Default>
      {!company.loading && company.data && company.data.id === props.data.company.id ? (
        <div className={css.bar}>
          <Container>
            <Link href={`/user/products/${props.data.product.id}`}>
              <a>
                <FontAwesomeIcon icon={faEdit} className={css.icon} />
                <FormattedMessage id="products.edit" />
              </a>
            </Link>
          </Container>
        </div>
      ) : null}
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        <div className={css.page}>
          <div className={css.content}>
            <Card className={css.card}>
              <div className={css.id}>
                <FormattedMessage id="products.id" />: {props.data.product.id}
              </div>
              <Gallery product={props.data.product} />
            </Card>
            <h5 className="mt-5">
              <FormattedMessage id="ui.description" />
            </h5>
            <Card className={css.card}>
              <div
                dangerouslySetInnerHTML={{
                  __html: `<div>${props.data.product.description}</div>`,
                }}
              />
            </Card>
            <h5 className="mt-5">Pytania i odpowiedzi</h5>
            <Questions questions={props.questions} />
          </div>
          <div className={css.sidebar}>
            <Card className={css.card}>
              <Details product={props.data.product} />
            </Card>
            <Card className={css.card}>
              <CompanyDetails company={props.data.company} />
            </Card>
          </div>
        </div>
      </Container>
    </Default>
  );
};

export default ProductPage;
