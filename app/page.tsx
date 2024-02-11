"use client"
import axios from "axios";
import { axiosClient } from "./axios";
import React, { useState, useEffect } from 'react';
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import AddPokemon from "./components/AddPokemon"
import PokemonCard from "./components/PokemonCard";
import style from "./Home.module.css"

interface Pokemon{
  name: string;
  url: string;
}


export default function Home() {
  
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');


  const fetchPokemons = async () => {
    try {
        //"https://pokeapi.co/api/v2/"
        const response = await axiosClient.get('pokemon');
        const data = response.data.results;
        //console.log(data);
        data.map((id) => {
          handleAddPokemon(id.url.split('/').at(-2));
        })
        setPokemons(data);
        
    } catch (error) {
    console.error('Error fetching pokemons:', error);
    }   
  };

  const fetchAndSetPokemons = async () => {
    const storedPokemons = localStorage.getItem('pokemons');

    if (storedPokemons && JSON.parse(storedPokemons).length > 0) {
      setPokemons(JSON.parse(storedPokemons));
    } else {
      fetchPokemons();
    }
  }


    useEffect(() => {    
    fetchAndSetPokemons();
    }, []);


  const handleAddPokemon = async(pokemonName : string) => { // ADD POKEMONS
    try{
      const response = await axiosClient.get(`pokemon/${pokemonName.toLowerCase()}`);
      const {id, abilities, name, stats, sprites, types} = response.data;
      const pokemonData = {id, abilities, name, stats, sprites, types};
      console.log(pokemonData);

      const existingPokemons = JSON.parse(localStorage.getItem('pokemons') || '[]');
      const pokemonExists = existingPokemons.some((pokemon) => pokemon.id === id);

      if (!pokemonExists) {
        
        existingPokemons.push(pokemonData);
        localStorage.setItem('pokemons', JSON.stringify(existingPokemons));
        setPokemons(existingPokemons);
      }
     
    } catch (error) {
      console.error('Error fetching pokemon:', error);
    }
  }

  const deletePokemon = (index: number) => { //DELETE POKEMONS
    const updatedPokemons = [...pokemons];
    updatedPokemons.splice(index, 1);
    localStorage.setItem('pokemons', JSON.stringify(updatedPokemons));
    setPokemons(updatedPokemons);
    console.log(pokemons);
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
  <>
    <div className = {style.top} >
      <Header />
      <SearchBar onChange = {handleSearchChange} />
      <AddPokemon onAdd = {handleAddPokemon} />
    </div>
    <div className ={style.bottom}>
      <PokemonCard pokemons = {filteredPokemons} deletePokemon = {deletePokemon}/>
    </div>
  </>
  );
}
