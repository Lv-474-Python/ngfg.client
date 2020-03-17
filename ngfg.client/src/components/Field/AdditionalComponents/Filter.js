import React, {Component} from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class Filter extends Component {

    onChangeFilter = (event, change) => {
        let filter = this.props.filter;
        filter = Object.assign(filter, change);
        let allFalse = true;

        for (let i in filter) {
            if (filter[i] === true) {
                allFalse = false;
                break;
            }
        }
        if (allFalse) {
            filter.showAll = true
        }

        this.setState({
            filter
        }, () => {
            this.props.handleFilter(filter);
        });
    };

    onChangeShared = (event, change) => {
        let shared = this.props.shared;
        shared = Object.assign(shared, change);
        this.setState({
            shared
        }, () => {
            this.props.handleShared(shared);
        });
    };

    onChangeSort = (event, change) => {
        let sort = this.props.sort;
        sort = Object.assign(sort, change);
        this.setState({
            sort
        }, () => {
            this.props.handleSort(sort);
        });
    };

    render() {
        return (
            <div className="filter-item">
                <h3 className='filter-category'>Sort</h3>
                <FormGroup >
                    <FormControlLabel
                        className='filter-typo'
                        control={
                            <Checkbox checked={this.props.sort.byNameDesc}
                                      className='filter-checkbox'
                                      onChange={(event) => this.onChangeSort(
                                          event,
                                          {
                                              byNameDesc: !this.props.sort.byNameDesc,
                                          })}
                            />}
                        label="By Name"
                    />

                </FormGroup>
                <h3 className='filter-category'>Type</h3>
                <FormGroup className='filter-typo'>
                    <FormControlLabel
                        className='filter-typo'
                        control={
                            <Checkbox checked={this.props.filter.showNumber}
                                      className='filter-checkbox'
                                      onChange={(event) => this.onChangeFilter(
                                          event,
                                          {
                                              showNumber: !this.props.filter.showNumber,
                                              showAll: false
                                          })}
                            />}
                        label="Number"
                    />
                    <FormControlLabel
                        className='filter-typo'
                        control={
                            <Checkbox checked={this.props.filter.showText}
                                      className='filter-checkbox'
                                      onChange={(event) => this.onChangeFilter(
                                          event,
                                          {
                                              showText: !this.props.filter.showText,
                                              showAll: false
                                          })}
                            />}
                        label="Text"
                    />
                    <FormControlLabel
                        className='filter-typo'
                        control={
                            <Checkbox checked={this.props.filter.showTextArea}
                                      className='filter-checkbox'
                                      onChange={(event) => this.onChangeFilter(
                                          event,
                                          {
                                              showTextArea: !this.props.filter.showTextArea,
                                              showAll: false
                                          })}
                            />}
                        label="TextArea"
                    />
                    <FormControlLabel
                        className='filter-typo'
                        control={
                            <Checkbox checked={this.props.filter.showCheckbox}
                                      className='filter-checkbox'
                                      onChange={(event) => this.onChangeFilter(
                                          event,
                                          {
                                              showCheckbox: !this.props.filter.showCheckbox,
                                              showAll: false
                                          })}
                            />
                        }
                        label="Checkbox"
                    />
                    <FormControlLabel
                        className='filter-typo'
                        control={
                            <Checkbox checked={this.props.filter.showRadio}
                                      className='filter-checkbox'
                                      onChange={(event) => this.onChangeFilter(
                                          event,
                                          {
                                              showRadio: !this.props.filter.showRadio,
                                              showAll: false
                                          })}
                            />
                        }
                        label="Radio"
                    />
                    <FormControlLabel
                        className='filter-typo'
                        control={
                            <Checkbox checked={this.props.filter.showAutocomplete}
                                      className='filter-checkbox'
                                      onChange={(event) => this.onChangeFilter(
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
                <h3 className='filter-category'>Sort</h3>
                <FormGroup>
                    <FormControlLabel
                        className='filter-typo'
                        control={
                            <Checkbox checked={this.props.shared.shared}
                                      className='filter-checkbox'
                                      onChange={(event) => this.onChangeShared(
                                          event,
                                          {
                                              shared: !this.props.shared.shared
                                          })}
                            />}
                        label="Shared"
                    />
                    <FormControlLabel
                        className='filter-typo'
                        control={
                            <Checkbox checked={this.props.shared.my}
                                      className='filter-checkbox'
                                      onChange={(event) => this.onChangeShared(
                                          event,
                                          {
                                              my: !this.props.shared.my
                                          })}
                            />}
                        label="My fields"
                    />

                </FormGroup>
            </div>
        )
    }
}

export default Filter
