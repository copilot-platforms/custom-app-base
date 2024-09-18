'use client';

import React, { useEffect } from 'react';

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

  useEffect(() => {
    const ngrokUrl = getCookie('ngrokUrl');
    console.log({ ngrokUrl });
  }, []);
  return null;
};

export default EmbeddedDevOrchestrator;
