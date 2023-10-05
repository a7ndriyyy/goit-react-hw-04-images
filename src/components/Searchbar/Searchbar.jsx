import {useState } from 'react';
import css from './searchbar.module.css';
const Searchbar = props => {
  const [searchValue,setSearchValue] = useState('');
 
  const handleChange = event => {
    setSearchValue(event.target.value);
    };
     const  handleSubmit = event => {
    event.preventDefault();
    props.onSubmit(searchValue);
    };
    
        return (
            <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}></span>
          </button>
          <input
            name="search"
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchValue}
            onChange={handleChange}
          />
        </form>
      </header>
        );
    }

export default Searchbar;