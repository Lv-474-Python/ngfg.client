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


class FormPass extends Component {
    state = {
        'formFields': []
    }

    getData = () => {
        console.log('Form pass')
        // axios.get('http://ngfg.com:8000/api/v1/forms/', {
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
        this.getData();
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