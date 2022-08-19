import React from 'react';
import { useDropzone } from 'react-dropzone';
import { faImage } from '@fortawesome/pro-regular-svg-icons/faImage';
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons/faSpinnerThird';
import { faHandBackPointDown } from '@fortawesome/pro-regular-svg-icons/faHandBackPointDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { FieldProps } from 'formik';

import Label from 'components/form/fields/Label';
import { FileType, uploadFile } from 'utils/user/user';

import css from './styles.module.scss';

interface OwnProps {
  label?: string | React.ReactNode;
  id?: string;
  fileType?: FileType;
  initialImage?: string;
}

const Image: React.FC<FieldProps & OwnProps> = (props) => {
  const error = props.form.errors[props.field.name];
  const [file, setFile] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
    setLoading(true);
    // Do something with the files
    const parsedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );

    if (parsedFiles.length) {
      setFile(parsedFiles[0]);
    }

    try {
      const file = await uploadFile(acceptedFiles[0], props.fileType || 'logo');
      setLoading(false);
      props.form.setFieldValue(props.field.name, file.id);
    } catch (e) {
      setLoading(false);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
    maxSize: 300000,
  });

  return (
    <div>
      {props.label && (
        <Label error={!!error} htmlFor={props.id || props.field.name}>
          {props.label}
        </Label>
      )}
      <div
        {...getRootProps()}
        className={clsx({
          [css.root]: true,
          [css.active]: isDragActive,
        })}>
        <input {...getInputProps()} className={css.input} />
        {loading && (
          <FontAwesomeIcon
            icon={faSpinnerThird}
            spin
            className={clsx({
              [css.icon]: true,
              [css.loadingIcon]: true,
            })}
            size="3x"
          />
        )}
        {!file && !loading && (
          <FontAwesomeIcon icon={isDragActive ? faHandBackPointDown : faImage} className={css.icon} size="3x" />
        )}
        {file && !loading && (
          <div className={css.thumb} key={file.name}>
            <img src={file.preview} className={css.img} alt="logo preview" />
          </div>
        )}
        {props.initialImage && !file && !loading && (
          <div className={css.thumb} key="preview">
            <img src={props.initialImage} className={css.img} alt="logo preview" />
          </div>
        )}
        {fileRejections.map(({ errors }, i) => (
          <div style={{ color: 'red' }} key={i}>
            {errors.map((error) => error.message)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Image;
