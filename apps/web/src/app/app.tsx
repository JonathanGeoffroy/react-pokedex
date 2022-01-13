import './app.module.scss';
import { Button } from '@react-pokedex/ui';

export function App() {
  return (
    <>
      <h1>Welcome web</h1>
      <Button kind="primary">Primary</Button>
      <Button kind="secondary">Secondary</Button>
      <Button>Default</Button>

      <div style={{ width: 120, height: 120 }} className="bg-primary-500 text-primary-complementary" />
    </>
  );
}

export default App;
