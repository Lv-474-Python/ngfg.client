import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import axios from 'axios'

const CALLBACK_URI = 'http://ngfg.com:8000/api/v1/auth/login/callback';

class OAuthRedirect extends Component {
    getSession = () => {
        axios.get( CALLBACK_URI + this.props.location.search, {
            withCredentials: true
        }).then((res) => {
            this.props.history.push('/')
        }).catch((error) => {
            console.log(error)
        })
    };

    componentDidMount() {
        this.getSession();
    }

    render() {
        return(
            <div></div>
        )
    }
}

export default withRouter(OAuthRedirect);