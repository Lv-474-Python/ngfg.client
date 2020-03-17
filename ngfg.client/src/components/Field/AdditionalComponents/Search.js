import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

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
