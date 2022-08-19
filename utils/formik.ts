import { AxiosError } from 'axios';

import { FormikHelpers } from 'formik';

export interface ErrorResponse {
  error: 'string';
  message: ErrorMessage[] | string;
  statusCode: number;
}

export interface ErrorMessage {
  value: string;
  property: string;
  messages: string[];
}

const isAxiosError = (exception: any): exception is AxiosError<ErrorResponse> => {
  return exception && exception.isAxiosError;
};

const isErrors = (errors: any): errors is ErrorMessage[] => {
  return Array.isArray(errors);
};

export const applyErrors = (exception: any, helpers: FormikHelpers<any>): void => {
  if (!isAxiosError(exception)) {
    return;
  }

  const message = exception.response?.data.message;

  if (typeof message === 'string') {
    window.notyf.error(message);
    return;
  }

  if (isErrors(message)) {
    message.forEach((error) => {
      error.messages.forEach((message) => {
        console.log('???', message);
        helpers.setFieldError(error.property, message);
      });
    });
  }
};
