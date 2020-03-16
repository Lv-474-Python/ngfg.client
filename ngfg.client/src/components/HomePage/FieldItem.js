import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import './FieldItem.scss';


const FIELD_TYPES = {
    1: 'Number',
    2: 'Text',
    3: 'TextArea',
    4: 'Radio',
    5: 'Autocomplete',
    6: 'Checkbox'
}

class FieldItem extends Component {

    getFieldType = () => {
        return FIELD_TYPES[this.props.item.fieldType];
    }

    render() {
        return (
            <div className="field-item">
                <div className="field-item__name">
                    {this.props.item.name}
                </div>
                <div className="field-item__type">
                    {this.getFieldType()}
                </div>
                <div className="field-item__buttons">
                    <Button className="field-item__buttons__more"
                            onClick={this.props.onViewMoreClick}
                    >
                        View more
                    </Button>

                    <Button className="field-item__buttons__share"
                            endIcon={<SendIcon>send</SendIcon>}
                            onClick={this.props.onShareClick}
                    >
                        Share
                    </Button>
                </div>
            </div>
        );
    }
}

export default FieldItem;
