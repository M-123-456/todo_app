import React from 'react'

type Props = {
    className: string;
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>
}

const Search = (props: Props) => {
  
  const handleChange = (e: React.BaseSyntheticEvent<Event, EventTarget & HTMLInputElement, EventTarget>) => {
    // !
    props.setSearchInput('input')
  }

  return (
    <div
        className={props.className}
    >
        <input 
            type="text" 
            placeholder="input name to search"
            value={props.searchInput}
            onChange={handleChange}
        />
    </div>
  )
}

export default Search