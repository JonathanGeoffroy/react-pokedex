import { ReactNode, createContext, useState } from 'react';
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

  return (
    <LanguageContext.Provider value={valueAndSetter}>
      {children}
    </LanguageContext.Provider>
  );
}
