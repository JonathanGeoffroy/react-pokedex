import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as sanitize from 'mongo-sanitize';
import { Language } from '../enum/language';
import { Pokemon, PokemonDocument } from './pokemon.model';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>
  ) {}

  async find(term: string, language = Language.en): Promise<Pokemon[]> {
    const name = sanitize(term);
    const lang = sanitize(language);

    return this.pokemonModel
      .find({
        name: { $regex: `.*${name}.*`, $options: 'i' },
        lang,
      })
      .exec();
  }
}
