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
  const valueAndSetter = useState<Language>(Language.En);
  const [language] = valueAndSetter;
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <LanguageContext.Provider value={valueAndSetter}>
      {children}
    </LanguageContext.Provider>
  );
}
