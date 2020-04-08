import React, { Component } from 'react';
import openSocket from 'socket.io-client';

import './Notification.css'
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';


const socket = openSocket('http://ngfg.com:8000')

class Notifications extends Component {

    state = {
        values: []
    }

    close = (index) => {
        let values = this.state.values;
        values.splice(index, 1)
        this.setState({values})
    }
    
    componentDidMount() {
        socket.on('message', (data) => {
            let message = data.notification;
            let values = this.state.values;
            values.push(message)
            this.setState({values})

            setTimeout(() => {
                let index = this.state.values.indexOf(message);
                if (index !== -1) {
                    this.close(index);
                }
            }, 20000) //20 seconds
        })
    }
    
    render() {
        return (
            <div className='notifications'>
            {
                
                [...Array(this.state.values.length).keys()].map(index =>
                        <Alert className='notification'
                               key={index}
                               action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => this.close(index)}>
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }>
                        {this.state.values[index]}
                        </Alert>)
            }
            </div>);
    }
}

export default Notifications;
