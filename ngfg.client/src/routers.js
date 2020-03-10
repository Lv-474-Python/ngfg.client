import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom'
import {Switch, Route} from 'react-router'

import HomePage from './components/HomePage/HomePage'
import LoginPage from './components/LoginPage/LoginPage'
import Header from './components/Header/Header'


class Routers extends Component {

    render() {
        return(
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path='/login'
                        component={LoginPage}/>
                    <Route path='/'
                        component={HomePage}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routers;
