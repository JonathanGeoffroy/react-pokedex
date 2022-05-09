import { registerEnumType } from '@nestjs/graphql';
import { Language } from '@react-pokedex/dto';

registerEnumType(Language, {
  name: 'Language',
});

export default Language;

export const DEFAULT_LANGUAGE = Language['en'];
