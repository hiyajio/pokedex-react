import React, { useState, useEffect } from 'react';
import Pokecard from './Pokecard';
import { getAllPokemon, getPokemon } from './services/Pokemon';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord;
    }))

    setPokemonData(_pokemonData);
  }

  return (
    <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="https://pokeapi.co/" alt="PokeAPI link" rel="noopener noreferrer "target="_BLANK">Pokedex for Pokemon API</a>
      <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Name of Pokemon" aria-label="Search"
        />
        <button class="btn btn-danger my-2 my-sm-0" type="submit">Search</button>
      </form>
    </nav>
      <div className="App">
        { loading ? <h1>Loading... </h1> : (
          <div>
            <div className="topBtn">
              <button type="button" class="btn btn-outline-danger" onClick={prev}>Previous</button>
              <button type="button" class="btn btn-outline-danger" onClick={next}>Next</button>
            </div>
            <div className="grid-container">
              {pokemonData.map((pokemon, i) => {
                return <Pokecard key={i} pokemon={pokemon}/>
              })}
            </div>
            <div className="botBtn">
              <button type="button" class="btn btn-outline-danger" onClick={prev}>Previous</button>
              <button type="button" class="btn btn-outline-danger" onClick={next}>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
