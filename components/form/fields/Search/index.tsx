import React from 'react';
import AutoSuggest, { GetSuggestionValue, RenderSuggestion } from 'react-autosuggest';
import { FieldProps } from 'formik';
import { useDebounceCallback } from '@react-hook/debounce';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import Label from 'components/form/fields/Label';
import { Geolocation } from 'types';
import useCategories from 'hooks/products/useCategories';
import { Category } from 'utils/product/categories';

import inputCss from '../Input/styles.module.scss';

import css from './styles.module.scss';

interface OwnProps {
  label?: string | React.ReactNode;
  id?: string;
  placeholder?: string;
  options: Geolocation[];
  initialInputValue?: string;
}

const getSuggestionValue: GetSuggestionValue<Suggestion> = (suggestion) => suggestion.label;

type ItemType = 'category' | 'query';

type Suggestion = {
  label: string;
  value: any;
  type: ItemType;
};

// Use your imagination to render suggestions.
const renderSuggestion: RenderSuggestion<Suggestion> = (suggestion) => (
  <div>
    <div className={css.label}>{suggestion.label}</div>
    <div className={css.type}>
      <FormattedMessage id={`search.type.${suggestion.type}`} />
    </div>
  </div>
);

const flattenCategories = (categories: Category[]): Category[] => {
  const flattened: Category[] = [];

  for (const category of categories) {
    flattened.push({
      ...category,
      children: [],
    });

    for (const child of category.children) {
      flattened.push(child);
    }
  }

  return flattened;
}

const Search: React.FC<FieldProps & OwnProps> = (props) => {
  const categories = useCategories();

  const error = props.form.errors[props.field.name];
  const [suggestions, setSuggestions] = React.useState<any>([]);
  const [text, setText] = React.useState(props.initialInputValue);

  React.useEffect(() => {
    if (props.initialInputValue && (!props.field.value || !props.field.value.length)) {
      setText(props.initialInputValue);
    }

    console.log('0', props.form.values.categoryIds, categories);
    if (
      !text
      && props.form.values.categoryIds
      && props.form.values.categoryIds.length
      && categories
      && categories.length
    ) {
        // @ts-ignore
        setText(flattenCategories(categories).find(c => c.id === props.form.values.categoryIds[0]).name);
    }
  }, [props.initialInputValue, props.form.values['categoryIds'], text, categories]);

  const getSuggestions = async (value: string) => {
    const inputValue = value.toLowerCase();
    const inputLength = inputValue.length;

    let suggestions1: Suggestion[] = categories.map((category) => ({
      label: category.name,
      value: category.id,
      type: 'category',
    }));

    if (inputLength === 0) {
      return suggestions1;
    }

    categories.forEach((category) =>
      category.children.forEach((child) => {
        suggestions1.push({
          label: child.name,
          value: child.id,
          type: 'category',
        });
      }),
    );

    suggestions1 = suggestions1.filter((category) => category.label.toLowerCase().includes(inputValue));
    suggestions1.push({
      label: value,
      value: value,
      type: 'query',
    });

    return suggestions1;
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = async ({ value }: any) => {
    setSuggestions(await getSuggestions(value));
  };

  const debouncedFetchRequest = useDebounceCallback(onSuggestionsFetchRequested, 500);

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (_e: any, data: { method: any; newValue: any }) => {
    _e.preventDefault();
    setText(data.newValue);
    props.form.setFieldValue('categoryIds', []);
  };

  return (
    <>
      {props.label && (
        <Label error={!!error} htmlFor={props.id || props.field.name}>
          {props.label}
        </Label>
      )}
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={debouncedFetchRequest}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        shouldRenderSuggestions={() => true}
        onSuggestionSelected={(_event, payload) => {
          if (payload.suggestion.type === 'query') {
            props.form.setFieldValue('query', payload.suggestion.value);
            props.form.setFieldValue('categoryIds', []);
          } else if (payload.suggestion.type === 'category') {
            props.form.setFieldValue('query', '');
            const categoryId = payload.suggestion.value;
            let categoryIds: number[] = [];
            const category: Category | undefined = categories.find((category) => category.id === categoryId);

            if (category) {
              categoryIds.push(category.id);
              categoryIds = categoryIds.concat(category.children.map((child) => child.id));
            } else {
              categoryIds.push(categoryId);
            }

            props.form.setFieldValue('categoryIds', categoryIds);
          }
        }}
        renderSuggestion={renderSuggestion}
        inputProps={{
          ...props.field,
          value: text || '',
          'aria-invalid': error ? 'true' : 'false',
          placeholder: props.placeholder,
          onChange,
        }}
        theme={{
          ...css,
          input: clsx(inputCss.field, inputCss.borderless, inputCss.bold),
        }}
      />
      {error && <div className={inputCss.error}>{error}</div>}
    </>
  );
};

export default Search;
