import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import './Form.css'

import {Button, Card, CardActions, CardContent, Typography} from '@material-ui/core';
import PublishField from "./AdditionalComponent/PublishField";


class FormItem extends Component {
    goToView = () => {
        this.props.history.push(`/forms/${this.props.item.id}`)
    };

    render() {
        return (
            <Card className='form-item'>
                <CardContent>
                    <Typography variant="h5"
                                component="h2"
                                className='form-item-content'>
                        {this.props.item.name}
                    </Typography>
                    <Typography variant="p"
                                component="p"
                                className='form-item-content'>
                        {this.props.item.title}
                    </Typography>
                    <PublishField published={this.props.item.isPublished} />
                </CardContent>

                <CardActions>
                    <Button
                        className='form-item-link'
                        size="medium"
                        onClick={this.goToView}>
                        View form
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withRouter(FormItem);
