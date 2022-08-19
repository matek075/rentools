import React from 'react';
import clsx from 'clsx';
import { faTimes } from '@fortawesome/pro-regular-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import css from './styles.module.scss';

interface OwnProps {
  open: boolean;
  onClose: () => void;
  closable?: boolean;
}

const Modal: React.FC<OwnProps> = ({ open, onClose, closable = true, children }) => {
  // React.useEffect(() => {
  //   if (open) {
  //     document.body.classList.add("stopScrolling");
  //   } else {
  //     document.body.classList.remove("stopScrolling");
  //   }
  //
  //   return () => {
  //     document.body.classList.remove("stopScrolling");
  //   };
  // }, [open]);

  return (
    <div
      className={clsx({
        [css.overlay]: true,
        [css.open]: open,
      })}>
      <div className={css.modal}>
        <div className={css.content}>
          {closable && (
            <div className={css.close} role="button" tabIndex={-1} onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
