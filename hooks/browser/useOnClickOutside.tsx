import React from 'react';

const useOnClickOutside = (ref: React.MutableRefObject<any>, handler: (event: MouseEvent) => void) => {
  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
