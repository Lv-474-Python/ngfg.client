import React, { Component } from 'react';
import axios from 'axios';

import {Button, Tooltip} from '@material-ui/core';

import FormItemList from './FormItemList';
import FieldItemList from './FieldItemList';
import './HomePage.scss';


const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';
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
            
        })

        axios.get(`${API_URL}/${API_VERSION}/fields/`, {
            withCredentials: true,
        }).then(res => {
            const fields = res.data.fields.reverse().slice(0, LIMIT_ITEMS_NUMBER);
            this.setState({ fields })   
        })
    }

    handleViewMoreClick = () => {
        console.log('view more click');
    }

    handleShareClick = () => {
        console.log('share click');
    }

    handleFormsTitleClick = () => {
        this.props.history.push('/forms')
    }

    handleFieldsTitleClick = () => {
        console.log('Fields title click');
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
                                    onClick={this.handleFormsTitleClick}
                            >
                                Forms
                            </Button>
                        </Tooltip>

                        <FormItemList forms={this.state.forms}
                                      onViewMoreClick={this.handleViewMoreClick}
                                      onShareClick={this.handleShareClick}
                                      
                        />
                    </div>

                    <div className="home__fields">
                        <Tooltip title="Check full list" placement="top-end" arrow>
                            <Button className="home__fields__title" 
                                    onClick={this.handleFieldsTitleClick}
                            >
                                Fields
                            </Button>
                        </Tooltip>
                        <FieldItemList fields={this.state.fields}
                                       onViewMoreClick={this.handleViewMoreClick}
                                       onShareClick={this.handleShareClick}
                        />
                    </div>

                </div>
            </div>
        );
    }
}

export default HomePage;
