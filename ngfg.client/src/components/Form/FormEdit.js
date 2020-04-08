import React, {Component} from 'react';
import axios from 'axios';

import FormControl from '@material-ui/core/FormControl';
import {Button, TextField} from "@material-ui/core";
import FormFieldCreationList from "./AdditionalComponent/FormFieldCreationList";

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

class FormEdit extends Component {

    state = {
        "id": undefined,
        "name": undefined,
        "title": undefined,
        "resultUrl": undefined,
        "isPublished": undefined,
        "formFields": [],
        "initialFormFields": [],
        "formErrors": [],
        "fieldErrors": []
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.addedFields !== this.props.addedFields) {
            let formFields = this.state.formFields;
            formFields.push(this.props.addedFields);
            this.setState({formFields});
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

    getFormData = () => {
        axios.get(`${API_URL}/${API_VERSION}/forms/${this.props.formId}`, {
            withCredentials: true
        })
            .then(res => {
                let form = res.data;
                this.setState({
                    id: form.id,
                    name: form.name,
                    title: form.title,
                    resultUrl: form.resultUrl,
                    isPublished: form.isPublished})
            })
    }

    getFormFieldsData = () => {
        axios.get(`${API_URL}/${API_VERSION}/forms/${this.props.formId}/fields`, {
            withCredentials: true
        })
            .then(res=> {
                let formFields = res.data.formFields;
                this.setState({formFields: formFields.sort((a,b)=>a.position-b.position)});
                this.setState({initialFormFields: [...formFields]});
            })
    }

    componentDidMount() {
        this.getFormData();
        this.getFormFieldsData();
    }

    saveFormFields = (formField, position) => {
        if (formField.added===true) {
            this.postFormField(formField, position);
        } else {
            this.putFormField(formField);
        }
        this.props.history.push(`/forms/${this.state.id}`)
    }

    postFormField = (formField, position) => {
        axios.post(`${API_URL}/${API_VERSION}/forms/${this.state.id}/fields/`, {
            fieldId: formField.field.id,
            question: formField.question,
            position: position
        }, {withCredentials: true})
            .then(res=>{
                console.log(res);
            })
            .catch(error=>{
                let response = error.response.data.message;
                response.position = parseInt(position);
                let fieldErrors = this.state.fieldErrors;
                fieldErrors[position] = response;
                this.setState({fieldErrors});
            })
    }

    putFormField = (formField, position) => {
        axios.put(`${API_URL}/${API_VERSION}/forms/${this.state.id}/fields/${formField.id}`,
            {
                fieldId: formField.field.id,
                question: formField.question,
                position: position
            }, {withCredentials: true})
            .then(res=>{
                console.log(res)
            })
            .catch(error=>{
                let response = error.response.data.message;
                response.position = parseInt(formField.position);
                let fieldErrors = this.state.fieldErrors;
                fieldErrors[formField.position] = response;
                this.setState({fieldErrors});
            })
    }

    deleteFormField = (formField) => {
        if (!this.state.formFields.includes(formField)) {
            axios.delete(`${API_URL}/${API_VERSION}/forms/${this.state.id}/fields/${formField.id}`,
                {withCredentials: true})
                .then(res=>{
                    console.log(res);
                })
                .catch(error=>{
                    console.log(error);
                })
        }
    }

    saveForm = () => {
        this.setState({formErrors: {}});
        this.setState({fieldErrors: {}});
        axios.put(`${API_URL}/${API_VERSION}/forms/${this.state.id}`, {
                name: this.state.name,
                title: this.state.title,
                resultUrl: this.state.resultUrl,
                isPublished: this.state.isPublished
            },
            {withCredentials: true})
            .then( res => {
                    console.log(res);
                    Object.entries(this.state.initialFormFields).map(([key, value])=>(
                        this.deleteFormField(value)
                    ));
                    Object.entries(this.state.formFields).map(([key, value]) => (
                        this.saveFormFields(value, key)
                    ));
                }
            )
            .catch ( error => {
                let response = error.response.data.message;
                this.setState({formErrors: {...response}});
                }
            );
    }

    handleFieldRemoval = (position) => {
        let formFields = this.state.formFields;
        formFields = formFields.slice(0, position).concat(formFields.slice(position+1, formFields.length));
        this.setState({formFields: formFields})
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
                            value={this.state.name}
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
                            value={this.state.title}
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
                            value={this.state.resultUrl}
                            onChange={this.handleResultUrlChange}
                        />
                        <div>
                            <FormFieldCreationList fields={this.state.formFields}
                                                   handleFieldRemoval={this.handleFieldRemoval}
                                                   handleMoveUp={this.handleMoveUpField}
                                                   handleMoveDown={this.handleMoveDownField}
                                                   fetchQuestion={this.fetchQuestion}
                                                   errors={this.state.fieldErrors}
                            />
                        </div>
                    </div>
                </FormControl>
            </div>
        )
    }
}

export default FormEdit;