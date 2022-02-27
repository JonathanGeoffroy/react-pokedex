import { useCallback, useContext } from 'react';
import { PokemonTypeEnum } from '../__generated/pokeapi.graphql';
import { ColorContext } from './color-provider';
import colors, { ByTypeKey } from './colors';

export default function useColor() {
  const [color, setColor] = useContext(ColorContext);

  const setColorType = useCallback(
    (type: ByTypeKey) => {
      setColor(colors[type]);
    },
    [setColor]
  );

  return { color, setColorType };
}
