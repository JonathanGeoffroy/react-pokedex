import { registerEnumType } from '@nestjs/graphql';

enum Language {
  'ko' = 'ko',
  'fr' = 'fr',
  'de' = 'de',
  'es' = 'es',
  'it' = 'it',
  'en' = 'en',
  'cs' = 'cs',
  'ja' = 'ja',
}

registerEnumType(Language, {
  name: 'Language',
});

export default Language;

export const DEFAULT_LANGUAGE = Language['en'];
