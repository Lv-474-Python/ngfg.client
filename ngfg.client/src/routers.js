import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router';

import HomePage from './components/HomePage/HomePage';
import Header from './components/Header/Header';
import FieldsPage from './components/Field/FieldsPage';
import FormList from './components/Form/FormList';
import FormPass from './components/FormPass/FormPass';
import FormPassResponse from './components/FormPass/FormPassResponse';
import FormView from './components/Form/FormView';
import CreateField from './components/Field/CreateField';
import OAuthRedirect from './components/OAuthRedirect/OAuthRedirect';
import FormCreationPage from "./components/Form/FormCreationPage";
import GroupList from './components/Group/GroupList'
import GroupView from "./components/Group/GroupView";
import Notifications from './components/Notifications/Notifications'
import FormEditPage from "./components/Form/FormEditPage";

class Routers extends Component {

    render() {
        return(
            <BrowserRouter>
                <Header/>
                <Notifications/>
                <Switch>
                    <Route path='/' exact
                           component={HomePage}
                    />

                    <Route path='/forms/:id'
                           component={FormView}
                    />

                    <Route path='/forms'
                           component={FormList}
                    />

                    <Route path='/form'
                           component={FormCreationPage}
                    />

                    <Route path='/edit-form/:id'
                           component={FormEditPage}
                    />

                    <Route path='/fields'
                           component={FieldsPage}
                    />

                    <Route path='/field'
                           component={CreateField}
                    />

                    <Route path='/pass-form/:id/response'
                            component={FormPassResponse}
                    />

                    <Route path='/pass-form/:id'
                            component={FormPass}
                    />

                    <Route path='/oauth/redirect'
                           component={OAuthRedirect}
                    />

                    <Route path='/groups/:id'
                        component={GroupView}
                    />

                    <Route path='/groups'
                        component={GroupList}
                    />

                    {/* <Route component={GroupList}>
                    </Route> */}
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routers;
