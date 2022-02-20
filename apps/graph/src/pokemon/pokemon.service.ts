import { Injectable } from '@nestjs/common';
import { RESTDataSource } from 'apollo-datasource-rest';
import { InMemoryLRUCache } from 'apollo-server-caching';
import { PokemonListDTO } from './pokemon-list.dto';
import { PokemonDetailsDTO } from './pokemon-details.dto';
import { PokemonListArgs } from './pokemon-list.args';

@Injectable()
export class PokemonService extends RESTDataSource {
  constructor() {
    super();
    this.initialize({ context: {}, cache: new InMemoryLRUCache() });
    this.baseURL = 'https://pokeapi.co/api/v2/pokemon/';
  }

  async list({
    limit = 20,
    offset = 0,
  }: PokemonListArgs): Promise<PokemonListDTO> {
    return this.get<PokemonListDTO>('', {
      limit,
      offset,
    });
  }

  async findDetails(id: number): Promise<PokemonDetailsDTO> {
    return this.get<PokemonDetailsDTO>(id.toString());
  }
}
