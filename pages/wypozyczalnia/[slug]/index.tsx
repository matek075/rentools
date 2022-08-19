import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { getCompany, getReviews } from 'utils/company/public';
import CompanyProfile from 'containers/CompanyProfile';
import { CompanyProfileResponse, CompanyReview, Product } from 'types';
import { getCompanyProducts } from 'utils/product/getProducts';
interface OwnProps {
  data: CompanyProfileResponse;
  total: number;
  products: Product[];
  reviews: CompanyReview[];
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug as string;

  try {
    const data = await getCompany(slug);
    const reviews = await getReviews(data.company.id);

    const products = await getCompanyProducts(data.company.id, {
      take: 12,
      skip: 0,
    });

    return {
      props: {
        data: data,
        total: products.total,
        products: products.data,
        reviews,
      },
      revalidate: 1,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

const Page: React.FC<OwnProps> = ({ data, products, reviews, total }) => {
  return (
    <CompanyProfile
      total={total}
      reviews={reviews}
      data={data.company}
      products={products}
      questions={data.questions}
      categories={data.categories}
    />
  );
};

export default Page;
