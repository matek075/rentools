import React from 'react';
import TagManager from 'react-gtm-module';

import Settings from 'settings';

const ScriptLoader: React.FC = () => {
  const isLoaded = () => {
    return !!document.querySelector('#external_scripts');
  };

  const setLoaded = () => {
    const element = document.createElement('div');
    element.style.display = 'none';
    element.id = 'external_scripts';
    document.body.append(element);
  };

  const removeMouseEvent = () => {
    document.removeEventListener('mousemove', dispatchEvent);
    document.removeEventListener('touchstart', dispatchEvent);
  };

  const dispatchEvent = () => {
    setLoaded();
    removeMouseEvent();
    setTimeout(() => {
      const event = new Event('external_scripts');
      document.dispatchEvent(event);
      TagManager.initialize({ gtmId: Settings.GTM_KEY });
    }, 500);
  };

  const addMouseEvent = () => {
    document.addEventListener('mousemove', dispatchEvent);
    document.addEventListener('touchstart', dispatchEvent);
  };

  const docReady = (fn: () => void) => {
    // see if DOM is already available
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // call on next available tick
      setTimeout(fn, 1);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  };

  React.useEffect(() => {
    if (!isLoaded()) {
      docReady(addMouseEvent);
    }

    return () => {
      removeMouseEvent();
    };
  }, []);

  return null;
};

export default ScriptLoader;
