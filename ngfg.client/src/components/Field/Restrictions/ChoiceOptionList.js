import React, { Component } from 'react';


import TextField from '@material-ui/core/TextField';


class ChoiceOptionList extends Component {
    state = {
        count: 1,
        values: []
    }

    onChange = (event, index)  => {
        let values = this.props.choiceOptions;
        values[index] = event.target.value;
        if (values[index] === "" && index !== 0) {
            values.splice(index, 1);
        }

        this.setState({
            values
        }, () => {
            this.props.setOptions(this.state.values);
        } );

    }

    componentDidMount() {
        this.setState({
            count: this.props.choiceOptions + 1,
            values: this.props.choiceOptions
        })
    }

    render() {
        return (
            <div>
                {
                    [...Array(this.props.choiceOptions.length + 1).keys()].map(index =>
                        <TextField label=""
                                    type="text"
                                    key={index}
                                    value={this.props.choiceOptions[index] || ""}
                                    onChange={(event) => this.onChange(event, index)}
                            />
                    )
                }
            </div>
        );
    }
}

export default ChoiceOptionList;
