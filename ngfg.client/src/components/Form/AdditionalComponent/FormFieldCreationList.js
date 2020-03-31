import React, {Component} from "react";
import CreateFormField from "../../Field/CreateFormField";
import {CardContent, TextField} from "@material-ui/core";

class FormFieldCreationList extends Component {

    state = {
        questions: []
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.fields.length != this.props.fields.length || this.detectQuestionsUpdate(prevState, this.state)) {
            let formFields = [];
            this.props.fields.map((elem, index) =>
                formFields[index] = {fieldId: elem.id, position: index, question: this.state.questions[index]}
            );
            this.props.addFormFields(formFields);
        }
    }

    detectQuestionsUpdate = (prevState, thisState) => {
        this.props.fields.map(function(elem, index) {

        if(prevState.questions[index]!=thisState.questions[index]){
            return true;
        }
        else {
            return false;
        }

    });
    }

    handleSendField = (fieldId, position, question) => {
        this.props.addField(fieldId, position, question)
    }

    handleRemoveField = (position) => {
        this.props.handleFieldRemoval(position);
    }

    handleMoveUpField = (position, disabled) => {
        this.props.moveUpField(position, disabled);
    }

    handleMoveDownField = (position, disabled) => {
        this.props.moveDownField(position, disabled);
    }

    addQuestion = (event, position) => {
        //let questions = this.state.questions;
        //questions[position] = event.target.value;
        this.props.fetchQuestions(position, event.target.value)
    }

    render() {
        return(
            <React.Fragment>
            {
                this.props.fields.map((elem, index) =>
                        <div>
                            <TextField variant="outlined"
                                       helperText={`Enter question for ${elem.name}`}
                                       size="small"
                                       type="text"
                                       value={elem.question}
                                       className="form-creation-fields"
                                       onChange={(event) => this.addQuestion(event, index)}/>
                        <CreateFormField field={elem}
                                         id={elem.id}
                                         position={index}
                                         addField={this.handleSendField}
                                         onRemoveClick={this.handleRemoveField}
                                         onMoveUpClik={this.handleMoveUpField}
                                         onMoveDownClick={this.handleMoveDownField}
                                         disableMoveUp={index==0 ? true : false}
                                         disableMoveDown={index==this.props.fields.length-1 ? true : false}
                        /></div>)
            }
            </React.Fragment>
        )
    }

}

export default FormFieldCreationList;