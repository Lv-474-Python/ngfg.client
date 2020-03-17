import React, {Component} from 'react';

import FieldList from "./FieldList";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import SearchIcon from '@material-ui/icons/Search';


class Filter extends Component {

    onChange = (event, change) => {
        let filter = this.props.filter;
        filter = Object.assign(filter, change);
        this.setState({
            filter
        }, () => {
            this.props.handleFilter(filter);
        });
    };

    render() {
        return (
            <div className="filter-item">
                <h3 className='filter-category'>Type</h3>
                <FormGroup className='filter-typo'>
                    <FormControlLabel className='filter-typo'
                                      control={
                                          <Checkbox checked={this.props.filter.showNumber}
                                                    onChange={(event) => this.onChange(
                                                        event,
                                                        {
                                                            showNumber: !this.props.filter.showNumber,
                                                            showAll: false
                                                        })}
                                          />}
                                      label="Number"
                    />
                    <FormControlLabel className='filter-typo'
                                      control={
                                          <Checkbox checked={this.props.filter.showText}
                                                    onChange={(event) => this.onChange(
                                                        event,
                                                        {
                                                            showText: !this.props.filter.showText,
                                                            showAll: false
                                                        })}
                                          />}
                                      label="Text"
                    />
                    <FormControlLabel className='filter-typo'
                                      control={
                                          <Checkbox checked={this.props.filter.showTextArea}
                                                    onChange={(event) => this.onChange(
                                                        event,
                                                        {
                                                            showTextArea: !this.props.filter.showTextArea,
                                                            showAll: false
                                                        })}
                                          />}
                                      label="TextArea"
                    />
                    <FormControlLabel className='filter-typo'
                                      control={
                                          <Checkbox checked={this.props.filter.showCheckbox}
                                                    onChange={(event) => this.onChange(
                                                        event,
                                                        {
                                                            showCheckbox: !this.props.filter.showCheckbox,
                                                            showAll: false
                                                        })}
                                          />
                                      }
                                      label="Checkbox"
                    />
                    <FormControlLabel className='filter-typo'
                                      control={
                                          <Checkbox checked={this.props.filter.showRadio}
                                                    onChange={(event) => this.onChange(
                                                        event,
                                                        {
                                                            showRadio: !this.props.filter.showRadio,
                                                            showAll: false
                                                        })}
                                          />
                                      }
                                      label="Radio"
                    />
                    <FormControlLabel className='filter-typo'
                                      control={
                                          <Checkbox checked={this.props.filter.showAutocomplete}
                                                    onChange={(event) => this.onChange(
                                                        event,
                                                        {
                                                            showAutocomplete: !this.props.filter.showAutocomplete,
                                                            showAll: false
                                                        })}
                                          />
                                      }
                                      label="Autocomplete"
                    />
                </FormGroup>
            </div>
        )
    }
}

class Search extends Component {

    render() {
        return (
            <Paper component="div" className='search-bar'>
                <SearchIcon/>
                <InputBase
                    className='field-card-content'
                    placeholder="Search"
                    onChange={this.props.handleSearch}

                />
                {/*<IconButton type="submit" className={classes.iconButton} aria-label="search">*/}
                {/*    */}
                {/*</IconButton>*/}
            </Paper>
        )
    }
}

class FieldsPage extends Component {

    constructor(props) {
        super(props);
    }

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
        search: undefined
    };

    handleFilter = (filter) => {
        this.setState({filter});
    };

    handleSearch = (event) => {
        this.setState({search: event.target.value});
    };

    render() {
        console.log("render state");
        console.log(this.state);
        return (
            <div className="App">
                <div className="filter-div">
                    <Filter handleFilter={this.handleFilter}
                            filter={this.state.filter}/>
                </div>
                <div className='field-list'>
                    <Search handleSearch={this.handleSearch}
                            search={this.state.search}/>
                    <FieldList filter={this.state.filter}
                               search={this.state.search}/>
                </div>
            </div>
        );
    }
}

export default FieldsPage;