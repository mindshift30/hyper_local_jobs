'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { t as translate, Locale } from '@/lib/i18n';

interface I18nContextType {
  locale: Locale;
  t: (key: string) => string;
  toggleLanguage: () => void;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  t: (key) => key,
  toggleLanguage: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const { language, toggleLanguage } = useUIStore();

  const t = (key: string) => translate(key, language);

  return (
    <I18nContext.Provider value={{ locale: language, t, toggleLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
