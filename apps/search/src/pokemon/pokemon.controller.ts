import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { EnumQuery, RequiredQuery } from '../decorators';
import { Language } from '../enum/language';
import { PokemonDto } from './pokemon.dto';
import { PokemonService } from './pokemon.service';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @ApiOkResponse({
    type: [PokemonDto],
  })
  @ApiQuery({ name: 'term', type: String })
  @ApiQuery({ name: 'lang', enum: Language })
  async searchPokemon(
    @RequiredQuery('term') term: string,
    @EnumQuery({ key: 'lang', type: Language }) lang: Language
  ): Promise<PokemonDto[]> {
    const entities = await this.pokemonService.find(term, lang);
    return plainToClass(PokemonDto, entities);
  }
}
