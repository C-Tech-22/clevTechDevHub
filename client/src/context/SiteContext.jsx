import { createContext, useContext, useEffect, useState } from 'react';
import { getSettings } from '../services/miscService';

const defaultSettings = {
  companyName: 'ClevTech DevHub',
  tagline: 'Building Digital Products That Move Businesses Forward.',
  email: 'hello@clevtechdevhub.com',
  phone: '',
  whatsapp: '',
  socialLinks: {},
};

const SiteContext = createContext(null);

export const SiteProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings()
      .then(setSettings)
      .catch(() => setSettings(defaultSettings))
      .finally(() => setLoading(false));
  }, []);

  return <SiteContext.Provider value={{ settings, setSettings, loading }}>{children}</SiteContext.Provider>;
};

export const useSite = () => useContext(SiteContext);
