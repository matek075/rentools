import React, { useEffect } from 'react';
import { LocalBusinessJsonLd, NextSeo } from 'next-seo';

import Settings from 'settings';
import Default from 'components/layouts/Default';
import Container from 'components/ui/Container';
import { Company, CompanyPlan } from 'context/company/types';
import { CompanyQuestion, CompanyReview, Product, ProductCategory } from 'types';
import Reviews from 'containers/CompanyProfile/components/Reviews';
import Products from 'containers/CompanyProfile/components/Products';
import Details from 'containers/CompanyProfile/components/Details';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Header from 'containers/CompanyProfile/components/Header';
import Buttons from 'containers/CompanyProfile/components/Buttons';
import Sidebar from 'containers/CompanyProfile/components/Sidebar';
import { noteVisits } from 'utils/company/noteVisits';

import css from './styles.module.scss';

interface OwnProps {
  data: Company;
  products: Product[];
  total: number;
  categories: ProductCategory[];
  reviews: CompanyReview[];
  questions: CompanyQuestion[];
}

const CompanyProfile: React.FC<OwnProps> = ({ data, ...props }) => {
  useEffect(() => {
    noteVisits(data.slug);
  }, [data.slug]);

  const url = `${Settings.BASE_URL}wypozyczalnia/${data.slug}`;
  const title = `${data.name} - Profil wypożyczalni | Rentools.pl`;
  return (
    <Default>
      <NextSeo
        title={title}
        description={data.description}
        canonical={url}
        openGraph={{
          title,
          description: data.description,
          images: data.logo?.path ? [{ url: data.logo.path, alt: `${data.name} logo` }] : undefined,
        }}
      />
      <LocalBusinessJsonLd
        type="LocalBusiness"
        id={url}
        url={url}
        name={data.name}
        description={data.description}
        address={{
          streetAddress: data.address,
          addressLocality: data.geolocation.fullName,
          addressCountry: 'Poland',
          postalCode: data.postCode,
        }}
        images={data.logo?.path ? [data.logo.path] : undefined}
        action={{
          actionName: 'potentialAction',
          actionType: 'ReviewAction',
          target: `${url}/reviews`,
        }}
      />
      <Container>
        <Breadcrumbs items={[{ url, name: `${data.name} - Profil wypożyczalni` }]} />
        <div className={css.profile}>
          <Header data={data} />
          <Buttons plan={data.plan} />
          <hr className={css.separator} />
          {data.plan !== CompanyPlan.Basic && (
            <div id="products">
              <Products
                location={data.geolocation.name}
                companyId={data.id}
                products={props.products}
                categories={props.categories}
                reviews={props.reviews}
                total={props.total}
              />
            </div>
          )}
          <div className={css.details}>
            <div className={css.left}>
              <div id="details">
                <Details data={data} questions={props.questions} />
              </div>
              <div id="reviews" className="mt-10">
                <Reviews reviews={props.reviews} companyId={data.id} />
              </div>
            </div>
            <div className={css.right}>
              <div style={{ marginTop: '65px' }}>
                <Sidebar data={data} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Default>
  );
};

export default CompanyProfile;
