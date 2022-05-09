import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Language } from '@react-pokedex/dto';

export type PokemonDocument = Pokemon & Document;

@Schema()
export class Pokemon {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ type: String, required: true })
  lang: Language;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
PokemonSchema.index({ id: 1, lang: 1 }, { unique: true });
