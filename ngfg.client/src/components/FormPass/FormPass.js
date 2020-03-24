import React, { Component } from 'react';
import axios from 'axios';

import { Button } from '@material-ui/core';

import FieldNumberPass from './FieldNumberPass';
import FieldTextPass from './FieldTextPass';
import FieldTextareaPass from './FieldTextareaPass';
import FieldRadioPass from './FieldRadioPass';
import FieldCheckboxPass from './FieldCheckboxPass';
import FieldAutocompletePass from './FieldAutocompletePass';
import './FormPass.scss';


const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';


class FormPass extends Component {
    state = {
        'form': {
            id: undefined,
            name: undefined,
            title: undefined,
            resultUrl: undefined,
            isPublished: undefined,
            created: undefined,
            ownerId: undefined
        },
        'formFields': [],
        'results': []
    }

    getFormData = () => {
        let id = this.props.match.params.id;

        axios.get(`${API_URL}/${API_VERSION}/forms/${id}`, {
            withCredentials: true,
        }).then(res => {
            const form = res.data;
            this.setState({ form })
        }).catch(error => {
            console.log(error);
        })
    }

    sortFormFieldsComparer = (field1, field2) => {
        return field1.position > field2.position;
    }

    setResultState = (formFields) => {
        let results = [];
        for (let i = 0; i < formFields.length; ++i) {
            let resultItem = {
                position: formFields[i].position,
                answer: undefined,
                isValid: true
            };
            results.push(resultItem);
        }
        this.setState({ results });
    }

    getFormFieldsData = () => {
        let id = this.props.match.params.id;

        axios.get(`${API_URL}/${API_VERSION}/forms/${id}/fields/`, {
            withCredentials: true,
        }).then(res => {
            let formFields = res.data.formFields;
            formFields = formFields.sort(this.sortFormFieldsComparer);
            this.setState({ formFields })
            this.setResultState(formFields);
        }).catch(error => {
            console.log(error);
        })
    }

    setAnswer = (index, answer) => {
        let { results } = this.state;
        results[index].answer = answer;
        this.setState({ results })
    }

    setIsValid = (index, isValid) => {
        let { results } = this.state;
        results[index].isValid = isValid;
        this.setState({ results })
    }

    getFieldItemByType = (formField, index) => {
        let result = null;
        let resultItem = this.state.results[index];
        const isValid = resultItem ? resultItem.isValid : true;

        
        switch (formField.field.fieldType) {
            case 1:
                result = (
                    <FieldNumberPass key={formField.id}
                                     formField={formField}
                                     index={index}
                                     setAnswer={this.setAnswer}
                                     setIsValid={this.setIsValid}
                                     isValid={isValid}
                    />
                );
                break;
            case 2:
                result = (
                    <FieldTextPass key={formField.id}
                                   formField={formField}
                                   index={index}
                                   setAnswer={this.setAnswer}
                                   setIsValid={this.setIsValid}
                                   isValid={isValid}
                    />
                );
                break;
            case 3:
                result = (
                    <FieldTextareaPass key={formField.id}
                                       formField={formField}
                                       index={index}
                                       setAnswer={this.setAnswer}
                                       setIsValid={this.setIsValid}
                                       isValid={isValid}
                    />
                );
                break;
            case 4:
                result = (
                    <FieldRadioPass key={formField.id}
                                    formField={formField}
                                    index={index}
                                    setAnswer={this.setAnswer}
                                    setIsValid={this.setIsValid}
                                    isValid={isValid}
                    />
                );
                break;
            case 5:
                result = (
                    <FieldAutocompletePass key={formField.id} 
                                           formField={formField}
                                           index={index}
                                           setAnswer={this.setAnswer}
                                           setIsValid={this.setIsValid}
                                           isValid={isValid}
                    />
                );
                break;
            case 6:
                result = (
                    <FieldCheckboxPass key={formField.id}
                                       formField={formField}
                                       index={index}
                                       setAnswer={this.setAnswer}
                                       setIsValid={this.setIsValid}
                                       isValid={isValid}
                    />
                );
                break;
            default:
                break;
        }
        return result
    }

    renderFields = () => {
        let formFields = []
        for (let i = 0; i < this.state.formFields.length; ++i) {
            let item = this.getFieldItemByType(this.state.formFields[i], i);
            formFields.push(item);
        }
        return formFields
    }

    componentDidMount() {
        this.getFormData();
        this.getFormFieldsData();
    }

    validateResults = () => {
        let { results } = this.state;

        let resultsIsValid = true;
        for (let i = 0; i < results.length; ++i) {
            let result = results[i];
            if (!result.isValid || !result.answer) {
                result.isValid = false;
                resultsIsValid = false;
            }
            results[i] = result;
        }
        this.setState({ results });

        return resultsIsValid;
    }

    getResultsToSubmit = () => {
        let results = [];
        for (let i = 0; i < this.state.results.length; ++i) {
            const resultsItem = {
                position: this.state.formFields[i].position,
                answer: this.state.results[i].answer
            }
            results.push(resultsItem);
        }
        return results;
    }

    submitForm = () => {
        const isValid = this.validateResults();
        if (isValid) {
            const results = this.getResultsToSubmit();

            axios.post(`${API_URL}/${API_VERSION}/forms/${this.state.form.id}/answers`, {
                answers: results,
            }, {
                withCredentials: true,
            }).then(res => {
                this.props.history.push(`${this.props.history.location.pathname}/response`);
            }).catch(error => {
                console.log(error);
            });
        }
    }

    render() {
        return (
            <div className='form-pass'>

                <div className='form-pass__title'>
                    {this.state.form.title}
                </div>

                <div className='form-pass__fields'>
                    {this.renderFields()}
                </div>

                <div>
                    <Button className='form-pass__submit'
                            onClick={this.submitForm}>
                        Submit
                    </Button>
                </div>

            </div>
        );
    }
}

export default FormPass;