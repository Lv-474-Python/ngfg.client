import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import './Form.css'

import {Button, Card, CardActions, CardContent, Typography} from '@material-ui/core';
import FormStatus from "./AdditionalComponent/FormStatus";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DeleteButtonForm from "./AdditionalComponent/DeleteButton";
import ShareFormModal from "../FormShare/ShareFormModal";


class FormItem extends Component {
    goToView = () => {
        this.props.history.push(`/forms/${this.props.item.id}`)
    };

    handleShareRender = () => {
        if (this.props.item.isPublished) {
            return (
                <ShareFormModal form={this.props.item}
                                btnClassName="form-item-btn-share"/>
            )
        }
    }

    render() {
        return (
            <Card className='form-list-item'>
                <CardContent>
                    <Typography variant="h5"
                                component="h2"
                                className='form-item-content'>
                        {this.props.item.name}
                    </Typography>
                    <Typography variant="inherit"
                                component="p"
                                className='form-item-content'>
                        {this.props.item.title}
                    </Typography>
                    <FormStatus published={this.props.item.isPublished}/>
                </CardContent>

                <CardActions>
                    <Button
                        className='form-item-btn'
                        onClick={this.goToView}
                        endIcon={<VisibilityOutlinedIcon/>}>
                        View
                    </Button>
                    {this.handleShareRender()}
                    <DeleteButtonForm deleteBtnClass='form-delete-btn'
                                      form={this.props.item}
                                      disableIcon={false}
                                      handleDelete={this.props.handleDelete}/>
                </CardActions>
            </Card>
        );
    }
}

export default withRouter(FormItem);
