import React, {Component} from "react";

import {Paper, InputBase} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

class Search extends Component {

    render() {
        return (
            <Paper component="div" className='search-bar'>
                <SearchIcon className='search-icon'/>
                <InputBase
                    className='field-card-content'
                    placeholder="Search"
                    onChange={this.props.handleSearch}

                />
            </Paper>
        )
    }
}

export default Search
