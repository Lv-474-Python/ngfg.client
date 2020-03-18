import React, { Component } from 'react';
import axios from 'axios';

import FormItem from './FormItem';


class FormList extends Component {
    state = {
        'forms': []
    }

    getData = () => {
        axios.get('http://ngfg.com:8000/api/v1/forms/', {
            withCredentials: true,
        })
            .then(res => {
                const forms = res.data.forms;
                console.log(forms);
                this.setState({forms})
            })
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div className='form-list'>
                {
                    this.state.forms.map(elem =>
                        <FormItem item={elem}
                                  key={elem.id} />
                    )
                }
            </div>
        );
    }
}

export default FormList;
