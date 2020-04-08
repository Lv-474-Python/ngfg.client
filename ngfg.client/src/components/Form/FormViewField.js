import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import '../Field/Field.css'
import './FormViewField.css'
import {
    Card,
    CardContent,
    Checkbox,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    FormGroup,
    Link,
    TextField,
    Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const fieldTypes = {
    'Number': 1,
    'Text': 2,
    'TextArea': 3,
    'Radio': 4,
    'Autocomplete': 5,
    'Checkbox': 6
};


class FormViewField extends Component {

    state = {
        question: ""
    }

    getNumberField = function () {
        return [
            (<Typography className="field-typo"
                         variant="body2"
                         component="p"
                         key={this.props.field.id}>
                From {!this.props.field.range || this.props.field.range.min === null ?
                "Any" : this.props.field.range.min} {"to "}
                {!this.props.field.range || this.props.field.range.max === null ?
                    "Any" : this.props.field.range.max}
            </Typography>),
            (<Typography className="field-typo"
                         variant="body2"
                         component="p"
                         key={this.props.field.name}>
                <Checkbox
                    className='field-checkbox'
                    checked={this.props.field.isStrict}
                    disabled={true}/>
                Only integers
            </Typography>)]
    };

    getTextField = function () {
        return [
            (<Typography className="field-typo"
                         variant="body2"
                         component="p"
                         key={this.props.field.id}>
                From {!this.props.field.range || this.props.field.range.min === null ?
                "0" : this.props.field.range.min} {"to "}
                {!this.props.field.range || this.props.field.range.max === null ?
                    "255" : this.props.field.range.max} characters
            </Typography>),
            (<Typography className="field-typo"
                         variant="body2"
                         component="p"
                         key={this.props.field.name}>
                <Checkbox
                    className='field-checkbox'
                    checked={this.props.field.isStrict}
                    disabled={true}/>
                Only letters
            </Typography>)]
    };

    getAutocompleteField = function () {
        return [
            (<Typography className="field-typo"
                         variant="body2"
                         component="p"
                         key={this.props.field.id}>
                From {this.props.field.settingAutocomplete.fromRow} {"to "}
                {this.props.field.settingAutocomplete.toRow}
            </Typography>),
            (<Typography className="field-typo"
                         variant="body2"
                         component="p"
                         key={this.props.field.name}>
                <Link className='field-link' href={this.props.field.settingAutocomplete.dataUrl}>
                    Go to sheet
                </Link>
            </Typography>)]
    };

    getCheckboxField = function () {
        return (
            <Typography className="field-typo"
                        variant="body2"
                        component="p">
                From {!this.props.field.range || this.props.field.range.min === null ?
                "0" : this.props.field.range.min} {"to "}
                {!this.props.field.range || this.props.field.range.max === null ?
                    this.props.field.choiceOptions.length : this.props.field.range.max} choices
            </Typography>)
    };

    getChoiceOptions = function () {
        return (
            <ExpansionPanel className='field-expand'>
                <ExpansionPanelSummary className='field-expand-summary'
                                       expandIcon={<ExpandMoreIcon className='expand-icon'/>}
                                       aria-controls="panel1a-content"
                >
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormGroup className='field-expand-details'>
                        {

                            this.props.field.choiceOptions.map(elem =>
                                <TextField className={'form-choice-typo'}
                                           disabled key={elem}
                                           defaultValue={elem}/>
                            )
                        }
                    </FormGroup>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )

    };

    render() {
        return (
            <Card className='form-view-field'>
                <CardContent className='form-field-card-content'>
                    <Typography className='field-typo' gutterBottom variant="h5" component="h2">
                        <b>{this.props.field.name}</b>
                    </Typography>
                    <Typography className="field-typo"
                                variant="caption"
                                component="h6">
                        {
                            Object.entries(fieldTypes).filter((elem) => {
                                return elem[1] === this.props.field.fieldType
                            })[0][0]}
                    </Typography>
                    {
                        this.props.field.fieldType === 1 &&
                        this.getNumberField().map(elem => {
                            return elem
                        })
                    }

                    {
                        this.props.field.fieldType === 2 &&
                        this.getTextField().map(elem => {
                            return elem
                        })
                    }
                    {
                        this.props.field.fieldType === 5 &&
                        this.getAutocompleteField().map(elem => {
                            return elem
                        })
                    }
                    {
                        this.props.field.fieldType === 6 &&
                        this.getCheckboxField()
                    }
                    <Typography className={"field-typo"}
                                variant="caption"
                                component="p">
                        Created: {new Date(this.props.field.created).toDateString()}
                    </Typography>
                </CardContent>
                {
                    [4, 6].includes(this.props.field.fieldType) &&
                    this.getChoiceOptions()
                }
            </Card>
        );
    }
}

export default withRouter(FormViewField);