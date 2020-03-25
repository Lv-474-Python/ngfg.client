import React, {Component} from "react";
import FieldItem from "../../Field/FieldItem";
import TextField from "@material-ui/core/TextField";
import '../Form.css'

class FormFieldCreate extends Component {

    state = {
        question: undefined,
    }

    handleAddition = () => {
        this.props.addField(this.props.field.id, this.props.position, this.state.question);
    }

    sendField = (event) => {
        this.setState({question: event.target.value},
            this.handleAddition);
    }

    handleRemoval = () => {
        this.props.removeField(this.props.position)
    }

    render() {
        return(
            <React.Fragment>
                <TextField variant="outlined"
                           helperText={`Enter question for ${this.props.field.name}`}
                           size="small"
                           type="text"
                           value={this.state.question}
                           className="form-creation-fields"
                           onChange={this.sendField}
                />
                <FieldItem  item={this.props.field}
                            key={this.props.field.id}
                            formField={true}
                            onRemoveClick={this.handleRemoval}
                />
            </React.Fragment>
        );
    }

}

export default FormFieldCreate;