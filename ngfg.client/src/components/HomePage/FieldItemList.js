import React, { Component } from 'react';

import NewFieldItem from './NewFieldItem';
import FieldItem from './FieldItem';

import './FieldItemList.scss';


class FieldItemList extends Component {

    renderItems = () => {
        let fields = this.props.fields.map(elem =>
            <FieldItem item={elem}
                       key={elem.id}
                       onViewMoreClick={this.props.onViewMoreClick}
                       onShareClick={this.props.onShareClick}
            />
        )
        return fields;
    }

    render() {
        return (
            <div className="fields-list">
                <NewFieldItem />
                {this.renderItems()}
            </div>
        );
    }
}

export default FieldItemList;
