import React, {Component} from 'react';
import axios from 'axios';
import FormCreation from './FormCreation';
import Button from "@material-ui/core/Button";
import FieldList from "../Field/FieldList";
import Search from "../Field/AdditionalComponents/Search";
import Filter from "../Field/AdditionalComponents/Filter";

class FormCreationPage extends Component {

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

    handleSearch = (event) => {
        this.setState({search: event.target.value});
    };

    render() {
        return (
        <div className="main-form-creation-container">
            <div className="form-creation-filter">
            <Filter handleFilter={this.handleFilter}
                    filter={this.state.filter}
                    handleSort={this.handleSort}
                    sort={this.state.sort}
                    handleShared={this.handleShared}
                    shared={this.state.shared}/>
            </div>
            <div className="form-creation-fieldlist">
                <Search handleSearch={this.handleSearch}
                            search={this.state.search}/>
                <FieldList filter={this.state.filter}
                           search={this.state.search}
                           shared={this.state.shared}
                           sort={this.state.sort}
                           formCreation={true}
                />
            </div>
            <div className="form-creation-main-component">
            <FormCreation
            />
            </div>
        </div>
        )
    }
}

export default FormCreationPage;