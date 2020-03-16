import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import './FormItem.scss';


class FormItem extends Component {

    render() {
        return (
            <div className="formitem">
                <div className="formitem__name">
                    Registration Form
                </div>
                <div className="formitem__title">
                    Registration form title
                </div>
                <div className="formitem__status">
                    Status: Published
                </div>
                <div className="formitem__buttons">
                    <Button className="formitem__buttons__more"
                            onClick={this.props.onViewMoreClick}
                    >
                    View more
                    </Button>

                    <Button className="formitem__buttons__share"
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

export default FormItem;
