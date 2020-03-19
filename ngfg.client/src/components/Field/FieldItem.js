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
import DeleteField from "./AdditionalComponents/DeleteField";
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShareField from "./AdditionalComponents/ShareField";
import AddIcon from '@material-ui/icons/Add';

const fieldTypes = {
    'Number': 1,
    'Text': 2,
    'TextArea': 3,
    'Radio': 4,
    'Autocomplete': 5,
    'Checkbox': 6
};


class FieldItem extends Component {

    getNumberField = function() {
        return [
            (<Typography className="field-typo"
                         variant="body2"
                         component="p"
                         key={this.props.item.id}>
                    From { !this.props.item.range || this.props.item.range.min === null ?
                    "Any" : this.props.item.range.min} {"to "}
                    { !this.props.item.range || this.props.item.range.max === null ?
                        "Any" : this.props.item.range.max}
                </Typography>),
            (<Typography className="field-typo"
                         variant="body2"
                         component="p"
                         key={this.props.item.name}>
                <Checkbox
                    className='field-checkbox'
                    checked={this.props.item.isStrict}
                    disabled={true}/>
                Only integers
            </Typography>)]
    };

    getTextField = function() {
        return [
            (<Typography className="field-typo"
                         variant="body2"
                         component="p"
                         key={this.props.item.id}>
                    From { !this.props.item.range || this.props.item.range.min === null ?
                    "0" : this.props.item.range.min} {"to "}
                    { !this.props.item.range || this.props.item.range.max === null ?
                        "255" : this.props.item.range.max} characters
                </Typography>),
            (<Typography className="field-typo"
                         variant="body2"
                         component="p"
                         key={this.props.item.name}>
                    <Checkbox
                        className='field-checkbox'
                        checked={this.props.item.isStrict}
                        disabled={true}/>
                    Only letters
                </Typography>)]
    };

    getAutocompleteField = function() {
                return [
            (<Typography className="field-typo"
                         variant="body2"
                         component="p"
                         key={this.props.item.id}>
                    From {this.props.item.settingAutocomplete.fromRow} {"to "}
                    {this.props.item.settingAutocomplete.toRow}
                </Typography>),
            (<Typography className="field-typo"
                         variant="body2"
                         component="p"
                         key={this.props.item.name}>
                <Link className='field-link' href={this.props.item.settingAutocomplete.dataUrl}>
                    Go to sheet
                </Link>
            </Typography>)]
    };

     getCheckboxField = function() {
        return (
            <Typography className="field-typo"
                         variant={this.props.formCreation ? "caption" : "body2"}
                         component="p">
                    From { !this.props.item.range || this.props.item.range.min === null ?
                    "0" : this.props.item.range.min} {"to "}
                    { !this.props.item.range || this.props.item.range.max === null ?
                        this.props.item.choiceOptions.length : this.props.item.range.max} choices
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

                            this.props.item.choiceOptions.map(elem =>
                                 <TextField className={this.props.formCreation ? "" : 'choice-typo'}
                                            disabled key={elem}
                                            defaultValue={elem} />
                            )
                        }
                    </FormGroup>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )

    };

    render() {
        return (
            <Card className={this.props.formCreation ? "narrow-field-card-item": "field-card-item"}>
                    <CardContent className={this.props.formCreation ? "narrow-field-card-content" : "field-card-content"}>
                        <Typography className='field-typo' gutterBottom variant={this.props.formCreation ? "caption" : "h5"} component="h2">
                            <b>{this.props.item.name}</b>
                        </Typography>
                        <Typography className={"field-typo"}
                                    variant={"caption"}
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
                        {
                            this.props.item.fieldType === 5 &&
                            this.getAutocompleteField().map(elem => {return elem})
                        }
                        {
                            this.props.item.fieldType === 6 &&
                            this.getCheckboxField()
                        }
                        <Typography className={"field-typo"}
                                    variant="caption"
                                    component="p">
                            Created: {new Date(this.props.item.created).toDateString()}
                        </Typography>
                    </CardContent>

                    <CardActions className='field-card-actions'>
                        <br/>
                        {this.props.formCreation
                            ? <div className="fields-button-grouper">
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    className='field-button'
                                    endIcon={<AddIcon/>}>
                                    Add
                                </Button>
                            </div>
                            : <div className="fields-button-grouper">
                                <ShareField field={this.props.item}
                                            handleDeleted={this.props.handleDeleted}
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    className='field-button'
                                    endIcon={<EditIcon/>}>
                                    Edit
                                </Button>
                                <DeleteField field={this.props.item}
                                             handleDeleted={this.props.handleDeleted}
                                />
                            </div>
                        }
                    </CardActions>
                    {
                            [4,6].includes(this.props.item.fieldType) &&
                            this.getChoiceOptions()
                    }
            </Card>
        );
    }
}

export default withRouter(FieldItem);
