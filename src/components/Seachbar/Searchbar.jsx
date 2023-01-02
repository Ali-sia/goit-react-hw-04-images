import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  SearcHeader,
  SearchForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';

const Searchbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    //записати значення запиту в локальний стейт
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    //перевірити запит на пустоту
    if (searchQuery.trim() === '') {
      return alert('Enter query');
    }
    //передати значення запиту через пропси в апп
    onSearch(searchQuery);

    //очистити форму від старого запиту
    setSearchQuery('');
  };

  return (
    <SearcHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <span>Search</span>
        </SearchButton>

        <SearchInput
          type="text"
          name="searchQuery"
          value={searchQuery}
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </SearcHeader>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  searchQuery: PropTypes.string,
};
// export default class Searchbar extends Component {
//   static propTypes = {
//     searchQuery: PropTypes.string,
//   };

//   state = {
//     searchQuery: '',
//   };

//   //-> при зміні значення в інпуті
//   handleChange = e => {
//     //записати значення запиту в локальний стейт
//     this.setState({
//       searchQuery: e.currentTarget.value.toLowerCase(),
//     });
//   };

//   //-> при відправці форми
//   handleSubmit = e => {
//     e.preventDefault();

//     //перевірити запит на пустоту
//     if (this.state.searchQuery.trim() === '') {
//       return alert('enter query');
//     }
//     //передати значення запиту через пропси в апп
//     this.props.onSearch(this.state.searchQuery);

//     //очистити форму від старого запиту
//     this.setState({ searchQuery: '' });
//     // e.target.searchQuery.value = '';
//   };

//   render() {
//     const { searchQuery } = this.state;
//     return (
//       <SearcHeader>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <SearchButton type="submit">
//             <span>Search</span>
//           </SearchButton>

//           <SearchInput
//             type="text"
//             name="searchQuery"
//             value={searchQuery}
//             autocomplete="off"
//             autofocus
//             placeholder="Search images and photos"
//             onChange={this.handleChange}
//           />
//         </SearchForm>
//       </SearcHeader>
//     );
//   }
// }
