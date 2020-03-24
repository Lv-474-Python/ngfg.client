import React, { Component } from 'react';
import axios from 'axios';

import './FormPassResponse.scss';


const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';


class FormPassResponse extends Component {
    state = {
        'form': {
            id: undefined,
            name: undefined,
            title: undefined,
            resultUrl: undefined,
            isPublished: undefined,
            created: undefined,
            ownerId: undefined
        }
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

    componentDidMount() {
        this.getFormData();
    }

    render() {
        return (
            <div className='form-pass-response'>

                <div className="form-pass-response__item">
                    <div className='form-pass-response__item__title'>
                        {this.state.form.title}
                    </div>

                    <div className='form-pass-response__item__info'>
                        Your response has been recorded.
                    </div>
                </div>

            </div>
        );
    }
}

export default FormPassResponse;