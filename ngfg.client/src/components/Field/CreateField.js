import React, {Component} from 'react';
import './Field.css'

import CreateNumberOrTextField from './CreateNumberOrTextField'
import CreateTextArea from './CreateTextArea'
import CreateMultiChoice from './CreateMultiChoice'
import CreateSettingAutocompleteField from './CreateSettingAutocompleteField'

import SelectFieldType from './Restrictions/SelectFieldType';


class CreateField extends Component {
    state = {
        "fieldType": 1
    };

    handleChangeFieldType = (event) => {
        this.setState({
            fieldType: event.target.value
        });
    };

    render() {

        return (
            <div>
                <div className="create-field-select-type">
                    <SelectFieldType onChange={this.handleChangeFieldType}
                                     fieldType={this.state.fieldType || 1}
                    />
                </div>
                {
                    [1].includes(this.state.fieldType) && <CreateNumberOrTextField fieldType={1}
                                                                                   getData={this.props.getData}
                                                                                   handleClose={this.props.handleClose}/>
                }
                {
                    [2].includes(this.state.fieldType) && <CreateNumberOrTextField fieldType={2}
                                                                                   getData={this.props.getData}
                                                                                   handleClose={this.props.handleClose}/>
                }
                {
                    [3].includes(this.state.fieldType) && <CreateTextArea getData={this.props.getData}
                                                                          handleClose={this.props.handleClose}/>
                }
                {
                    [4].includes(this.state.fieldType) && <CreateMultiChoice fieldType={4}
                                                                             getData={this.props.getData}
                                                                             handleClose={this.props.handleClose}/>
                }
                {
                    [5].includes(this.state.fieldType) && <CreateSettingAutocompleteField getData={this.props.getData}
                                                                                          handleClose={this.props.handleClose}/>
                }
                {
                    [6].includes(this.state.fieldType) && <CreateMultiChoice fieldType={6}
                                                                             getData={this.props.getData}
                                                                             handleClose={this.props.handleClose}/>
                }
            </div>
        );
    }
}

export default CreateField;
