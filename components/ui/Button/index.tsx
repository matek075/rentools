// Generated with util/create-component.js
import React from 'react';
import clsx from 'clsx';
import { faSpinnerThird } from '@fortawesome/pro-solid-svg-icons/faSpinnerThird';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import css from './styles.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  innerRef?: React.Ref<HTMLButtonElement | HTMLAnchorElement>;
  loading?: boolean;
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'quaternary'
    | 'gray'
    | 'link'
    | 'link-red'
    | 'link-white'
    | 'link-primary'
    | 'link-secondary'
    | 'navbar';
  block?: boolean;
  as?: 'a' | 'button' | 'span' | 'div' | 'li' | React.FunctionComponent<any>;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  target?: '_self' | '_blank';
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  round?: boolean;
  shadowed?: boolean;
  iconSize?: number;
  [id: string]: any;
}

const LoadingIcon = (
  <div className={css.loadingOverlay}>
    <FontAwesomeIcon icon={faSpinnerThird} className={css.loadingIcon} />
  </div>
);

const Button: React.FC<ButtonProps> = React.forwardRef(
  (
    {
      innerRef,
      loading = false,
      color = 'primary',
      children,
      block,
      size = 'lg',
      shadowed,
      as = 'button', // Test
      href, // Test href
      icon,
      iconPosition = 'left',
      iconSize = 16,
      round,
      disabled = false,
      className,
      ...otherProps
    },
    ref,
  ) => {
    const classes = clsx(className, {
      [css.button]: true,
      [css[color || 'primary']]: true,
      [css.block]: block,
      [css.round]: round,
      [css.md]: size === 'md',
      [css.sm]: size === 'sm',
      [css.disabled]: disabled,
      [css.shadowed]: !!shadowed,
      [css.loading]: loading,
    });

    const Component = as || 'button';

    const iconClasses = clsx({
      [css.buttonIcon]: true,
      [css.left]: iconPosition === 'left',
      [css.right]: iconPosition === 'right',
    });

    const iconComponent = (
      <span className={iconClasses} style={{ width: `${iconSize}px`, height: `${iconSize}px` }}>
        {icon}
      </span>
    );

    return (
      <Component
        data-testid="button"
        href={href}
        ref={(innerRef ? innerRef : ref) as any}
        className={classes}
        color={color}
        disabled={disabled || loading}
        {...(otherProps as any)}>
        {loading && LoadingIcon}
        {icon && iconPosition === 'left' ? iconComponent : undefined}
        {children}
        {icon && iconPosition === 'right' ? iconComponent : undefined}
      </Component>
    );
  },
);

export default Button;
