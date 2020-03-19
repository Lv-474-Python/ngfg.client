import React, { Component } from 'react';

import './NewFieldItem.scss';

import CreateWindow from '../Field/CreationWindow'


// може винести FormNewItem i NewFieldItem -> в NewItem
class NewFieldItem extends Component {

    render() {
        return (
                <CreateWindow text={'+'}/>
        );
    }
}

export default NewFieldItem;
