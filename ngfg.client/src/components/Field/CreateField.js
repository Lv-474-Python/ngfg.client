import React, {Component} from 'react';
import './Field.css'

import Popup from "reactjs-popup";
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
        console.log('this.state');
        console.log(this.state);
        return (
            <div>
                {/*<SelectFieldType onChange={this.handleChangeFieldType}*/}
                {/*                 fieldType={this.state.fieldType}*/}
                {/*/>*/}
                {/*{*/}
                {/*    [1].includes(this.state.fieldType) && <CreateNumberOrTextField fieldType={1}/>*/}
                {/*}*/}
                {/*{*/}
                {/*    [2].includes(this.state.fieldType) && <CreateNumberOrTextField fieldType={2}/>*/}
                {/*}*/}
                {/*{*/}
                {/*    [3].includes(this.state.fieldType) && <CreateTextArea/>*/}
                {/*}*/}
                {/*{*/}
                {/*    [4].includes(this.state.fieldType) && <CreateMultiChoice fieldType={4}/>*/}
                {/*}*/}
                {/*{*/}
                {/*    [5].includes(this.state.fieldType) && <CreateSettingAutocompleteField/>*/}
                {/*}*/}
                {/*{*/}
                {/*    [6].includes(this.state.fieldType) && <CreateMultiChoice fieldType={6}/>*/}
                {/*}*/}
                <Popup trigger={<button className="button"> Create Field </button>} modal>
                    {close => (
                        <div className="modal">
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                            <div className="header"> Create field</div>
                            <div className="content">
                                <SelectFieldType onChange={this.handleChangeFieldType}
                                                 fieldType={this.state.fieldType}
                                />
                                {
                                    [1].includes(this.state.fieldType) && <CreateNumberOrTextField fieldType={1}/>
                                }
                                {
                                    [2].includes(this.state.fieldType) && <CreateNumberOrTextField fieldType={2}/>
                                }
                                {
                                    [3].includes(this.state.fieldType) && <CreateTextArea/>
                                }
                                {
                                    [4].includes(this.state.fieldType) && <CreateMultiChoice fieldType={4}/>
                                }
                                {
                                    [5].includes(this.state.fieldType) && <CreateSettingAutocompleteField/>
                                }
                                {
                                    [6].includes(this.state.fieldType) && <CreateMultiChoice fieldType={6}/>
                                }
                            </div>
                            <div className="actions">

                            </div>
                        </div>
                    )}
                </Popup>
            </div>

        );
    }
}

export default CreateField;
