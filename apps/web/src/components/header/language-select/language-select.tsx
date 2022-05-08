import { Select } from '@react-pokedex/ui';
import { Item } from '@react-stately/collections';
import { useContext } from 'react';
import { LanguageContext } from '../../../app/language-provider';
import { Language } from '../../../__generated/pokeapi.graphql';
import './language-select.module.scss';

const LANGUAGES = [
  {
    label: 'English',
    value: Language.En,
  },
  {
    label: 'Español',
    value: Language.Es,
  },
  {
    label: 'Français',
    value: Language.Fr,
  },
];

export function LanguageSelect() {
  const [language, setLanguage] = useContext(LanguageContext);
  return (
    <Select
      selectedKey={language}
      onSelectionChange={(key) => setLanguage(key as Language)}
      className="w-32"
      aria-label="Language"
      aria-labelledby="Language"
      data-testid="language-select"
    >
      {LANGUAGES.map((lang) => (
        <Item data-testid={`language-select-${lang.value}`} key={lang.value}>
          {lang.label}
        </Item>
      ))}
    </Select>
  );
}

export default LanguageSelect;
