import { Injectable } from '@nestjs/common';
import { RESTDataSource } from 'apollo-datasource-rest';
import { InMemoryLRUCache } from 'apollo-server-caching';
import { PokemonSpeciesDTO } from './pokemon-species.dto';

@Injectable()
export class PokemonSpeciesService extends RESTDataSource {
  constructor() {
    super();
    this.initialize({ context: {}, cache: new InMemoryLRUCache() });
    this.baseURL = 'https://pokeapi.co/api/v2/pokemon-species/';
  }

  async findById(id: number): Promise<PokemonSpeciesDTO> {
    return this.get<PokemonSpeciesDTO>(id.toString());
  }
}
