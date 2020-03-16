import React, { Component } from 'react';

import NewFieldItem from './NewFieldItem';
import FieldItem from './FieldItem';

import './FieldItemList.scss';


class FieldItemList extends Component {

    render() {
        return (
            <div className="fields__list">
                <NewFieldItem />
                <FieldItem onViewMoreClick={this.props.onViewMoreClick}
                           onShareClick={this.props.onShareClick}
                />
            </div>
        );
    }
}

export default FieldItemList;
