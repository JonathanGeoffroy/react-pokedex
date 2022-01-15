import './header.module.scss';
import { TopBar } from '@react-pokedex/ui';

export function Header() {
  return (
    <TopBar kind="primary">
      <h1>React-Pokedex</h1>
    </TopBar>
  );
}

export default Header;
