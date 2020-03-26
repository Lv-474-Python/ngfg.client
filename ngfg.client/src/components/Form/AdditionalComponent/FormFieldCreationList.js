import React, {Component} from "react";
import CreateFormField from "../../Field/CreateFormField";

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
            <div>
            {
                this.props.fields.map((elem, index) =>
                        <CreateFormField field={elem}
                                         id={elem.id}
                                         position={index}
                                         addField={this.handleSendField}
                                         onRemoveClick={this.handleRemoveField}
                        />)
            }
            </div>
        )
    }

}

export default FormFieldCreationList;