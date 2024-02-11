import React from 'react'
import style from './SearchBar.module.css'

const SearchBar = ({onChange}) => {
  return (
    <>
      <div className={style.searchbar}>
        <input type="search" placeholder="Search Pokemon" onChange = {onChange} />        
      </div>
    </>
  )
}

export default SearchBar