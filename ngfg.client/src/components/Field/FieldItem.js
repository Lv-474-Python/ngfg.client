import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import './Field.css'

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const fieldTypes = {
    'Number': 1,
    'Text': 2,
    'TextArea': 3,
    'Radio': 4,
    'Autocomplete': 5,
    'Checkbox': 6
};


class FieldItem extends Component {
    goToView = () => {
        this.props.history.push(`/fields/${this.props.item.id}`)
    };

    getNumberField = function() {
        return [
            (<Typography className="field-typo"
                         variant="body2"
                         color="textSecondary"
                         component="p">
                    From { !this.props.item.range || this.props.item.range.min === null ?
                    "Any" : this.props.item.range.min} {"to "}
                    { !this.props.item.range || this.props.item.range.max === null ?
                        "Any" : this.props.item.range.max}
                </Typography>),
            (<Typography className="field-typo"
                         variant="body2"
                         color="textSecondary"
                         component="p">
                <Checkbox
                    className='field-checkbox'
                    checked={this.props.item.isStrict}
                    disabled={true}
                    color='#ffffff' />
                Only integers
            </Typography>)]
    };

    getTextField = function() {
        return [
            (<Typography className="field-typo"
                         variant="body2"
                         color="textSecondary"
                         component="p">
                    From { !this.props.item.range || this.props.item.range.min === null ?
                    "0" : this.props.item.range.min} {"to "}
                    { !this.props.item.range || this.props.item.range.max === null ?
                        "255" : this.props.item.range.max} characters
                </Typography>),
            (<Typography className="field-typo"
                         variant="body2"
                         color="textSecondary"
                         component="p">
                    <Checkbox
                        className='field-checkbox'
                        checked={this.props.item.isStrict}
                        disabled={true}
                        color='#ffffff' />
                    Only letters
                </Typography>)]
    };

    getRadioField = function() {
        console.log(this.props.item.choiceOptions);
        return (
            <ExpansionPanel className='field-expand'>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                {

                    this.props.item.choiceOptions.map(elem =>
                        <Typography className='choice-typo' key={elem}>{elem}</Typography>
                    )
                }
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )

    };

    render() {
        return (
            <Card className='field-card-item'>
                    <CardContent className='field-card-content'>
                        <Typography gutterBottom variant="h5" component="h2">
                            <b>{this.props.item.name}</b>
                        </Typography>
                        <Typography className="field-typo"
                                    variant="h6"
                                    color="textSecondary"
                                    component="h6">
                            {
                                Object.entries(fieldTypes).filter((elem) => {
                                    return elem[1] === this.props.item.fieldType
                                })[0][0]}
                        </Typography>
                        {
                            this.props.item.fieldType === 1 &&
                            this.getNumberField().map(elem => {return elem})
                        }

                        {
                            this.props.item.fieldType === 2 &&
                            this.getTextField().map(elem => {return elem})
                        }
                    </CardContent>

                    <CardActions className='field-card-actions'>
                        <Button/>
                        <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            className='field-button'
                            endIcon={<SendIcon/>}>
                            Send
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className='field-button'
                            endIcon={<EditIcon/>}>
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className='field-button'
                            endIcon={<DeleteIcon/>}>
                            Delete
                        </Button>
                    </CardActions>
                    {
                            this.props.item.fieldType === 4 &&
                            this.getRadioField()
                    }
            </Card>
        );
    }
}

export default withRouter(FieldItem);
