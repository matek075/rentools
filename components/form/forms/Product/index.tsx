import { Field, FieldArray, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-solid-svg-icons/faXmark';
import Link from 'next/link';

import Row from 'components/form/fields/Row';
import Card from 'components/ui/Card';
import Input from 'components/form/fields/Input';
import Autocomplete, { Option } from 'components/form/fields/Autocomplete';
import CategoryPicker from 'components/form/fields/CategoryPicker';
import Button from 'components/ui/Button';
import Select from 'components/form/fields/Select';
import Gallery from 'components/form/fields/Gallery';
import { createProduct, CreateProductResult, ProductDto, updateProduct } from 'utils/product/product';
import { applyErrors } from 'utils/formik';
import ActionLink from 'components/navigation/ActionLink';
import Editor from 'components/form/fields/Editor';
import { Product } from 'types';
import { getSlugForProduct } from 'utils/product/slug';

import css from './styles.module.scss';

const brands: Option[] = [
  { label: 'Bosch', value: 'Bosch' },
  { label: 'Hilti', value: 'Hilti' },
  { label: 'Fogo', value: 'Fogo' },
  { label: 'Snap on', value: 'Snap on' },
  { label: 'Makita', value: 'Makita' },
  { label: 'Apex', value: 'Apex' },
  { label: 'Emerson', value: 'Emerson' },
  { label: 'Hitachi', value: 'Hitachi' },
  { label: 'Fortive', value: 'Fortive' },
  { label: 'Textron', value: 'Textron' },
  { label: 'TTS Tooltechnic', value: 'TTS Tooltechnic' },
  { label: 'Ideal', value: 'Ideal' },
  { label: 'Positec', value: 'Positec' },
  { label: 'JPW', value: 'JPW' },
  { label: 'Ingersoll Rand', value: 'Ingersoll Rand' },
  { label: 'Stanley Black & Decker', value: 'Stanley Black & Decker' },
];

export enum PriceRange {
  Hour = 'hour',
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Other = 'other',
}

export enum RentalRange {
  Hour = 'hour',
  Day = 'day',
  Week = 'week',
  Month = 'month',
}

const ranges = ['hour', 'week', 'day', 'other', 'month'];
const minRentalRanges = ['hour', 'week', 'day', 'month'];

interface OwnProps {
  data?: Product;
}

const ProductForm: React.FC<OwnProps> = ({ data }) => {
  const intl = useIntl();
  const [done, setDone] = React.useState(false);
  const [doneProduct, setDoneProduct] = React.useState<CreateProductResult | null>(null);

  const initialValues: ProductDto = {
    brand: data?.brand || '',
    model: data?.model || '',
    description: data?.description || '',
    prices: data?.prices.length ? data.prices : [{ price: 0, range: PriceRange.Day }],
    minRentalValue: data?.minRentalValue || 0,
    minRentalRange: data?.minRentalRange || RentalRange.Day,
    categoryId: data?.category.id,
    fileIds: [],
    deposit: data?.deposit,
  };

  const handleSubmit = async (values: ProductDto, helpers: FormikHelpers<ProductDto>) => {
    try {
      if (data) {
        const product = await updateProduct(data.id, values);
        setDoneProduct(product);
      } else {
        const product = await createProduct(values);
        setDoneProduct(product);
      }

      setDone(true);
    } catch (e) {
      applyErrors(e, helpers);
    }
  };

  if (done) {
    return (
      <div className={css.done}>
        <h4>
          <FormattedMessage id={data?.id ? 'products.updated' : 'products.created'} />
        </h4>
        <Link href="/user/products">
          <Button color="quaternary" as="a">
            <FormattedMessage id="products.goBack" />
          </Button>
        </Link>
        {doneProduct ? (
          <span className="ml-2">
            <Link href={`/products/${doneProduct.id}/${getSlugForProduct(doneProduct.brand, doneProduct.model)}`}>
              <Button color="tertiary" as="a">
                <FormattedMessage id="products.view" />
              </Button>
            </Link>
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(form) => (
        <Form>
          <h1>
            {data?.id ? (
              <FormattedMessage id="products.editOne" values={{ name: data?.brand + ' ' + data?.model }} />
            ) : (
              <FormattedMessage id="products.addNew" />
            )}
          </h1>
          <Card className="mb-4">
            <Row>
              <Field
                name="brand"
                component={Autocomplete}
                options={brands}
                label={<FormattedMessage id="form.brand" />}
              />
            </Row>
            <Row>
              <Field name="model" component={Input} label={<FormattedMessage id="form.model" />} />
            </Row>
            <Row>
              <Field name="categoryId" component={CategoryPicker} label={<FormattedMessage id="form.category" />} />
            </Row>
          </Card>
          <Card className="my-4" padding={20}>
            <Row>
              <Field name="description" component={Editor} label={<FormattedMessage id="form.description" />} />
            </Row>
          </Card>
          <Card className="my-4">
            <Row>
              <Field
                name="fileIds"
                initialState={data?.files
                  .sort((a, b) => (a.order > b.order ? 1 : -1))
                  .map((file) => ({
                    ...file,
                    source: file.path,
                    name: file.id,
                  }))}
                component={Gallery}
                label={intl.formatMessage({ id: 'ui.images' })}
              />
            </Row>
          </Card>
          <Card className="my-4">
            <FieldArray
              name="prices"
              render={(arrayHelpers) => (
                <div>
                  {form.values.prices.length
                    ? form.values.prices.map((_price, index) => (
                        <div key={index} className={css.price}>
                          <div className={css.left}>
                            <Row>
                              <Field
                                name={`prices.${index}.price`}
                                component={Input}
                                type="number"
                                suffix="zł"
                                label={intl.formatMessage({ id: 'ui.netPrice' })}
                              />
                            </Row>
                          </div>
                          <div className={css.right}>
                            <Row>
                              <Field
                                name={`prices.${index}.range`}
                                component={Select}
                                label={intl.formatMessage({ id: 'ui.range' })}
                                options={ranges.map((value) => ({
                                  value,
                                  label: intl.formatMessage({
                                    id: `range.${value}`,
                                  }),
                                }))}
                              />
                            </Row>
                          </div>
                          <div className={css.action}>
                            {form.values.prices.length > 1 && (
                              <a
                                role="button"
                                tabIndex={0}
                                className={css.remove}
                                onClick={() => arrayHelpers.remove(index)}>
                                <FontAwesomeIcon icon={faXmark} />
                              </a>
                            )}
                          </div>
                        </div>
                      ))
                    : null}
                  {form.values.prices.length < 4 && (
                    <ActionLink
                      className={css.priceLink}
                      onClick={() => arrayHelpers.push({ price: 0, range: PriceRange.Month })}>
                      + <FormattedMessage id="products.addPrice" />
                    </ActionLink>
                  )}
                </div>
              )}
            />
          </Card>
          <Card className="my-4">
            <Field
              name="deposit"
              type="number"
              component={Input}
              label={
                intl.formatMessage({ id: 'products.deposit' }) + ' (' + intl.formatMessage({ id: 'ui.optional' }) + ')'
              }
            />
          </Card>
          <Card className="my-4">
            <p className={css.rentalRange}>
              {intl.formatMessage({ id: 'products.minRentalRange' }) +
                ' (' +
                intl.formatMessage({ id: 'ui.optional' }) +
                ')'}
            </p>
            <div key={'minRentalRangesWrapper'} className={css.price}>
              <div className={css.left}>
                <Row>
                  <Field
                    name="minRentalValue"
                    component={Input}
                    min="0"
                    type="number"
                    label={intl.formatMessage({ id: 'ui.count' })}
                  />
                </Row>
              </div>
              <div className={css.right}>
                <Row>
                  <Field
                    name="minRentalRange"
                    component={Select}
                    label={intl.formatMessage({ id: 'ui.range' })}
                    options={minRentalRanges.map((value) => ({
                      value,
                      label: intl.formatMessage({
                        id: `range.${value}`,
                      }),
                    }))}
                  />
                </Row>
              </div>
            </div>
          </Card>
          <div className="my-4">
            <Button type="submit" block loading={form.isSubmitting}>
              <FormattedMessage id={data?.id ? 'ui.submitChanges' : 'products.addNew'} />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
