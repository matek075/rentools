import React from 'react';
import RUG, { DropArea } from 'react-upload-gallery';
import 'react-upload-gallery/dist/style.css';
import axios from 'axios'; // or scss
import clsx from 'clsx';
import { FieldProps } from 'formik';
import { useIntl } from 'react-intl';

import { uploadFile } from 'utils/user/user';
import { File } from 'types';
import Label from 'components/form/fields/Label';

import css from './styles.module.scss';

interface OwnProps {
  label?: string;
  initialState?: {
    source: string;
    name: string;
  }[];
}

const Gallery: React.FC<FieldProps & OwnProps> = (props) => {
  const intl = useIntl();

  const handleUpload = ({ uid, file, action, onProgress, onSuccess, onError }: any) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    uploadFile(
      file,
      'product',
      ({ total, loaded }) => {
        onProgress(uid, Math.round((loaded / total) * 100));
      },
      source.token,
    )
      .then(async (file) => {
        onSuccess(uid, file, file);
      })
      .catch((error) => {
        onError(uid, {
          action,
          status: error.request,
          response: error.response,
        });
      });

    return {
      abort: () => {
        source.cancel();
      },
    };
  };

  const handleChange = (images: any) => {
    props.form.setFieldValue(
      props.field.name,
      images.filter((image: any) => !image.uploading).map((image: any) => image.id),
    );
  };

  return (
    <div className={css.wrapper}>
      {props.label ? <Label htmlFor={props.field.name}>{props.label}</Label> : null}
      <RUG
        ssrSupport
        className={css.gallery}
        customRequest={handleUpload}
        initialState={props.initialState}
        header={({ openDialogue }: any) => (
          <DropArea>
            {(isDrag: boolean) => (
              <div
                tabIndex={-1}
                onClick={openDialogue}
                role="button"
                className={clsx({
                  [css.area]: true,
                  [css.isDragging]: isDrag,
                })}>
                <div className={css.caption}>Kliknij tutaj, lub upuść zdjęcie produktu</div>
              </div>
            )}
          </DropArea>
        )}
        onChange={handleChange}
        source={(file: File) => file.path}
        rules={{
          limit: 10,
          size: 1000,
          width: {
            max: 2500,
          },
          height: {
            max: 2500,
          },
        }}
        accept={['jpg', 'jpeg', 'png']}
        onWarning={(type: string, rules: any) => {
          switch (type) {
            case 'accept':
              window.notyf.error(
                intl.formatMessage(
                  {
                    id: 'form.error.accept',
                  },
                  { formats: rules.accept.join(', ') },
                ),
              );
              break;

            case 'limit':
              window.notyf.error(
                intl.formatMessage(
                  {
                    id: 'form.error.limit',
                  },
                  {
                    limit: rules.limit,
                  },
                ),
              );
              break;

            case 'size':
              window.notyf.error(
                intl.formatMessage(
                  {
                    id: 'form.error.size',
                  },
                  {
                    size: rules.size,
                  },
                ),
              );
              break;

            case 'maxWidth':
              window.notyf.error(
                intl.formatMessage(
                  {
                    id: 'form.error.maxWidth',
                  },
                  {
                    max: rules.width.max,
                  },
                ),
              );
              break;
            case 'maxHeight':
              window.notyf.error(
                intl.formatMessage(
                  {
                    id: 'form.error.maxHeight',
                  },
                  {
                    max: rules.height.max,
                  },
                ),
              );
              break;

            default:
          }
        }}
      />
    </div>
  );
};

export default Gallery;
