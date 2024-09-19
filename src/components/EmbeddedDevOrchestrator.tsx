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

  const [ngrokUrl, setNgrokUrl] = useState('');

  useEffect(() => {
    const url = getCookie('ngrokUrl');
    if (url) {
      setNgrokUrl(url);
    }
  }, []);

//   function iniFrame() {
//     if (window.location !== window.parent.location) {
//         // The page is in an iFrame
//         console.log('im in a frame')
//     }
//     else {
//         // The page is not in an iFrame
//         console.log("The page is not in an iFrame");
//     }
// }

// iniFrame()


  return (
    <div>
      <a
        href={`http://localhost:3000/dev-mode?appId=02f36b50-91ce-4107-8f78-4eadc28eb38c&url=${encodeURIComponent(
          ngrokUrl,
        )}`}
        className="border-2 border-black rounded-md px-4 py-2 fixed bottom-4 right-4"
      >
        Dev Mode
      </a>
    </div>
  );
};

export default EmbeddedDevOrchestrator;
