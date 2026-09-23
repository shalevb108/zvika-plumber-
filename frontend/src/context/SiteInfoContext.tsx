import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { SiteInfo } from '../types';
import { getSiteInfo } from '../services/api';

// Fallback values mirror the backend SiteInfo schema defaults, so the site
// renders correctly even before the API responds (or if it fails).
export const defaultSiteInfo: SiteInfo = {
  phone: '054-775-5054',
  whatsapp: '972547755054',
  email: 'zvika@plumber.co.il',
  address: 'אשקלון, ישראל',
  city: 'אשקלון',
  businessHours: 'ראשון-חמישי 07:00-20:00, שישי 07:00-14:00',
  heroTitle: 'צביקה סופר - אינסטלטור מקצועי',
  heroSubtitle: 'שירות מהיר, אמין ומקצועי באשקלון והדרום',
  aboutText:
    'אני צביקה סופר, אינסטלטור מוסמך עם ניסיון של מעל 20 שנה בתחום האינסטלציה. אני מספק שירות מקצועי, אמין ומהיר לבתים, עסקים ומפעלים באשקלון וכל אזור הדרום.',
  licenseNumber: '12345',
  yearsExperience: 20,
  projectsCompleted: 1500,
  happyClients: 1200,
};

const SiteInfoContext = createContext<SiteInfo>(defaultSiteInfo);

export function SiteInfoProvider({ children }: { children: ReactNode }) {
  const [info, setInfo] = useState<SiteInfo>(defaultSiteInfo);

  useEffect(() => {
    getSiteInfo()
      .then((data) => {
        // Merge over defaults so any missing field keeps a sensible fallback.
        if (data) setInfo({ ...defaultSiteInfo, ...data });
      })
      .catch(() => {});
  }, []);

  return <SiteInfoContext.Provider value={info}>{children}</SiteInfoContext.Provider>;
}

export function useSiteInfo() {
  return useContext(SiteInfoContext);
}
