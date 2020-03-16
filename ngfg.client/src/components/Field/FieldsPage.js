import React, {Component} from 'react';

import FieldList from "./FieldList";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";


class Filter extends Component {

    onChange = (event, change)  => {
        let filter = this.props.filter;
        filter = Object.assign(filter, change);
        this.setState({
            filter
        }, () => {
            this.props.filterHandler(filter);
        } );
    };

    render(){
        return (
            <div className="filter-item">
                <h3 className='filter-category'>Type</h3>
                <FormGroup className='filter-typo'>
                    <FormControlLabel className='filter-typo'
                        control={<Checkbox checked={this.props.filter.showNumber}
                                           onChange={(event) => this.onChange(event,
                            {
                                showNumber: !this.props.filter.showNumber,
                                showAll: false})}
                                           />}
                        label="Number"
                    />
                    <FormControlLabel className='filter-typo'
                        control={<Checkbox checked={this.props.filter.showText}
                                           onChange={(event) => this.onChange(event,
                            {
                                showText: !this.props.filter.showText,
                                showAll: false})}
                                           />}
                        label="Text"
                    />
                    <FormControlLabel className='filter-typo'
                        control={<Checkbox checked={this.props.filter.showTextArea}
                                           onChange={(event) => this.onChange(event,
                            {
                                showTextArea: !this.props.filter.showTextArea,
                                showAll: false})}
                                           />}
                        label="TextArea"
                    />
                    <FormControlLabel className='filter-typo'
                        control={
                            <Checkbox checked={this.props.filter.showCheckbox}
                                      onChange={(event) => this.onChange(event,
                            {
                                showCheckbox: !this.props.filter.showCheckbox,
                                showAll: false})}
                                      />
                        }
                        label="Checkbox"
                    />
                    <FormControlLabel className='filter-typo'
                        control={
                            <Checkbox checked={this.props.filter.showRadio}
                                      onChange={(event) => this.onChange(event,
                            {
                                showRadio: !this.props.filter.showRadio,
                                showAll: false})}
                                      />
                        }
                        label="Radio"
                    />
                    <FormControlLabel className='filter-typo'
                        control={
                            <Checkbox checked={this.props.filter.showAutocomplete}
                                      onChange={(event) => this.onChange(event,
                            {
                                showAutocomplete: !this.props.filter.showAutocomplete,
                                showAll: false})}
                                      />
                        }
                        label="Autocomplete"
                    />
                </FormGroup>
            </div>
        )
    }
}

class FieldsPage extends Component{

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
        }
    };

    filterHandler = (filter) => {
        this.setState({filter});
    };

    render() {
        console.log("render state");
        console.log(this.state.filter);
        return (
            <div className="App">
                <div className="filter-div">
                    <Filter filterHandler={this.filterHandler} filter={this.state.filter}/>
                </div>
                <FieldList filter={this.state.filter} />
            </div>
        );
    }
}

export default FieldsPage;