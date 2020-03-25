import React, {Component} from "react";
import FormFieldCreate from "./FormFieldCreate";

class FormFieldCreationList extends Component {
    status = {
        "saved": false
    }

    render() {
        console.log("Is Form saved?", this.props.saved);
        return(
            <React.Fragment>
            {
                this.props.fields.map((elem, index) =>
                        <FormFieldCreate field={elem}
                                         id={elem.id}
                                         position={index}
                        />)
            }
                {this.props.saved ? "Saved" : "Not saved"}
            </React.Fragment>
        )
    }

}

export default FormFieldCreationList;