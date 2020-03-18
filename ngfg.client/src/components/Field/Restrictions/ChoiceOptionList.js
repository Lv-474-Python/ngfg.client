import React, { Component } from 'react';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class ChoiceOptionList extends Component {
    state = {
        count: 1,
        values: this.props.choiceOptions
    }

    countUp = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    onChange = (event, index)  => {
        let values = this.state.values;
        values[index] = event.target.value;

        this.setState({
            values
        }, () => {
            this.props.setOptions(this.state.values);
        } );

    }

    render() {
        console.log(this.state);
        return (
            <div>
                {
                    
                    [...Array(this.state.count).keys()].map(index =>
                        <TextField label=""
                                    type="text"
                                    onChange={(event) => this.onChange(event, index)}
                            />
                    )
                }
                
                <Button onClick={this.countUp}>
                    Add option
                </Button>
            </div>
        );
    }
}

export default ChoiceOptionList;
