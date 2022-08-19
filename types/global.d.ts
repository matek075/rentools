import { Notyf } from 'notyf';

declare global {
  interface Window {
    notyf: Notyf;
  }
}
