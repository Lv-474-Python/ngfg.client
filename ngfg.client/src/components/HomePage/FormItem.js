import React, { Component } from 'react';

import { Button, Tooltip } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import './FormItem.scss';
import ShareFormModal from "../FormShare/ShareFormModal";


const FORM_NAME_LIMIT = 20;
const FORM_TITLE_LIMIT = 20;


class FormItem extends Component {

    getFormStatus = () => {
        let status = this.props.item.isPublished ? 'Published' : 'Draft';
        return `Status: ${status}`;
    }

    getFormName = () => {
        let item = this.cutStringWithTooltip(this.props.item.name, FORM_NAME_LIMIT, "form-item__name");
        return item;
    }

    getFormTitle = () => {
        let item = this.cutStringWithTooltip(this.props.item.title, FORM_TITLE_LIMIT, "form-item__title");
        return item;
    }

    cutStringWithTooltip = (text, limit, className) => {
        let item = null
        if (text.length > limit) {
            const cut_text = text.substring(0, limit - 3) + "..."
            item = (
                <Tooltip title={text} placement="top-end" arrow>
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

    render() {
        return (
            <div className="form-item">
                {this.getFormName()}

                {this.getFormTitle()}

                <div className="form-item__status">
                    {this.getFormStatus()}
                </div>
                <div className="form-item__buttons">
                    <Button className="form-item__buttons__more"
                            onClick={this.props.onViewMoreClick}>
                        View more
                    </Button>

                    <ShareFormModal form={this.props.item}
                                    btnClassName="form-item__buttons__share" />
                </div>
            </div>
        );
    }
}

export default FormItem;
