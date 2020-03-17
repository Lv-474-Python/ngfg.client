import React, { Component } from 'react';
import axios from 'axios';


class FormView extends Component {
    state = {
        "id": undefined,
        "isPublished": undefined,
        "name": undefined,
        "ownerId": undefined,
        "resultUrl": undefined,
        "title": undefined,
        "fields": []
    }

    getFormData = () => {
        axios.get(`http://ngfg.com:8000/api/v1/forms/${this.props.match.params.id}`, {
            withCredentials: true,
        })
            .then(res => {
                const form = res.data;
                console.log(form);
                this.setState({ ...form })
            })
    }

    getFormFields = () => {
        axios.get(`http://ngfg.com:8000/api/v1/forms/${this.props.match.params.id}/fields`, {
            withCredentials: true,
        })
            .then(res => {
                const fields = res.data.formFields;
                console.log(fields);
                this.setState({ fields })
            })
    }

    componentDidMount() {
        this.getFormData();
        this.getFormFields();
    }

    render() {
        return (
            <div>
                id {this.state.id},
                name {this.state.name},
                {this.state.fields.map(elem => 
                    elem.field.name 
                )}
            </div>
        );
    }
}

export default FormView;
