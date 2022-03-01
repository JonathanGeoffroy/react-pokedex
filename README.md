

# React-Pokedex

React-Pokedex is an educational project offering a way to _test and experiment_ whatever I want.  
In particular, you may feel that some parts could be overkill to you : it's because we favor experimentations and learning instead of "traditional" architecture.

## Technologies

### Mono-repository

React-Pokedex uses [Nx](https://nx.dev/) as monorepo system.  
As an effort to learn it, we try to use some of best features of Nx, such as [custom commands](https://nx.dev/executors/run-commands-builder).

### GraphQL

React-pokedex eavily uses GraphQL technology : 
 * An NestJS (Apollo) graphql server is responsible for providing an easier mapping model to [Poke-Api](https://pokeapi.co/)

> [Poke-Api](https://pokeapi.co/) also offers a great GraphQL endpoint ; we created our own for educational purpose only, but we recommend to use [Poke-API Graphql](https://pokeapi.co/docs/v2) endpoint for any other project.

 * A [React-Apollo client](https://www.apollographql.com/docs/react/), included in our web front-end

 > We plan to use [@defer](https://www.apollographql.com/blog/community/backend/introducing-defer-in-apollo-server/) feature as soon it's ready in Apollo.

### Front-End
 * As its name suggest, React-Pokedex eavily use [ReactJS](https://reactjs.org/) for its website. 

 > We plan to turn this website into a PWA, including smart caching and disconected mutations.

#### Accessibility

We aim to make this pokedex accessible for everybody. This includes vision, auditory, motor, and cognitive disabilities.
This is the reason why we chose to use (React-Aria)[https://react-spectrum.adobe.com/react-aria/].

In particular, we plan to : 
 * Offer a theme accessible for vision disabilities, yet as colorful as possible,
 * Handle keyboard navigation,
 * Take care about screen-readers.
 * Enable internationalization.


### CI / CD

React-Pokedex uses automatic [Github Actions](https://github.com/features/actions) in order to build, test, and (soon) deploy on [Heroku](https://www.heroku.com/).

## Contributing

Want to be part of this project ? Any help is of course welcome ; we accept any kind of fixes / features / docs / ... as soon as :  
 * it works (including CI and deployment),
 * it remains as inclusive and accessible as possible (and follows our [Code of conduct]()),
 * it's free for everybody (so no licence should be necessary),
 * it complies to our dependencies code-of-conduct (especially [poke-api fair-policy](https://pokeapi.co/docs/v2#fairuse))

Please read our [contributing guide](./CONTRIBUTING.md) and our [code of conduct](./CODE_OF_CONDUCT.MD) for more information.

### What if I expect something else ? 

We won't accept any issue / pull request which doesn't comply our goals or code of conduct.  
If you expect something else, feel free to [fork this repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo) and enjoy freedom :)