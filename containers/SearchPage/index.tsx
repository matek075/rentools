import React from 'react';
import { Formik, Field, Form } from 'formik';
import { faSearch } from '@fortawesome/pro-solid-svg-icons/faSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import Default from 'components/layouts/Default';
import Container from 'components/ui/Container';
import Search from 'components/form/fields/Search';
import GeoCityAutocomplete from 'components/form/fields/GeoCityAutocomplete';
import Select from 'components/form/fields/Select';
import Button from 'components/ui/Button';
import { getCookiesLocation, ResultItem, search, setCookiesLocation } from 'utils/product/search';
import ProductCard from 'components/business/ProductCard';
import NoResults from 'containers/SearchPage/components/NoResults';
import Loading from 'components/ui/Loading';

import css from './styles.module.scss';

interface SearchData {
  query: string;
  categoryIds: number[];
  geolocationId?: string;
  range: number;
}

const SearchPage: React.FC = () => {
  const router = useRouter();
  const [results, setResults] = React.useState<ResultItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [cityName, setCityName] = React.useState('');
  const [initialValues, setInitialValues] = React.useState<SearchData>({
    query: '',
    categoryIds: [],
    range: 10,
  });

  React.useEffect(() => {
    const cookieLocation = getCookiesLocation();
    if (cookieLocation.cityName) {
      setCityName(cookieLocation.cityName);
    }

    if (router.isReady) {
      const values: SearchData = {
        query: initialValues.query,
        categoryIds: initialValues.categoryIds,
        range: cookieLocation.range || 10,
        geolocationId: cookieLocation.geolocationId,
      }


      if (Array.isArray(router.query.categoryIds)) {
        values.categoryIds = router.query.categoryIds.map((id) => Number(id));
      } else if (router.query.categoryIds) {
        values.categoryIds = [Number(router.query.categoryIds)]
      } else if (typeof router.query.query === 'string') {
        values.query = router.query.query;
      }

      if (typeof router.query.geolocationId === 'string') {
        values.geolocationId = router.query.geolocationId;
      }


      setInitialValues(values);

      search(values).then(results => {
        setResults(results.data.results);
        setLoading(false);
      });

    }
  }, [router.query, router.isReady]);

  const handleSubmit = async (values: SearchData) => {
    setLoading(true);

    if (values.geolocationId) {
      setCookiesLocation({
        geolocationId: values.geolocationId,
        range: values.range,
        cityName,
      });
    }

    const results = await search(values);
    setResults(results.data.results);
    setLoading(false);
  };

  return (
    <Default>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
        {(form) => (
          <Form>
            <Container>
              <h1>Szukaj</h1>
              <div>
                <div className={css.searchBar}>
                  <div className={css.query}>
                    <Field
                      name="query"
                      borderless
                      bold
                      shadowed
                      component={Search}
                      initialInputValue={form.values.query}
                      placeholder="Wpisz, czego szukasz..."
                    />
                  </div>
                  <div className={css.city}>
                    <Field
                      name="geolocationId"
                      onInputChange={setCityName}
                      inputValue={cityName}
                      borderless
                      component={GeoCityAutocomplete}
                      placeholder="Miasto"
                    />
                  </div>
                  {form.values.geolocationId ? (
                    <div className={css.range}>
                      <Field
                        name="range"
                        borderless
                        component={Select}
                        options={[
                          { label: '+0km', value: 0 },
                          { label: '+5km', value: 5 },
                          { label: '+10km', value: 10 },
                          { label: '+20km', value: 20 },
                          { label: '+30km', value: 30 },
                          { label: '+40km', value: 40 },
                          { label: '+50km', value: 50 },
                        ]}
                        placeholder="Zakres"
                      />
                    </div>
                  ) : null}
                  <div className={css.button}>
                    <Button type="submit" block>
                      <FontAwesomeIcon icon={faSearch} size="lg" />
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </Form>
        )}
      </Formik>
      <Container>
        <div className={css.page}>
          <div className={css.content}>
            {loading && <Loading />}
            {!loading && results.length ? (
              <>
                <h3>{results.length} wyniki</h3>
                <div className={clsx(css.inner)}>
                  <div className={css.list}>
                    {results.map((result) => (
                      <ProductCard layout="list" key={result.id} data={result} />
                    ))}
                  </div>
                </div>
              </>
            ) : null}
            {!loading && !results.length ? <NoResults /> : null}
          </div>
        </div>
      </Container>
    </Default>
  );
};

export default SearchPage;
