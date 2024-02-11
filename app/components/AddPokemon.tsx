import React from 'react'
import style from './AddPokemon.module.css'

const AddPokemon = ({ onAdd }) => {
  const handleClick = () => {
    const pokemonName = window.prompt('Enter the name or ID of the Pokemon: ');
    if(pokemonName) {
      onAdd(pokemonName.trim());
    }
  }


  return (
    <div className = {style.addButton}>
        <button onClick= {handleClick}>Add Pokemon</button>
    </div>
  )
}

export default AddPokemon;