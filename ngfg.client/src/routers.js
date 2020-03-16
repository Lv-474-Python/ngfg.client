import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router';

import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header/Header';
import FieldsPage from './components/Field/FieldsPage';
import FormList from './components/Form/FormList';
import FormView from './components/Form/FormView';
import CreateField from './components/Field/CreateField'


class Routers extends Component {

    render() {
        return(
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route path='/login'
                        component={LoginPage}
                        
                        />
                    <Route path='/forms/:id'
                        component={FormView}
                        
                        />
                    <Route path='/forms'
                        component={FormList}
                        
                        />
                    <Route path='/fields'
                           component={FieldsPage}

                        />
                    <Route path='/field'
                        component={CreateField}
                        
                        />
                    <Route path='/'
                        component={HomePage}
                        
                        />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routers;
