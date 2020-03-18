import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router';

import HomePage from './components/HomePage/HomePage';
import Header from './components/Header/Header';
import FieldsPage from './components/Field/FieldsPage';
import FormList from './components/Form/FormList';
import FormView from './components/Form/FormView';
import CreateField from './components/Field/CreateField';
import OAuthRedirect from './components/OAuthRedirect/OAuthRedirect';
import FormCreationPage from "./components/Form/FormCreationPage";


class Routers extends Component {

    render() {
        return(
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route path='/form'
                           component={FormCreationPage}
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
                    <Route path='/fields'
                           component={FieldsPage}

                        />
                    <Route path='/field'
                           component={CreateField}

                    />
                    <Route path='/oauth/redirect'
                           component={OAuthRedirect}
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
