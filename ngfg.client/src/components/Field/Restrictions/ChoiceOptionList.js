import React, {Component} from 'react';


import {FormGroup, TextField} from "@material-ui/core";


class ChoiceOptionList extends Component {
    state = {
        count: 1,
        values: []
    }

    onChange = (event, index) => {
        let values = this.props.choiceOptions;
        values[index] = event.target.value;
        if ((values[index] === "" && index !== 0) ||
            (values[index] === "" && index === 0 && values[index + 1] !== "")) {
            values.splice(index, 1);
        }

        this.setState({
            values
        }, () => {
            this.props.setOptions(this.state.values);
        });

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
                        <FormGroup className='group-create-email'>
                            <TextField label="Option"
                                       type="text"
                                       fullWidth
                                       variant="outlined"
                                       placeholder={"Enter option"}
                                       key={index}
                                       value={this.props.choiceOptions[index] || ""}
                                       onChange={(event) => this.onChange(event, index)}
                            />
                        </FormGroup>
                    )
                }
            </div>
        );
    }
}

export default ChoiceOptionList;
