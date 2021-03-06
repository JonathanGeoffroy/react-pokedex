import { ReactNode, createContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '../__generated/pokeapi.graphql';

type LanguageContextProps = [
  value: Language,
  setter: (Language: Language) => void
];

export const LanguageContext = createContext<LanguageContextProps>(
  undefined as unknown as LanguageContextProps
);

interface LanguageProviderProps {
  children: ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n } = useTranslation();
  const valueAndSetter = useState<Language>(i18n.languages[0] as Language);
  const [language] = valueAndSetter;

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <LanguageContext.Provider value={valueAndSetter}>
      {children}
    </LanguageContext.Provider>
  );
}
