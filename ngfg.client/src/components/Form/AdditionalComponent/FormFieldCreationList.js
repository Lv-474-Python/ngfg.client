import React, {Component} from "react";
import FormFieldCreate from "./FormFieldCreate";

class FormFieldCreationList extends Component {

    state = {
        fields: this.props.fields
    }

    handleSendField = (fieldId, position, question) => {
        this.props.addField(fieldId, position, question)
    }

    handleRemoveField = (position) => {
        this.props.handleFieldRemoval(position);
    }

    render() {
        return(
            <React.Fragment>
                {
                this.props.fields.map((elem, index) =>
                        <FormFieldCreate field={elem}
                                         id={elem.id}
                                         position={index}
                                         addField={this.handleSendField}
                                         removeField={this.handleRemoveField}
                        />)

            }
            </React.Fragment>
        )
    }

}

export default FormFieldCreationList;