import React, { Component } from 'react';

import { Button, Tooltip } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import './FieldItem.scss';


const FIELD_NAME_LIMIT = 25;
const FIELD_TYPES = {
    1: 'Number',
    2: 'Text',
    3: 'TextArea',
    4: 'Radio',
    5: 'Autocomplete',
    6: 'Checkbox'
}

class FieldItem extends Component {

    getFieldName = () => {
        let item = this.cutStringWithTooltip(this.props.item.name, FIELD_NAME_LIMIT, "field-item__name");
        return item;
    }

    cutStringWithTooltip = (text, limit, className) => {
        let item = null
        if (text.length > limit) {
            const cut_text = text.substring(0, limit - 3) + "..."
            item = (<Tooltip title={text} placement="top-end" arrow>
                <div className={className}>
                    {cut_text}
                </div>
            </Tooltip>
            )
        } else {
            item = (<div className={className}>
                {text}
            </div>)
        }
        return item;
    }


    getFieldType = () => {
        let fieldType = FIELD_TYPES[this.props.item.fieldType];
        return (
            <div className="field-item__type">
                {fieldType}
            </div>
        )
    }

    render() {
        return (
            <div className="field-item">
                {this.getFieldName()}

                {this.getFieldType()}

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
