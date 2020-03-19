import React, { Component } from 'react';

import NewFormItem from './NewFormItem';
import FormItem from './FormItem';

import './FormItemList.scss';


class FormItemList extends Component {

    renderItems = () => {
        let forms = this.props.forms.map(elem =>
            <FormItem item={elem}
                      key={elem.id}
                      onViewMoreClick={this.props.onViewMoreClick}
                      onShareClick={this.props.onShareClick}
            />
        )
        return forms;
    }

    render() {
        this.renderItems();
        return (
            <div className="forms-list">
                <NewFormItem
                    history={this.props.history}
                />
                {this.renderItems()}
            </div>
        );
    }
}

export default FormItemList;

