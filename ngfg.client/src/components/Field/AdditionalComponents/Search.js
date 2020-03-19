import React, {Component} from "react";

import SearchBar from 'material-ui-search-bar'

class Search extends Component {

    render() {
        return (
            <SearchBar onChange={(newValue) => {
                this.props.handleSearch(newValue)
            }}
                       value={this.props.search}
                       className='search-bar'/>
        )
    }
}

export default Search
