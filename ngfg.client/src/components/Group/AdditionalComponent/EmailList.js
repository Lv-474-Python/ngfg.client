import React, {Component} from 'react';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from "@material-ui/core/FormGroup";


// class EmailList extends Component {
//     state = {
//         count: 1,
//         values: this.props.emails
//     };
//
//     countUp = () => {
//         this.setState({
//             count: this.state.count + 1
//         })
//     };
//
//     onChange = (event, index) => {
//         let values = this.state.values;
//         values[index] = event.target.value;
//
//         this.setState({
//             values
//         }, () => {
//             this.props.setEmails(this.state.values);
//         });
//
//     };
//
//     render() {
//         console.log(this.state);
//         return (
//             <div>
//                 {
//
//                     [...Array(this.state.count).keys()].map(index =>
//                             <TextField label="Enter email"
//                                        type="email"
//                                        fullWidth
//                                        onChange={(event) => this.onChange(event, index)}
//                             />
//                     )
//                 }
//                 <Button onClick={this.countUp}>
//                     Add email
//                 </Button>
//             </div>
//         );
//     }
// }


class EmailList extends Component {
    state = {
        count: 1,
        values: []
    }

    onChange = (event, index)  => {
        let values = this.props.emails;
        values[index] = event.target.value;
        if (values[index] === "" && index !== 0) {
            values.splice(index, 1);
        }

        this.setState({
            values
        }, () => {
            this.props.setEmails(this.state.values);
        } );

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
                        <TextField label=""
                                    type="text"
                                    key={index}
                                    value={this.props.emails[index] || ""}
                                    onChange={(event) => this.onChange(event, index)}
                            />
                    )
                }
            </div>
        );
    }
}

export default EmailList;