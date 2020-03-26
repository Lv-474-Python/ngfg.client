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

    handleMoveUpField = (position, disabled) => {
        this.props.moveUpField(position, disabled);
    }

    handleMoveDownField = (position, disabled) => {
        this.props.moveDownField(position, disabled);
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
                                         onMoveUpClik={this.handleMoveUpField}
                                         onMoveDownClick={this.handleMoveDownField}
                                         disableMoveUp={index==0 ? true : false}
                                         disableMoveDown={index==this.props.fields.length-1 ? true : false}
                        />)
            }
            </div>
        )
    }

}

export default FormFieldCreationList;