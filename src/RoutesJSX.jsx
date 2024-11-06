import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { PokemonList } from './pages/pokemonList.js';
import { PokemonDetail } from './pages/pokemonDetail.js';

const RoutesJSX = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PokemonList />} />
        <Route path='/pokemon/:idPokemon' element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default RoutesJSX;