// Generated with util/create-component.js

export type DropdownOrientation = 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right';

export interface DropdownProps {
  orientation?: DropdownOrientation;
  subMenu?: {
    left: number;
    right: number;
    width: number;
    height: number;
  };
  hover?: boolean;
  className?: string;
}
