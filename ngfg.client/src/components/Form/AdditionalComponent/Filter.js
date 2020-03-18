import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import './Filter.css'


class Filter extends Component {

    state = {
        filter: null
    };

    componentDidMount() {
        let filter = {};
        this.props.checkboxValue.map(elem => {
            filter[elem] = false
        });

        this.setState({filter})
    };

    filterClick = (event, value) => {
        let filter = this.state.filter;
        filter[value] = !filter[value];
        this.setState({filter});

        this.props.handleFilter(filter);
    };

    render() {
        return (
            <div className='filter'>
                <Typography className='filter-title'
                            variant="inherit"
                            component="p">
                    {this.props.filterName}
                </Typography>
                <FormGroup className='filter-content'>
                    {this.props.checkboxValue.map(elem =>
                        <FormControlLabel
                            key={elem}
                            label={elem}
                            control={<Checkbox className='filter-form-item'
                                               onChange={(event) =>
                                                   this.filterClick(event, elem)}/>}/>
                    )}
                </FormGroup>
            </div>
        );
    }
}

export default withRouter(Filter);