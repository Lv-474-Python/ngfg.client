import React, { Component } from 'react';

import SelectFieldType from './Restrictions/SelectFieldType';
import IsStrict from './Restrictions/IsStrict';
import Range from './Restrictions/Range';
import ChoiceOptionList from './Restrictions/ChoiceOptionList';


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
    }

    handleChangeFieldType = (event) => {
        this.setState({
            fieldType: event.target.value
        });
    }

    handleStrictChange = (event) => {
        console.log(event.target);
        this.setState({
            isStrict: event.target.checked
        });
    }

    handleRangeMaxChange = (event) => {
        this.setState({
            'range_max': event.target.value
        });
    }

    handleRangeMinChange = (event) => {
        this.setState({
            'range_min': event.target.value
        });
    }

    setOptions = (choiceOptions) => {
        this.setState({
            choiceOptions
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <SelectFieldType onChange={this.handleChangeFieldType}
                                 fieldType={this.state.fieldType}
                 />
                 {
                     [1, 2].includes(this.state.fieldType) &&
                     <IsStrict onChange={   this.handleStrictChange}
                               value={this.state.isStrict}
                     />
                 }
                 {
                     [1, 2, 6].includes(this.state.fieldType) &&
                     <Range onChangeMin={this.handleRangeMinChange}
                            onChangeMax={this.handleRangeMaxChange}
                            maxValue={this.state.range_max}
                            minValue={this.state.range_min}
                     />
                 }
                 {
                    [4, 6].includes(this.state.fieldType) &&
                    <ChoiceOptionList setOptions={this.setOptions} 
                                      choiceOptions={this.state.choiceOptions}
                    />
                 }
            </div>
        );
    }
}

export default CreateField;
