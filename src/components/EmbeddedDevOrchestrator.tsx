'use client';

import React, { useEffect, useState } from 'react';

const EmbeddedDevOrchestrator: React.FC = () => {
  const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  let ngrokUrl: string | null = ''

  const [devEnabled, setDevEnabled] = useState(false);

  useEffect(() => {
    ngrokUrl = getCookie('ngrokUrl');
    console.log({ ngrokUrl });
  }, []);

  const handleClick = () => {
    if (devEnabled === false) {
      setDevEnabled(true);
      console.log(`dev mode enabled`);
      window.parent.postMessage({
        enabled: true,
        type: 'dev.mode',
        url: ngrokUrl,
      });
    } else {
      setDevEnabled(false);
      console.log('dev mode disabled');
      window.parent.postMessage({
        enabled: false,
        type: 'dev.mode',
        url: ngrokUrl,
      });
    }
  };

  return (
    <div>
      <button
        className="border-2 border-black rounded-md px-4 py-2 fixed bottom-4 right-4"
        onClick={handleClick}
      >
        Dev Mode
      </button>
    </div>
  );
};

export default EmbeddedDevOrchestrator;
