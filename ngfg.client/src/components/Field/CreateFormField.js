import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import './Field.css'
import {
    Button,
    Card,
    CardActions,
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
import RemoveIcon from '@material-ui/icons/Remove';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const fieldTypes = {
    'Number': 1,
    'Text': 2,
    'TextArea': 3,
    'Radio': 4,
    'Autocomplete': 5,
    'Checkbox': 6
};


class CreateFormField extends Component {

    state = {
        question: ""
    }

    getNumberField = function() {
        return [
            (<Typography className="field-typo"
                         variant="body2"
                         component="p"
                         key={this.props.field.id}>
                    From { !this.props.field.range || this.props.field.range.min === null ?
                    "Any" : this.props.field.range.min} {"to "}
                    { !this.props.field.range || this.props.field.range.max === null ?
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

    getTextField = function() {
        return [
            (<Typography className="field-typo"
                         variant="body2"
                         component="p"
                         key={this.props.field.id}>
                    From { !this.props.field.range || this.props.field.range.min === null ?
                    "0" : this.props.field.range.min} {"to "}
                    { !this.props.field.range || this.props.field.range.max === null ?
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

    getAutocompleteField = function() {
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

     getCheckboxField = function() {
        return (
            <Typography className="field-typo"
                         variant="body2"
                         component="p">
                    From { !this.props.field.range || this.props.field.range.min === null ?
                    "0" : this.props.field.range.min} {"to "}
                    { !this.props.field.range || this.props.field.range.max === null ?
                        this.props.field.choiceOptions.length : this.props.field.range.max} choices
                </Typography>)
    };

    getChoiceOptions = function() {
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
                                            defaultValue={elem} />
                            )
                        }
                    </FormGroup>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )

    };

    handleRemoveClick = () => {
        let position = this.props.position;
        this.props.onRemoveClick(position);
    }

    handleAddition = () => {
        this.props.addField(this.props.field.id, this.props.position, this.state.question);
    }

    sendField = (event) => {
        this.setState({question: event.target.value},
            this.handleAddition);
    }

    handleMoveUpClick = () => {
        let position = this.props.position;
        let disabled = this.props.disableMoveUp;
        this.props.onMoveUpClik(position, disabled);
    }

    handleMoveDownClick = () => {
        let position = this.props.position;
        let disabled = this.props.disableMoveDown;
        this.props.onMoveDownClick(position, disabled);
    }

    render() {
        return (
            <Card className='form-field-card-item'>
                    <CardContent className='form-field-card-content'>
                        <TextField variant="outlined"
                           helperText={`Enter question for ${this.props.field.name}`}
                           size="small"
                           type="text"
                           value={this.state.question}
                           className="form-creation-fields"
                           onChange={this.sendField}/>
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
                            this.getNumberField().map(elem => {return elem})
                        }

                        {
                            this.props.field.fieldType === 2 &&
                            this.getTextField().map(elem => {return elem})
                        }
                        {
                            this.props.field.fieldType === 5 &&
                            this.getAutocompleteField().map(elem => {return elem})
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

                    <CardActions className='field-card-actions'>
                        <br/>
                        <div className="fields-button-grouper">
                            <Button
                                onClick={this.handleRemoveClick}
                                variant="contained"
                                size="small"
                                color="secondary"
                                className="field-button"
                                endIcon={<RemoveIcon/>}>
                                Remove
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                color="secondary"
                                className="field-button"
                                endIcon={<ArrowUpwardIcon/>}
                                onClick={this.handleMoveUpClick}
                                disabled={this.props.disableMoveUp}>
                                Up
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                color="secondary"
                                className="field-button"
                                endIcon={<ArrowDownwardIcon/>}
                                onClick={this.handleMoveDownClick}
                                disabled={this.props.disableMoveDown}>
                                Down
                            </Button>
                        </div>
                    </CardActions>
                    {
                            [4,6].includes(this.props.field.fieldType) &&
                            this.getChoiceOptions()
                    }
            </Card>
        );
    }
}

export default withRouter(CreateFormField);