import React, {Component} from 'react';
import axios from 'axios';

import FieldItem from './FieldItem';
import CreateWindow from "./CreationWindow";

const fieldTypes = {
    'Number': 1,
    'Text': 2,
    'TextArea': 3,
    'Radio': 4,
    'Autocomplete': 5,
    'Checkbox': 6
};

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';


class FieldList extends Component {

    state = {
        fields: []
    };

    getData = () => {
        axios.get(`${API_URL}/${API_VERSION}/fields`, {
            withCredentials: true,
        })
            .then(res => {
                const fields = res.data.fields.filter(this.filterFields);
                this.setState({fields})
            })
    };

    filterFields = (field) => {
        if (this.props.search) {
            if (!field.name.toLowerCase().includes(this.props.search.toLowerCase())) {
                return false
            }
        }

        if (this.props.filter.showAll) {
            return true
        }

        let type = Object.entries(fieldTypes).filter((elem) => {
                                    return elem[1] === field.fieldType})[0][0];

        return this.props.filter['show' + type];

    };

    sortFields = (field1, field2) => {
        if (this.props.sort.byNameDesc !== null) {
            if (this.props.sort.byNameDesc) {
                return field1.name < field2.name
            }
            return field1.name > field2.name
        }
    };

    handleDeleted = (deleted, field) => {
        if(deleted) {
            this.getData();
        }
    };

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div>
                <CreateWindow text={'Create field'} getData={this.getData}/>
                {
                    this.state.fields.filter(this.filterFields).map(elem =>
                        <FieldItem item={elem}
                                   key={elem.id}
                                   formCreation={this.props.formCreation}
                        />
                    ).length === 0 ? <h2 className='not-found'>Nothing found</h2> :
                        this.state.fields.filter(this.filterFields).sort(this.sortFields).map(elem =>
                        <FieldItem item={elem}
                                   key={elem.id}
                                   formCreation={this.props.formCreation}
                                   handleDeleted={this.handleDeleted}
                        />)
                }
            </div>
        );
    }
}

export default FieldList;