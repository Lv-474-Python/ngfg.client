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
        // console.log(forms);
        return forms;
    }

    render() {
        this.renderItems();
        return (
            <div className="forms-list">
                <NewFormItem />
                {this.renderItems()}
            </div>
        );
    }
}

export default FormItemList;

