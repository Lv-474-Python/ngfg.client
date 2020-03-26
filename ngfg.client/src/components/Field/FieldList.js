import React, {Component} from 'react';

import FieldItem from './FieldItem';


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

        let type = Object.entries(fieldTypes).filter((elem) => {
            return elem[1] === field.fieldType})[0][0];

        if (!this.props.filter.showAll) {
            if(!this.props.filter['show' + type]) {
                return false
            }
        }

        if (!this.props.shared.all) {
            if (this.props.shared.shared) {
                if (field.owner.current) {
                    return false
                }
            }
    
            if (this.props.shared.my) {
                if (!field.owner.current) {
                    return false
                }
            }
        }
        return true;

    };

    sortFields = (field1, field2) => {
        if (this.props.sort.byNameDesc !== null) {
            if (this.props.sort.byNameDesc) {
                return field1.name.toLowerCase().localeCompare(field2.name.toLowerCase())
            }
            return field2.name.toLowerCase().localeCompare(field1.name.toLowerCase())
        }
    };

    handleUpdated = (updated) => {
        if(updated) {
            this.props.getData();
        }
    };

    render() {
        return (
            <div>
                {
                    this.props.fields.filter(this.filterFields).map(elem =>
                        <FieldItem item={elem}
                                   key={elem.id}
                                   formCreation={this.props.formCreation}
                        />
                    ).length === 0 ? <h2 className='not-found'>Nothing found</h2> :
                        this.props.fields.filter(this.filterFields).sort(this.sortFields).map(elem =>
                        <FieldItem item={elem}
                                   key={elem.id}
                                   formCreation={this.props.formCreation}
                                   handleUpdated={this.handleUpdated}
                        />)
                }
            </div>
        );
    }
}

export default FieldList;