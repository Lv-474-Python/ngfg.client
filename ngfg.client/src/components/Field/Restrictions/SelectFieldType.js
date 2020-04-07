import React, {Component} from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";


const fieldTypes = {
    'Number': 1,
    'Text': 2,
    'TextArea': 3,
    'Radio': 4,
    'Autocomplete': 5,
    'Checkbox': 6
};


class SelectFieldType extends Component {

    // getKeyByValue = (object, value) => {
    //     return Object.keys(object).find(key => object[key] === value);
    // }
    // value={this.getKeyByValue(fieldTypes, this.props.fieldType)}


    render() {
        return (
                <FormControl variant="outlined" >
                    <InputLabel>
                        Field Type
                    </InputLabel>
                    <Select onChange={this.props.onChange}
                            defaultValue={1}
                            label={"Field Type"}
                            value={this.props.fieldType}
                            color="primary"
                    >
                        {
                            Object.entries(fieldTypes).map((elem) => {
                                // elem[0] - key (Number, Text)
                                // elem[1] - value (1, 2, 3, ...)
                                return <MenuItem value={elem[1]}
                                                 key={elem[1]}
                                >{elem[0]}</MenuItem>
                            })
                        }

                    </Select>
                </FormControl>
        );
    }
}

export default SelectFieldType;
