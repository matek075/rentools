import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo, ProductJsonLd } from 'next-seo';

import Settings from 'settings';
import { getProduct } from 'utils/server/getProduct';
import { getSlugForProduct } from 'utils/product/slug';
import ProductPage from 'containers/ProductPage';
import { CompanyQuestions, ProductPage as IProduct } from 'types';

interface OwnProps {
  data: IProduct;
  url: string;
  questions: CompanyQuestions;
}

export const getStaticProps: GetStaticProps<OwnProps, { id: string; slug: string }> = async (ctx) => {
  if (!ctx.params) {
    return {
      notFound: true,
    };
  }

  const { id, slug } = ctx.params;

  const data = await getProduct(id);

  if (!data.product) {
    return {
      notFound: true,
    };
  }

  const productSlug = getSlugForProduct(data.product.brand, data.product.model);
  if (productSlug !== slug) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data,
      url: `${Settings.BASE_URL}products/${data.product.id}/${productSlug}`,
      questions: data.questions,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

const Page: React.FC<OwnProps> = ({ data, url, questions }) => {
  const description = data.product.description.replace(/<\/?[^>]+(>|$)/g, '');
  const sortedPrices = data.product.prices.sort((a, b) => (a.price > b.price ? 1 : -1));
  return (
    <>
      <NextSeo
        title={`${data.product.brand + ' ' + data.product.model} ${
          sortedPrices.length ? `- wypożycz już od ${sortedPrices[0].price}zł` : ''
        } | rentools.pl`}
        canonical={url}
        description={description}
        openGraph={{
          title: data.product.brand + ' ' + data.product.model,
          description: description,
          url,
          images: data.product.files.map((file, index) => ({
            url: file.path,
            alt: `${data.product.brand} ${data.product.model} image ${index}`,
          })),
        }}
      />
      <ProductJsonLd
        productName={data.product.brand + ' ' + data.product.model}
        images={data.product.files.map((file) => file.path)}
        description={description}
        brand={data.product.brand}
        offers={sortedPrices.map((price) => ({
          price: `${price.price}`,
          priceCurrency: 'PLN',
          itemCondition: 'https://schema.org/UsedCondition',
          availability: data.product.active ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          url,
          seller: {
            name: data.company.name,
          },
        }))}
      />
      <ProductPage data={data} questions={questions} />
    </>
  );
};

export default Page;
