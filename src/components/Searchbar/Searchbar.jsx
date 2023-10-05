import { Component } from 'react';
import css from './searchbar.module.css';
 class Searchbar extends Component {
    state = {
        searchValue: '',
    };

    handleChange = event => {
        this.setState({ searchValue: event.target.value });
    };
      handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchValue);
    };
    render() {
        return (
            <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
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
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
        );
    }
}
export default Searchbar;