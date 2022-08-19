import React from 'react';
import AutoSuggest, { GetSuggestionValue, RenderSuggestion, ShouldRenderSuggestions } from 'react-autosuggest';
import { FieldProps } from 'formik';

import Label from 'components/form/fields/Label';

import inputCss from '../Input/styles.module.scss';

import css from './styles.module.scss';

export interface Option {
  label: string;
  value: string;
}

interface OwnProps {
  label?: string | React.ReactNode;
  id?: string;
  placeholder?: string;
  options: Option[];
  showOnFocus?: boolean;
}

const getSuggestionValue: GetSuggestionValue<Option> = (suggestion) => suggestion.value;

// Use your imagination to render suggestions.
const renderSuggestion: RenderSuggestion<Option> = (suggestion) => <div>{suggestion.label}</div>;

const Autocomplete: React.FC<FieldProps & OwnProps> = (props) => {
  const error = props.form.errors[props.field.name];
  const [suggestions, setSuggestions] = React.useState<any>([]);

  const getSuggestions = (value: string) => {
    const inputValue = value.toLowerCase();
    const inputLength = inputValue.length;

    if (props.showOnFocus && inputLength === 0) {
      return props.options;
    }

    return inputLength === 0 ? [] : props.options.filter((option) => option.label.toLowerCase().includes(inputValue));
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }: any) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (_e: any, { newValue }: any) => {
    props.form.setFieldValue(props.field.name, newValue);
  };

  const shouldRenderSuggestions: ShouldRenderSuggestions = (value, reason) => {
    if ((reason === 'render' || reason === 'input-focused') && props.showOnFocus) {
      return true;
    }

    if (value !== '') {
      return true;
    }

    return false;
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
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        shouldRenderSuggestions={shouldRenderSuggestions}
        inputProps={{
          ...props.field,
          'aria-invalid': error ? 'true' : 'false',
          onChange,
        }}
        theme={{
          ...css,
          input: inputCss.field,
        }}
      />
      {error && <div className={inputCss.error}>{error}</div>}
    </>
  );
};

export default Autocomplete;
