import React, { Component } from 'react';
import {useHistory, Link, withRouter} from 'react-router-dom'
import './Form.css'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



class GroupItem extends Component {
    goToView = () => {
        console.log(this.context.history);
        console.log(this.props.history);
        this.props.history.push(`/groups/${this.props.item.id}`)
    }

    render() {
        return (
            <Card className='card-item'>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.item.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.props.item.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                          className='form-item-link'
                          size="small"
                          color="primary"
                          onClick={this.goToView}>
                        View Group
                    </Button>
                    {/* <Link to={`/forms/${this.props.item.id}`} size="small" color="primary" onClick={this.goToView}>
                        View form
                    </Link> */}
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withRouter(GroupItem);
