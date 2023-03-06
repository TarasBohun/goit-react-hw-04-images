import { Component } from 'react';
import { toast } from 'react-hot-toast';

import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = { value: '' };

  handleChange = ({ target: { value } }) => {
    // this.setState({ value: e.currentTarget.value });
    this.setState({ value });
  };

  handleSubmit = e => {
    const { value } = this.state;
    e.preventDefault();

    if (!value) {
      return toast.error('Please, enter your request!');
    }
    this.props.onSearch(value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
