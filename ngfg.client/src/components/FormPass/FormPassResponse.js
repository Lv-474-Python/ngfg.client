import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import './FormPassResponse.scss';


const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';


class FormPassResponse extends Component {
    state = {
        form: {
            id: undefined,
            name: undefined,
            title: undefined,
            resultUrl: undefined,
            isPublished: undefined,
            created: undefined,
            ownerId: undefined
        },
        isFormAvailable: false,
        formAvailableError: undefined
    }

    decodeToken = (token) => {
        const decodedData = jwt_decode(token);
        return decodedData;
    }

    getFormData = (id) => {
        axios.get(`${API_URL}/${API_VERSION}/forms/${id}`, {
            withCredentials: true,
        }).then(res => {
            const form = res.data;
            this.setState({ form })
        }).catch(error => {
            console.log(error);
        })
    }

    handleToken = () => {
        let token = String(this.props.match.params.token);

        axios.get(`${API_URL}/${API_VERSION}/tokens/${token}/check_token`
        ).then(() => {
            let tokenData = this.decodeToken(token);

            // should I clear formAvailableError ?
            this.setState({isFormAvailable: true})

            const form_id = tokenData.form_id;
            this.getFormData(form_id);

        }).catch(error => {
            console.log(error);

            this.setState({
                isFormAvailable: false,
                formAvailableError: "Sorry, requested form doesn't exist"
            })
        })
    }

    renderResponseItem = () => {
        let title = null;
        let result = [];

        if (this.state.isFormAvailable) {
            title = this.state.form.title;
            result.push(
                <div className='form-pass-response__item__info' 
                     key='info'>
                    Your response has been recorded.
                </div>
            );
        } else {
            title = this.state.formAvailableError;
        }

        result.unshift(
            <div className='form-pass-response__item__title' 
                 key='title'>
                {title}
            </div>
        );

        return result;
    }

    componentDidMount() {
        this.handleToken();
    }

    render() {
        console.log(this.state);

        return (
            <div className='form-pass-response'>

                <div className="form-pass-response__item">

                    {this.renderResponseItem()}

                </div>

            </div>
        );
    }
}

export default FormPassResponse;