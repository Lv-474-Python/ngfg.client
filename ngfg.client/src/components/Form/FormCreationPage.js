import React, {Component} from 'react';
import FormCreation from './FormCreation';
import FieldList from "../Field/FieldList";
import Search from "../Field/AdditionalComponents/Search";
import Filter from "../Field/AdditionalComponents/Filter";
import axios from "axios";

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

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
        search: undefined,
        fields: [],
        addedFields: []
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

    handleFieldAddition = (fieldData) => {
        this.setState(prevState => ({
            addedFields: [...prevState.addedFields, {field: fieldData, question: undefined}]
        }));
    }

    handleFieldRemoval = (position) => {
        let addedFields = this.state.addedFields;
        addedFields = addedFields.slice(0, position).concat(addedFields.slice(position+1, addedFields.length));
        this.setState({addedFields: addedFields})
    }

    render() {
        return (
        <div className="main-form-creation-container">
            <div className="form-creation-fields">
            <div className="form-creation-filter">
            <Filter handleFilter={this.handleFilter}
                    filter={this.state.filter}
                    handleSort={this.handleSort}
                    sort={this.state.sort}
                    handleShared={this.handleShared}
                    shared={this.state.shared}
                    formCreation={true}
                    getData={this.getData}/>
            </div>
            <div className="form-creation-fieldlist">
                <Search handleSearch={this.handleSearch}
                            search={this.state.search}
                            formCreation={true}
                />
                <FieldList filter={this.state.filter}
                           search={this.state.search}
                           shared={this.state.shared}
                           sort={this.state.sort}
                           formCreation={true}
                           getData={this.getData}
                           fields={this.state.fields}
                           addField={this.handleFieldAddition}
                />
            </div>
            </div>
            <div className="form-creation-main-component">
            <FormCreation addedFields={this.state.addedFields}
                          removeField={this.handleFieldRemoval}
            />
            </div>
        </div>
        )
    }
}

export default FormCreationPage;