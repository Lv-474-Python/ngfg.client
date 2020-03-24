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


class FieldList extends Component {

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

    handleDeleted = (deleted) => {
        if(deleted) {
            this.props.getData();
        }
    };

    handleAddField = (fieldId) => {
        console.log("From Fieldlist: " + fieldId);
        this.props.formCreationCallback(fieldId);
    }


    render() {
        return (
            <div>
                {
                    this.props.fields.filter(this.filterFields).map(elem =>
                        <FieldItem item={elem}
                                   key={elem.id}
                                   formCreation={this.props.formCreation}
                                   onAddClick={this.handleAddField}
                        />
                    ).length === 0 ? <h2 className='not-found'>Nothing found</h2> :
                        this.props.fields.filter(this.filterFields).sort(this.sortFields).map(elem =>
                        <FieldItem item={elem}
                                   key={elem.id}
                                   formCreation={this.props.formCreation}
                                   handleDeleted={this.handleDeleted}
                                   onAddClick={this.handleAddField}
                        />)
                }
            </div>
        );
    }
}

export default FieldList;