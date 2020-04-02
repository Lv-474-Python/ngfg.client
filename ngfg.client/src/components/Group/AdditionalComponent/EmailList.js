import React, { Component } from 'react';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class EmailList extends Component {
    state = {
        count: 1,
        values: this.props.emails
    };

    countUp = () => {
        this.setState({
            count: this.state.count + 1
        })
    };

    onChange = (event, index)  => {
        let values = this.state.values;
        values[index] = event.target.value;

        this.setState({
            values
        }, () => {
            this.props.setEmails(this.state.values);
        } );

    };

    render() {
        console.log(this.state);
        return (
            <div>
                {

                    [...Array(this.state.count).keys()].map(index =>
                        <TextField label=""
                                    type="email"
                                    onChange={(event) => this.onChange(event, index)}
                            />
                    )
                }
                <Button onClick={this.countUp}>
                    Add email
                </Button>
            </div>
        );
    }
}

export default EmailList;
