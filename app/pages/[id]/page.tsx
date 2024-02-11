"use client";
import React, { useEffect, useState } from 'react'
import style from './pokemonInfo.module.css'
import Link from 'next/link';


const PokemonInfo = () => {

  const linkName = window.location.pathname.split('/').at(-1);
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editedName, setEditedName] = useState(null);

  const editPokemonName = () => {
    const newName = prompt('Enter new name: ')
    

    if (newName) {
      const capitalizedNewName = newName.charAt(0).toUpperCase() + newName.slice(1)
      setEditedName(capitalizedNewName);
      const localData = localStorage.getItem('pokemons');
      const pokemons = localData ? JSON.parse(localData) : [];
      const updatedPokemons = pokemons.map(pokemon => {
        if (pokemon.name === linkName) {
          return {...pokemon, name: capitalizedNewName};
        }
        return pokemon;
      });
      localStorage.setItem('pokemons', JSON.stringify(updatedPokemons));
    }
  }




  const fetchPokemonData = () => {
    const localData = localStorage.getItem('pokemons');
    const pokemons = localData ? JSON.parse(localData): null;
    const data = pokemons && linkName ? pokemons.find(pokemon => pokemon.name === linkName) : null;
    setPokemonData(data);
    setIsLoading(false);
    
  }


  useEffect(() => {    
    fetchPokemonData();
    }, [linkName]);
    
    //console.log(pokemonData);

  return (
    <>
      {!isLoading && pokemonData ? (
        <div className = {style.background}>
        <div className = {style.top}>
          <div className = {style.backButton}>
                <Link href = "../">
                  <img src = "/images/Vectorbackbutton.svg"></img>
                </Link>
          </div>
          <div className={style.pokemonIcon}>
            <img src={pokemonData.sprites.other['official-artwork'].front_default}></img>
          </div>
        </div>
        <div className = {style.bottom}>
          <div className={style.editButton}>
            <button onClick = {editPokemonName}><img src = "/images/editbutton.svg"></img></button>
          </div>
          <div className = {style.pokemonName}>
            <h1>{editedName || pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h1>
          </div>
          <div className={style.types}>
            <div className={style.label}>
              <h3>TYPES</h3>
            </div>
            <div className={style.items}>
              {pokemonData.types.map((pokemonType, index: number)=>
                <h3 key = {index}>{pokemonType.type.name}</h3>
              )}
   
            </div>
          </div>
          <div className={style.abilities}>
            <div className={style.label}>
              <h3>ABILITIES</h3>
            </div>
            <div className={style.items}>
              {pokemonData.abilities.map((pokemonAbility, index: number)=>
                <h3 key = {index}>{pokemonAbility.ability.name}</h3>
              )}
            </div> 
          </div>
          <div className = {style.stats}>
            <div className={style.title}>
              <h3>STATS</h3>
            </div>
            <div className = {style.statBox}>
              <h3><b>HP:</b> {pokemonData.stats.at(0).base_stat}</h3>
              <h3><b>SP Attack:</b> {pokemonData.stats.at(3).base_stat}</h3>
              <h3><b>Attack:</b> {pokemonData.stats.at(1).base_stat}</h3>
              <h3><b>SP Defense:</b> {pokemonData.stats.at(4).base_stat}</h3>
              <h3><b>Defense:</b> {pokemonData.stats.at(2).base_stat}</h3>
              <h3><b>Speed:</b> {pokemonData.stats.at(5).base_stat}</h3>
            </div>
          </div>
        </div>
      </div>
      ):(
        <div>Loading</div>
      )}
      
    </>
  )
}

export default PokemonInfo;