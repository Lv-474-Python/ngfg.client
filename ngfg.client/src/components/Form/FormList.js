import React, {Component} from 'react';
import axios from 'axios';

import Button from "@material-ui/core/Button";
import Filter from "./AdditionalComponent/Filter";
import FormItem from './FormItem';
import SearchBar from 'material-ui-search-bar'
import Sort from "./AdditionalComponent/Sort";

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

class FormList extends Component {
    state = {
        forms: [],
        filteredForms: [],
        filter: {
            'Published': false,
            'Draft': false
        },
        search: "",
        sortKey: "Name"
    };

    getData = () => {
        axios.get(`${API_URL}/${API_VERSION}/forms`, {
            withCredentials: true,
        })
            .then(res => {
                const {forms} = res.data;
                this.setState({forms: forms, filteredForms: forms})
            });
    };

    filterForm = (forms, filter) => {
        let filteredForms = [];
        let publishedFilter = filter['Published'];
        let draftFilter = filter['Draft'];

        if ((!publishedFilter && !draftFilter) || (publishedFilter && draftFilter)) {
            return forms;
        }

        forms.forEach(form => {
            if ((form.isPublished && publishedFilter) || (!form.isPublished && draftFilter)) {
                filteredForms.push(form);
            }
        });

        return filteredForms;
    };

    handleFilter = (filter) => {
        let searchForms = this.searchForms(this.state.forms, this.state.search);
        let filteredForms = this.filterForm(searchForms, filter);
        this.setState({
            filter: filter,
            filteredForms: filteredForms
        });
    };

    searchForms = (forms, search) => {
        if (search !== "") {
            let searchForm = [];
            forms.forEach(form => {
                if (form.name.toLowerCase().includes(search.toLowerCase())) {
                    searchForm.push(form)
                }
            });
            return searchForm;
        }
        return forms;
    };

    handleSearch = (searchValue) => {
        let filteredForms = this.filterForm(this.state.forms, this.state.filter);
        let searchForms = this.searchForms(filteredForms, searchValue);
        this.setState({filteredForms: searchForms})
    };

    sortForms = (forms, sortKey, ascending) => {
        if (sortKey === 'Name') {
            forms.sort((form1, form2) => {
                return form1.name.toLowerCase().localeCompare(form2.name.toLowerCase())
            });

            return ascending ? forms : forms.reverse()
        }
        if (sortKey === 'Date') {
            forms.sort((form1, form2) => {
                let date1 = new Date(form1.created);
                let date2 = new Date(form2.created);
                return date2 - date1;
            });

            return ascending ? forms : forms.reverse()
        }
    };

    handleSort = (sortKey, ascending) => {
        let filteredForms = this.filterForm(this.state.forms, this.state.filter);
        let searchForms = this.searchForms(filteredForms, this.state.search);
        let sortedForms = this.sortForms(searchForms, sortKey, ascending);

        this.setState({
            filteredForms: sortedForms
        })
    };

    handleCreateFormClick = () => {
        this.props.history.push('/form')
    }

    componentDidMount() {
        this.getData();
    };

    render() {
        return (
            <div className='form-list-wrapper'>
                <div className="side-menu">
                    <Sort sortValue={["Name", "Date"]}
                          handleSort={this.handleSort}/>

                    <Filter filterName="Status"
                            checkboxValue={["Published", "Draft"]}
                            handleFilter={this.handleFilter}/>

                    <Button className="create-form-btn"
                            size='large'
                            onClick={this.handleCreateFormClick}>
                        Create Form
                    </Button>
                </div>
                <div>
                    <SearchBar onChange={(newValue) => {
                        this.handleSearch(newValue);
                        this.setState({search: newValue});
                    }}
                               onRequestSearch={() => {
                                   this.handleSearch(this.state.search)
                               }}
                               value={this.state.search}
                               className='search'/>

                    <div className='form-list'>
                        {
                            this.state.filteredForms.map(form =>
                                <FormItem item={form}
                                          key={form.id}/>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default FormList;
