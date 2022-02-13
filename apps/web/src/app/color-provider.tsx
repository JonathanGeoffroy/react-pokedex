import classNames from 'classnames';
import { createContext, ReactNode, useState } from 'react';
import colors, { Color } from './colors';

type ColorContextProps = [value: Color, setter: (color: Color) => void];

export const ColorContext = createContext<ColorContextProps>(
  undefined as unknown as ColorContextProps
);

interface ColorProviderProps {
  children: ReactNode;
}

export default function ColorProvider({ children }: ColorProviderProps) {
  const valueAndSetter = useState<Color>(colors.normal);

  return (
    <ColorContext.Provider value={valueAndSetter}>
      <div className={classNames('min-h-screen min-w-screen', valueAndSetter[0].background)}>{children}</div>
    </ColorContext.Provider>
  );
}
