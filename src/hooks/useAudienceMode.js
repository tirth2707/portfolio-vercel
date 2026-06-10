import { useContext } from 'react';
import { AudienceModeContext } from '../contexts/audienceMode';

export const useAudienceMode = () => {
  const context = useContext(AudienceModeContext);
  if (!context) {
    throw new Error('useAudienceMode must be used within an AudienceModeProvider');
  }
  return context;
};
