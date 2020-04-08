import React, {Component} from 'react';
import FormView from "./FormView";
import {withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";

import './FormViewPage.css'
import axios from "axios";
import DeleteButtonForm from "./AdditionalComponent/DeleteButton";
import ShareFormModal from "../FormShare/ShareFormModal";
import {API_URL, API_VERSION} from '../../constants';


class FormViewPage extends Component {

    state = {
        "form": {
            'name': "",
            'title': "",
            'resultUrl': "",
            'isPublished': ""
        },
        "fields": []
    };

    getFormData = () => {
        axios.get(`${API_URL}/${API_VERSION}/forms/${this.props.match.params.id}`, {
            withCredentials: true,
        })
            .then(res => {
                const form = res.data;
                this.setState({form})
            })
    };

    getFormFields = () => {
        axios.get(`${API_URL}/${API_VERSION}/forms/${this.props.match.params.id}/fields`, {
            withCredentials: true,
        })
            .then(res => {
                const fields = res.data.formFields;
                this.setState({fields})
            })
    };

    handlePublish = () => {
        axios.put(
            `${API_URL}/${API_VERSION}/forms/${this.props.match.params.id}`,
            {
                'isPublished': true
            },
            {withCredentials: true}
        ).then(response => {
            this.setState({form: response.data})
        }).catch(error => {
            console.log(error)
        })

    }

    handleDelete = (deleted, item) => {
        if (deleted) {
            this.props.history.push('/forms/')
        }
    }

    componentDidMount() {
        this.getFormData();
        this.getFormFields();
    };

    handleStatusRender = () => {
        if (this.state.form.isPublished || this.state.form.isPublished === '') {
            return (
                <div>
                    <ShareFormModal form={this.state.form}
                                btnClassName="form-btn-view"
                                disableIcon/>
                    <DeleteButtonForm deleteBtnClass='form-btn-view'
                                      disableIcon={true}
                                      form={this.state.form}
                                      handleDelete={this.handleDelete}/>
                </div>
            )
        } else {
            return (
                <div>
                    <Button onClick={this.handlePublish}
                            className="form-btn-view">
                        Publish
                    </ Button>
                    <DeleteButtonForm deleteBtnClass='form-btn-view'
                                      disableIcon={true}
                                      form={this.state.form}
                                      handleDelete={this.handleDelete} />

                    <Button onClick={this.saveForm}
                            className="form-btn-view">
                        Edit
                    </ Button>
                </div>
            )
        }
    };

    render() {
        return (
            <div className="wrapper">
                <div className="side-menu-view">
                    <div className="form-btn-view-container">
                        {this.handleStatusRender()}
                    </div>
                </div>
                <FormView form={this.state.form} fields={this.state.fields}/>
            </div>
        );
    }
}

export default withRouter(FormViewPage);
