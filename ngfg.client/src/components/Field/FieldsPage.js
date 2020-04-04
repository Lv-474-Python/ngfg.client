import React, {Component} from 'react';

import FieldList from "./FieldList";
import Filter from "./AdditionalComponents/Filter";
import Search from './AdditionalComponents/Search'
import axios from "axios";

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

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
            all: true,
            shared: false,
            my: false
        },
        search: undefined,
        fields: []
    };

    getData = () => {
        axios.get(`${API_URL}/${API_VERSION}/fields`, {
            withCredentials: true,
        })
            .then(res => {
                const fields = res.data.fields;
                this.setState({fields})
            })
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

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div className="fields-page">
                <div className="filter-div">
                    <Filter handleFilter={this.handleFilter}
                            filter={this.state.filter}
                            handleSort={this.handleSort}
                            sort={this.state.sort}
                            handleShared={this.handleShared}
                            shared={this.state.shared}
                            getData={this.getData}/>
                </div>
                <div>
                    <Search handleSearch={this.handleSearch}
                            search={this.state.search}/>
                    <FieldList filter={this.state.filter}
                               search={this.state.search}
                               shared={this.state.shared}
                               sort={this.state.sort}
                               getData={this.getData}
                               fields={this.state.fields}/>
                </div>
            </div>
        );
    }
}

export default FieldsPage;
