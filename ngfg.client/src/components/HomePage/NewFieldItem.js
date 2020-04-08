import React, { Component } from 'react';

import './NewFieldItem.scss';

import FieldCreationWindow from '../Field/CreationWindow'


// може винести FormNewItem i NewFieldItem -> в NewItem
class NewFieldItem extends Component {

    render() {
        return (
                <FieldCreationWindow text={'+'} getData={this.props.getData}/>
        );
    }
}

export default NewFieldItem;
