import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import './Form.css'
import axios from 'axios'

import {Button, Card, CardActions, CardContent, Typography} from '@material-ui/core';
import FormStatus from "./AdditionalComponent/FormStatus";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';


class FormItem extends Component {
    goToView = () => {
        this.props.history.push(`/forms/${this.props.item.id}`)
    };

    handleShare = () => {
        console.log("Share")
    }

    handleDelete = () => {
        console.log("Delete")
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
                    <FormStatus published={this.props.item.isPublished} />
                </CardContent>

                <CardActions>
                    <Button
                        className='form-item-btn'
                        size="medium"
                        onClick={this.goToView}
                        endIcon={<VisibilityOutlinedIcon/>}>
                        View
                    </Button>
                    <Button
                        size='medium'
                        className='form-item-btn'
                        endIcon={<SendIcon/>}
                        onClick={this.handleShare}>
                        Share
                    </Button>
                     <Button
                        size='medium'
                        className='form-item-btn'
                        endIcon={<DeleteIcon/>}
                        onClick={this.handleDelete}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withRouter(FormItem);
