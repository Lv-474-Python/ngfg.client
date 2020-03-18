import React, {Component} from 'react';
// import axios from 'axios';

import CreateNumberField from './CreateNumberField'

import Button from '@material-ui/core/Button';
import SelectFieldType from './Restrictions/SelectFieldType';
import IsStrict from './Restrictions/IsStrict';
import Range from './Restrictions/Range';
import ChoiceOptionList from './Restrictions/ChoiceOptionList';
import {TextField} from "@material-ui/core";


class CreateField extends Component {
    state = {
        "name": undefined,
        "fieldType": 1,
        "isStrict": false,
        "range_min": undefined,
        "range_max": undefined,
        "choiceOptions": [],
        "settingAutocomplete_dataUrl": undefined,
        "settingAutocomplete_sheet": undefined,
        "settingAutocomplete_fromRow": undefined,
        "settingAutocomplete_toRow": undefined,
    };

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    handleChangeFieldType = (event) => {
        this.setState({
            fieldType: event.target.value
        });
    };

    // sendData = (event) => {
    //     console.log('event.target');
    //     console.log(event.target);
    //     console.log('this.state inside send');
    //     console.log(this.state);
    //     const field = {
    //         name: this.state.name,
    //         fieldType: this.state.fieldType,
    //         isStrict: this.state.isStrict,
    //         range : {min: this.state.range_min, max: this.state.range_max},
    //         choiceOptions: this.state.choiceOptions
    //     };
    //     axios.post('http://ngfg.com:8000/api/v1/fields/', {...field}, {withCredentials: true})
    //         .then(res => {
    //                 console.log(res);
    //                 console.log(res.data);
    //             }
    //         )
    //         .catch(error => {
    //                 console.log(error);
    //             }
    //         );
    // };

    render() {
        console.log('this.state');
        console.log(this.state);
        return (
            <div>
                <SelectFieldType onChange={this.handleChangeFieldType}
                                 fieldType={this.state.fieldType}
                />
                {
                    [1].includes(this.state.fieldType) && <CreateNumberField />
                }
                {
                    [2].includes(this.state.fieldType) && <CreateNumberField fieldType={2}/>
                }
                {/*<div>*/}
                {/*    <Button onClick={this.sendData}>*/}
                {/*        Send*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </div>

        );
    }
}

export default CreateField;
