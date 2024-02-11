import React from 'react';
import style from './PokemonCard.module.css';
import Link from 'next/link';

const PokemonCard = ({pokemons, deletePokemon}) => {

    
  return (
    <>
      {pokemons.map((pokemon, index) => {
        //url = "https://pokeapi.co/api/v2/pokemon/1/"
        const id = pokemon.id;

        return(
        <div key={index} className={style.pokemonCard}>
          <div className={style.deleteBtn}>
            <button onClick = {() => deletePokemon(index)}></button>
          </div>
          <div className={style.pokemonIcon}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={pokemon.name} />
          </div>
          <div className={style.pokemonName}>
            <Link href = {`/pages/${pokemon.name}`}>
              <h3>{pokemon.name.toUpperCase()}</h3>
            </Link>
          </div>
        </div>
      )})}
    </>
  );
};

export default PokemonCard