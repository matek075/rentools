import React from 'react';
import Link from 'next/link';
import { faCircle } from '@fortawesome/pro-regular-svg-icons/faCircle';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons/faCheckCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import Button from 'components/ui/Button';

import css from '../../styles.module.scss';

interface OwnProps {
  title: string;
  description: string;
  completed?: boolean;
  actionLink: string;
  actionName: string;
}

const CompletionPoint: React.FC<OwnProps> = (props) => {

  return (
    <div className={clsx(css.point, { [css.completed]: props.completed })}>
      <div className={css.icon}>
        {
          props.completed ?
            <FontAwesomeIcon icon={faCheckCircle} />
            : <FontAwesomeIcon icon={faCircle} />
        }
      </div>
      <div className={css.text}>
        <div className={css.title}>
          { props.title }
          <div className={css.action}>
            <Link href={props.actionLink}>
              <Button color="link-secondary" as="a" size="sm">{ props.actionName }</Button>
            </Link>
          </div>
        </div>
        <div className={css.description}>{ props.description }</div>
      </div>
    </div>
  )
}

export default CompletionPoint;
