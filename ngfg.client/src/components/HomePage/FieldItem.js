import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import './FieldItem.scss';


class FieldItem extends Component {

    // можна функцію яка перевірятиме довжину і типу якщо перевищує то вертає з крапками і тултіпом

    render() {
        return (
            <div className="fielditem">
                <div className="fielditem__name">
                    Age
                </div>
                <div className="fielditem__title">
                    Number
                </div>
                <div className="fielditem__buttons">
                    <Button className="fielditem__buttons__more"
                        onClick={this.props.onViewMoreClick}
                    >
                    View more
                    </Button>

                    <Button className="fielditem__buttons__share"
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
