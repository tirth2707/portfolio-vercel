import { useEffect, useState } from 'react';
import { AudienceModeContext } from './audienceMode';

export const AudienceModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => localStorage.getItem('audienceMode') || 'recruiter');

  useEffect(() => {
    localStorage.setItem('audienceMode', mode);
    document.documentElement.dataset.audience = mode;
  }, [mode]);

  return (
    <AudienceModeContext.Provider value={{ mode, setMode }}>
      {children}
    </AudienceModeContext.Provider>
  );
};
