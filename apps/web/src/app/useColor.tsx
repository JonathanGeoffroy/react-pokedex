import { useCallback, useContext, useMemo } from 'react';
import { ColorContext } from './color-provider';
import colors, { PokemonType } from './colors';

export default function useColor() {
  const [color, setColor] = useContext(ColorContext);

  const setColorType = useCallback(
    (type: PokemonType) => {
      setColor(colors[type]);
    },
    [setColor]
  );

  return { color, setColorType };
}
