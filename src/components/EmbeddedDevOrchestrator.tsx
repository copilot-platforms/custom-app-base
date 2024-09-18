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

  useEffect(() => {
    const ngrokUrl = getCookie('ngrokUrl');
    console.log({ ngrokUrl });
  }, []);

  return (
    <div>
      <button>I am a button</button>
    </div>
  );
};

export default EmbeddedDevOrchestrator;
