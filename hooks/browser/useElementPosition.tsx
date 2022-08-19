import React from 'react';

export interface ElementPosition {
  left: number | null;
  top: number | null;
  right: number | null;
  bottom: number | null;
  width: number | null;
  height: number | null;
}

const useElementPosition = (ref: React.MutableRefObject<HTMLElement | null>): ElementPosition => {
  const [position, setPosition] = React.useState<ElementPosition>({
    left: null,
    top: null,
    right: null,
    bottom: null,
    width: null,
    height: null,
  });
  const [scrollTimeout, setScrollTimeout] = React.useState<any>(undefined);

  React.useEffect(() => {
    const updateScrollPosition = () => {
      if (!ref.current) {
        setPosition({
          width: null,
          height: null,
          bottom: null,
          left: null,
          right: null,
          top: null,
        });
        return;
      }

      const rect = ref.current.getBoundingClientRect();

      setPosition({
        left: rect.left,
        bottom: rect.bottom,
        top: rect.top,
        right: rect.right,
        width: rect.width,
        height: rect.height,
      });
    };

    updateScrollPosition();

    const isAndroid = /(android)/i.test(navigator.userAgent);

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    setScrollTimeout(
      setTimeout(
        () => {
          updateScrollPosition();
        },
        isAndroid ? 1000 : 300,
      ),
    );

    document.addEventListener('scroll', updateScrollPosition);
    window.addEventListener('resize', updateScrollPosition);

    return () => {
      document.removeEventListener('scroll', updateScrollPosition);
      window.removeEventListener('resize', updateScrollPosition);
      clearTimeout(scrollTimeout);
      setScrollTimeout(undefined);
    };
  }, [ref.current, setPosition]);

  return position;
};

export default useElementPosition;
