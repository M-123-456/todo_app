import React from 'react'

type Props = {
    className: string;
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>
}

const Search = (props: Props) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setSearchInput(e.target.value)
  }

  return (
    <div
        className={props.className}
    >
        <input 
          className="focus:outline-none"
          type="text" 
          placeholder="input name to search"
          value={props.searchInput}
          onChange={handleChange}
        />
    </div>
  )
}

export default Search