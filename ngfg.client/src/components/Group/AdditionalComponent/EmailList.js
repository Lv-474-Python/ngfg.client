import React, {Component} from 'react';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from "@material-ui/core/FormGroup";


class EmailList extends Component {
    state = {
        count: 0,
        values: []
    };

    onChange = (event, index) => {
        let values = this.props.emails;
        values[index] = event.target.value;
        if (values[index] === "" && index !== 0) {
            values.splice(index, 1);
        }
        if (values[index] === "" && index === 0 && values[index + 1] !== "") {
            values.splice(index, 1);
        }

        this.setState({
            values
        }, () => {
            this.props.setEmails(this.state.values);
        });

    }

    componentDidMount() {
        this.setState({
            count: this.props.emails + 1,
            values: this.props.emails
        })
    }

    render() {
        return (
            <div>
                {
                    [...Array(this.props.emails.length + 1).keys()].map(index =>
                        <FormGroup className='group-create-email'>
                            <TextField label=""
                                       type="email"
                                       placeholder={"Input email"}
                                       key={index}
                                       value={this.props.emails[index] || ""}
                                       // error={!/\S+@\S+\.\S+/.test(this.props.emails[index]) || false}
                                       onChange={(event) => this.onChange(event, index)}
                            />
                        </FormGroup>
                    )
                }
            </div>
        );
    }
}

export default EmailList;