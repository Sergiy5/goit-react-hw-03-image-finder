import { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types'; 
import {
  HeaderBar,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './searchbar.styled'

class Searchbar extends Component {
    state = {
    queryForm: "",
  };

  handleChange = ({target}) => {
        this.setState({
          [target.name]: target.value.trim(),
        });
  }
  handleSubmit = (e) => {
      e.preventDefault()
      const {queryForm} = this.state
      this.props.onSubmit( queryForm )
      this.setState({
    query: '',
    })
    }

render() {
return (
  <HeaderBar className="searchbar">
    <SearchForm onSubmit={this.handleSubmit}>
      <SearchFormBtn type="submit">
        <FcSearch />
        <SearchFormBtnLabel></SearchFormBtnLabel>
      </SearchFormBtn>

      <SearchFormInput
        name="queryForm"
        type="text"
        autocomplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={this.handleChange}
        value={this.state.queryForm}
      />
    </SearchForm>
  </HeaderBar>
);}
}

export default Searchbar

Searchbar.propTypes = {
  state: PropTypes.shape({
    queryForm: PropTypes.string.isRequired
  })
}