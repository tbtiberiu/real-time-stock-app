import React, { useState, useEffect } from 'react'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  symbol: string
  setSymbol: React.Dispatch<React.SetStateAction<string>>
  error: string | null
}

const SearchBar: React.FC<SearchBarProps> = ({ symbol, setSymbol, error }) => {
  const [inputValue, setInputValue] = useState(symbol)

  useEffect(() => {
    setInputValue(symbol)
  }, [symbol])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) {
        setSymbol(inputValue)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [inputValue, setSymbol])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toUpperCase())
  }

  const handleSearchClick = () => {
    if (inputValue) {
      setSymbol(inputValue)
    }
  }

  return (
    <div className={styles.searchBarContainer}>
      <input
        className={`${styles.searchInput} ${error ? styles.error : ''}`}
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter stock symbol"
      />
      <button className={styles.searchButton} onClick={handleSearchClick}>
        Search
      </button>
    </div>
  )
}

export default SearchBar
