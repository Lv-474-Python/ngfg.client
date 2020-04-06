import React, {Component} from 'react';
import axios from 'axios';

import FormControl from '@material-ui/core/FormControl';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormFieldCreationList from "./AdditionalComponent/FormFieldCreationList";

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

class FormCreation extends Component {
    state = {
        "name": undefined,
        "title": undefined,
        "resultUrl": undefined,
        "isPublished": false,
        "formFields": [],
        "formErrors": [],
        "fieldErrors": []
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.addedFields !== this.props.addedFields) {
            this.setState({formFields: this.props.addedFields});
        }
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value
        });
    }

    handleResultUrlChange = (event) => {
        this.setState({
           resultUrl: event.target.value
        });
    }

    handlePublish = () => {
        this.setState({
            isPublished: true
        }, this.saveForm);
    }

    deleteForm = (formId) => {
        axios.delete(`${API_URL}/${API_VERSION}/forms/${formId}`, {
            withCredentials: true
        })
            .then(res =>{
                console.log(res);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    saveFormFields = (formId, formField, position) => {
        axios.post(`${API_URL}/${API_VERSION}/forms/${formId}/fields/`, {
            fieldId: formField.field.id,
            question: formField.question,
            position: position
        },
            {withCredentials: true})
            .then ( res => {
                console.log(res);
            })
            .catch(error => {
                let response = error.response.data.message;
                response.position = position;
                this.setState({fieldErrors: {...response}});
                this.deleteForm(formId);
                }
            )
    }

    saveForm = () => {
        axios.post(`${API_URL}/${API_VERSION}/forms/`, {
                name: this.state.name,
                title: this.state.title,
                resultUrl: this.state.resultUrl,
                isPublished: this.state.isPublished
            },
            {withCredentials: true})
            .then( res => {
                    this.setState({errors: {}})
                    const formId = res.data.id;
                    Object.entries(this.state.formFields).map(([key, value]) => (
                        this.saveFormFields(formId, value, key)
                    ));
                }
            )
            .catch ( error => {
                let response = error.response.data.message;
                this.setState({formErrors: {...response}})
                }
            );
    }

    handleFieldRemoval = (position) => {
        this.props.removeField(position);
    }

    handleMoveUpField = (position, disabled) => {
        let formFields = this.state.formFields;
        if (!disabled) {
            formFields[position] = formFields.splice(position-1, 1, formFields[position])[0];
            this.setState({formFields: formFields});
        }
    }

    handleMoveDownField = (position, disabled) => {
        let formFields = this.state.formFields;
        if (!disabled) {
            formFields[position] = formFields.splice(position+1, 1, formFields[position])[0];
            this.setState({formFields: formFields});
        }
    }

    fetchQuestion = (position, question) => {
        let formFields = this.state.formFields;
        formFields[position].question = question;
        this.setState({formFields: formFields});
    }

    render() {
        console.log("formFields: ", this.state.formFields);
        console.log("formErrors: ", this.state.formErrors);
        console.log("fieldErrors: ", this.state.fieldErrors);
        return(
            <div className="form-container">
                <FormControl>
                    <div className="form-btn-container">
                        <Button onClick={this.handlePublish}
                                className="form-creation-btn"
                        >
                            Save & Publish
                        </Button>
                        <Button onClick={this.saveForm}
                                className="form-creation-btn"
                        >
                            Save
                        </Button>
                    </div>

                    <div className="form-creation-card">
                            <TextField
                            id="form-name"
                            className="form-creation-fields"
                            variant="outlined"
                            helperText={this.state.formErrors.name ? this.state.formErrors.name : "Enter Form Name"}
                            type="text"
                            error={!!this.state.formErrors.name}
                            onChange={this.handleNameChange}
                        />
                        <TextField
                            className="form-creation-fields"
                            variant="outlined"
                            helperText={this.state.formErrors.title ? this.state.formErrors.title : "Enter Form Title"}
                            size="small"
                            margin="dense"
                            type="text"
                            error={!!this.state.formErrors.title}
                            onChange={this.handleTitleChange}
                        />
                        <TextField
                            className="form-creation-fields"
                            variant="outlined"
                            helperText={this.state.formErrors.resultUrl ? this.state.formErrors.resultUrl : "Link Result URL"}
                            size="small"
                            margin="dense"
                            type="url"
                            error={!!this.state.formErrors.resultUrl}
                            onChange={this.handleResultUrlChange}
                        />
                        <div>
                            <FormFieldCreationList fields={this.state.formFields}
                                                           handleFieldRemoval={this.handleFieldRemoval}
                                                           handleMoveUp={this.handleMoveUpField}
                                                           handleMoveDown={this.handleMoveDownField}
                                                           fetchQuestion={this.fetchQuestion}
                                                           errors={this.state.fieldErrors}/>
                        </div>
                    </div>

                </FormControl>
            </div>
        )
    }
}

export default FormCreation;