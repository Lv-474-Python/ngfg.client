import React, { Component } from 'react';
import axios from 'axios';


// поки хай буде, там видалю якщо шо
const FIELD_TYPES = {
    1: 'Number',
    2: 'Text',
    3: 'TextArea',
    4: 'Radio',
    5: 'Autocomplete',
    6: 'Checkbox'
}

// не забудь
// - routers додати то
// сортую по позиціям

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

http://ngfg.com:8000/api/v1/forms/57/fields/

class FormPass extends Component {
    state = {
        'form': undefined,
        'formFields': []
    }

    getFormData = () => {
        console.log('Form pass')
        // let id = this.props.match.params.id;
        let id = 57;

        // axios.get(`${API_URL}/${API_VERSION}/forms/${id}/`, {
        //     withCredentials: true,
        // }).then(res => {
        //         const forms = res.data.forms;
        //         console.log(forms);
        //         this.setState({forms})
        // }).catch(error => {
        //     console.log(error);
        // })
    }

    getFormFieldsData = () => {
        console.log('Form fields')
        // let id = this.props.match.params.id;
        let id = 57

        // axios.get(`${API_URL}/${API_VERSION}/forms/${id}/fields`, {
        //     withCredentials: true,
        // }).then(res => {
        //         const forms = res.data.forms;
        //         console.log(forms);
        //         this.setState({forms})
        // }).catch(error => {
        //     console.log(error);
        // })
    }
    
    renderFields = () => {
        // може інакше придумай обхід
        let formFields = []
        for (let i = 0; i < this.state.formFields.length; ++i) {
            // тут іфки різні і .push() до масиву
            // або взагалі
            // let item = this.getFieldItemByType()
            // formFields.push(item);
        }
        return formFields
    }

    getFieldItemByType = () => {
        // тут іфки
        console.log('getFieldItemByType method');
    }

    componentDidMount() {
        this.getFormData();
        this.getFormFieldsData();
    }

    render() {
        return (
            <div className='form-pass'>

                <div className='form-pass__title'>

                </div>
                <div className='form-pass__fields'>
                    { this.renderFields() }
                </div>
                <div className='form-pass__submit'>

                </div>

            </div>
        );
    }
}

export default FormPass;