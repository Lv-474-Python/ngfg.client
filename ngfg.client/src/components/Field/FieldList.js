import React, {Component} from 'react';
import axios from 'axios';

import FieldItem from './FieldItem';


const fieldTypes = {
    'Number': 1,
    'Text': 2,
    'TextArea': 3,
    'Radio': 4,
    'Autocomplete': 5,
    'Checkbox': 6
};


class FormList extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        'fields': []
    };

    getData = () => {
        axios.get('http://ngfg.com:8000/api/v1/fields/', {
            withCredentials: true,
        })
            .then(res => {
                this.setState({filter: this.props.filter});
                const fields = res.data.fields.filter(this.filterFields);
                this.setState({fields})
            })
    };

    filterFields = (field) => {
        if (this.props.filter.showAll) {
            return true
        }

        let type = Object.entries(fieldTypes).filter((elem) => {
                                    return elem[1] === field.fieldType})[0][0];

        return this.props.filter['show' + type];

    };

    componentDidMount() {
        this.getData();
    }

    render() {
        console.log("changes");
        return (
            <div className='field-list'>
                {
                    this.state.fields.filter(this.filterFields).map(elem =>
                        <FieldItem item={elem}
                                   key={elem.id}/>
                    )
                }
            </div>
        );
    }
}

export default FormList;