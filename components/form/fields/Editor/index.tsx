import React from 'react';
import { FieldProps } from 'formik';
import clsx from 'clsx';

import Label from 'components/form/fields/Label';

import css from './styles.module.scss';

const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

interface OwnProps {
  id?: string;
  label?: string | React.ReactNode;
}

const Editor: React.FC<FieldProps & OwnProps> = (props) => {
  const error = props.form.errors[props.field.name];
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <div className={clsx(css.editor, { [css.invalid]: !!error })}>
      {props.label && (
        <Label error={!!error} htmlFor={props.id || props.field.name}>
          {props.label}
        </Label>
      )}
      {typeof document !== 'undefined' && ReactQuill && (
        <ReactQuill
          modules={{
            toolbar: [
              [{ header: [2, 3, 4, 5, 6, false] }],
              ['bold', 'italic', 'underline', 'strike'], // toggled buttons
              [{ list: 'ordered' }, { list: 'bullet' }],

              ['clean'],
            ],
          }}
          theme="snow"
          value={props.field.value}
          onChange={(value: string) => props.form.setFieldValue(props.field.name, value)}
        />
      )}
    </div>
  );
};

export default Editor;
