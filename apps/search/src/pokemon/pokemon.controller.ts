import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Language } from '@react-pokedex/dto';
import { EnumQuery, RequiredQuery } from '../decorators';
import { SearchPokemonDto } from '../../../../libs/dto/src/search/search-pokemon.dto';
import { PokemonService } from './pokemon.service';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @ApiOkResponse({
    type: [SearchPokemonDto],
  })
  @ApiQuery({ name: 'term', type: String })
  @ApiQuery({ name: 'lang', enum: Language })
  async searchPokemon(
    @RequiredQuery('term') term: string,
    @EnumQuery({ key: 'lang', type: Language }) lang: Language
  ): Promise<SearchPokemonDto[]> {
    const entities = await this.pokemonService.find(term, lang);
    return plainToClass(SearchPokemonDto, entities);
  }
}
