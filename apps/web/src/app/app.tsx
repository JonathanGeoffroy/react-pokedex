import Header from '../components/header/header';
import './app.module.scss';
import GraphQLProvider from './graphql';
import Router from './router';

export function App() {
  return (
    <GraphQLProvider>
      <Header />
      <Router />
    </GraphQLProvider>
  );
}

export default App;
