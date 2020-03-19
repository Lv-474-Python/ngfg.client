import React, {Component} from 'react';

import FieldList from "./FieldList";
import Filter from "./AdditionalComponents/Filter";
import Search from './AdditionalComponents/Search'


class FieldsPage extends Component {

    state = {
        filter: {
            showAll: true,
            showNumber: false,
            showText: false,
            showTextArea: false,
            showCheckbox: false,
            showRadio: false,
            showAutocomplete: false
        },
        sort: {
          byNameDesc: true
        },
        shared: {
          shared: true,
          my: true
        },
        search: undefined
    };

    handleFilter = (filter) => {
        this.setState({filter});
    };

    handleSort = (sort) => {
        this.setState({sort});
    };

    handleShared = (shared) => {
        this.setState({shared});
    };

    handleSearch = (value) => {
        this.setState({search: value});
    };

    render() {
        return (
            <div className="fields-page">
                <div className="filter-div">
                    <Filter handleFilter={this.handleFilter}
                            filter={this.state.filter}
                            handleSort={this.handleSort}
                            sort={this.state.sort}
                            handleShared={this.handleShared}
                            shared={this.state.shared}/>
                </div>
                <div>
                    <Search handleSearch={this.handleSearch}
                            search={this.state.search}/>
                    <FieldList filter={this.state.filter}
                               search={this.state.search}
                               shared={this.state.shared}
                               sort={this.state.sort}/>
                </div>
            </div>
        );
    }
}

export default FieldsPage;
