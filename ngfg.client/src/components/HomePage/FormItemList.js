import React, { Component } from 'react';

import NewFormItem from './NewFormItem';
import FormItem from './FormItem';

import './FormItemList.scss';


class FormItemList extends Component {

    render() {
        return (
            <div className="forms__list">
                <NewFormItem />
                <FormItem onViewMoreClick={this.props.onViewMoreClick}
                          onShareClick={this.props.onShareClick}
                />
            </div>
        );
    }
}

export default FormItemList;
