import React, { Component } from 'react';
import axios from 'axios';

import { Button, Tooltip } from '@material-ui/core';

import FormItemList from './FormItemList';
import FieldItemList from './FieldItemList';
import './HomePage.scss';
import {API_URL, API_VERSION} from '../../constants';

const LIMIT_ITEMS_NUMBER = 5;


class HomePage extends Component {
    state = {
        forms: [],
        fields: []
    }

    getData = () => {

        axios.get(`${API_URL}/${API_VERSION}/forms/`, {
            withCredentials: true,
        }).then(res => {
            const forms = res.data.forms.reverse().slice(0, LIMIT_ITEMS_NUMBER);
            this.setState({ forms })
        }).catch(error => {
            console.log(error);
        })

        axios.get(`${API_URL}/${API_VERSION}/fields/`, {
            withCredentials: true,
        }).then(res => {
            const fields = res.data.fields.reverse().slice(0, LIMIT_ITEMS_NUMBER);
            this.setState({ fields })
        }).catch(error => {
            console.log(error);
        })
    }

    handleViewMoreClick = (form_id) => {
        this.props.history.push(`/forms/${form_id}`)
    }

    handleShareClick = () => {
        console.log('share click');
    }

    handleFormsTitleClick = () => {
        this.props.history.push('/forms')
    }

    handleFieldsTitleClick = () => {
        this.props.history.push('/fields')
    }

    handleViewMoreFieldClick = () => {
        console.log("View More Field")
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div className="home">
                <div className="home__title">
                    New generation Form generator welcomes you
                </div>
                <div className="home__content">

                    <div className="home__forms">
                        {/* Це посиланням має бути */}
                        <Tooltip title="Check full list" placement="top-end" arrow>
                            <Button className="home__forms__title" 
                                    onClick={this.handleFormsTitleClick}>
                                Forms
                            </Button>
                        </Tooltip>

                        <FormItemList forms={this.state.forms}
                                      onViewMoreClick={this.handleViewMoreClick}
                                      onShareClick={this.handleShareClick}
                                      history = {this.props.history}
                                      
                        />
                    </div>

                    <div className="home__fields">
                        <Tooltip title="Check full list" placement="top-end" arrow>
                            <Button className="home__fields__title" 
                                    onClick={this.handleFieldsTitleClick}>
                                Fields
                            </Button>
                        </Tooltip>
                        <FieldItemList fields={this.state.fields}
                                       onViewMoreClick={this.handleViewMoreFieldClick}
                                       onShareClick={this.handleShareClick}
                                       getData={this.getData}
                        />
                    </div>

                </div>
            </div>
        );
    }
}

export default HomePage;
