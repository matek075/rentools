import React from 'react';
import AutoSuggest, { GetSuggestionValue, RenderSuggestion } from 'react-autosuggest';
import { FieldProps } from 'formik';
import { useDebounceCallback } from '@react-hook/debounce';
import clsx from 'clsx';

import Label from 'components/form/fields/Label';
import { searchGeolocations } from 'utils/geolocation/cities';
import { Geolocation } from 'types';

import inputCss from '../Input/styles.module.scss';

import css from './styles.module.scss';

interface OwnProps {
  label?: string | React.ReactNode;
  id?: string;
  placeholder?: string;
  options: Geolocation[];
  inputValue?: string;
  initialInputValue?: string;
  onInputChange?: (value: string) => void;
  borderless?: boolean;
}

const getSuggestionValue: GetSuggestionValue<Geolocation> = (suggestion) => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion: RenderSuggestion<Geolocation> = (suggestion) => {
  const parts = suggestion.fullName.split(', ');
  return (
    <div>
      <div className={css.name}>{parts[0]}</div>
      <div className={css.region}>{parts[2]}</div>
    </div>
  );
};

const GeoCityAutocomplete: React.FC<FieldProps & OwnProps> = (props) => {
  const error = props.form.errors[props.field.name];
  const [suggestions, setSuggestions] = React.useState<any>([]);
  const [text, setText] = React.useState(props.initialInputValue || '');

  const getSuggestions = async (value: string) => {
    const inputValue = value.toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      return [];
    }

    return await searchGeolocations(inputValue);
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
    if (props.onInputChange) {
      props.onInputChange(data.newValue);
    }
    setText(data.newValue);
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
        onSuggestionSelected={(_event, payload) => {
          props.form.setFieldValue(props.field.name, payload.suggestion.id);
        }}
        renderSuggestion={renderSuggestion}
        inputProps={{
          ...props.field,
          value: props.inputValue || text,
          'aria-invalid': error ? 'true' : 'false',
          placeholder: props.placeholder,
          onChange,
        }}
        theme={{
          ...css,
          input: clsx(inputCss.field, { [inputCss.borderless]: props.borderless }),
        }}
      />
      {error && <div className={inputCss.error}>{error}</div>}
    </>
  );
};

export default GeoCityAutocomplete;
