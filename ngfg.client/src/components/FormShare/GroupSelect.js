import React, {Component} from 'react';
import {
    Input,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Chip
} from "@material-ui/core"
import {withRouter} from "react-router-dom";

import './GroupSelect.css'

class GroupSelect extends Component {

    state = {
        selectedGroupsNames: [],
        selectedGroups: []
    };

    handleChange = (event) => {
        let selectedGroups = [];
        this.props.groups.forEach(element => {
            if (event.target.value.includes(element.name)) {
                selectedGroups.push(element);
            }
        });
        this.setState({selectedGroupsNames: event.target.value, selectedGroups},
            () => this.props.setSelectedGroups(this.state.selectedGroups))
    };


    render() {
        return (
            <FormControl className='form-control-group'>
                <InputLabel id="group-select-label-id">Groups</InputLabel>
                <Select variant='outlined'
                        className='group-select-item'
                        labelId="group-select-label-id"
                        id="group-select-id"
                        multiple
                        value={this.state.selectedGroupsNames}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-chip"/>}
                        renderValue={(selected) => (
                            <div className='chips'>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} className='chip'/>
                                ))}
                            </div>
                        )}>
                    {this.props.groups.map((group) => (
                        <MenuItem key={group.name} value={group.name}>
                            {group.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }
}

export default withRouter(GroupSelect);