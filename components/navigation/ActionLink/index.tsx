import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import css from './styles.module.scss';

interface OnClickProps extends CommonProps {
  onClick: () => void;
}

interface HrefProps extends CommonProps {
  href: string;
  target?: '_blank' | '_self';
}

interface CommonProps {
  className?: string;
}

const ActionLink: React.FC<OnClickProps | HrefProps> = (props) => {
  const isLink = (props: OnClickProps | HrefProps): props is HrefProps =>
    // @ts-ignore
    props.href;

  if (isLink(props)) {
    return (
      <Link href={props.href}>
        <a
          target={props.target}
          className={clsx({
            [css.link]: true,
            [props.className || '']: !!props.className,
          })}>
          {props.children}
        </a>
      </Link>
    );
  }

  return (
    <a
      role="button"
      tabIndex={0}
      onClick={props.onClick}
      className={clsx({
        [css.link]: true,
        [props.className || '']: !!props.className,
      })}>
      {props.children}
    </a>
  );
};

export default ActionLink;
