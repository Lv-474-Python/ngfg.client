import React, {Component} from "react";
import {TextField} from "@material-ui/core";
import FormViewField from "./FormViewField";
import './FormViewFieldList.css'

class FormViewFieldList extends Component {

    state = {
        questions: []
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.fields.map((elem, index) =>
                        <div className="form-view-fields-container">
                            <TextField variant="outlined"
                                       label={elem.field.name}
                                       size="small"
                                       type="text"
                                       inputProps={{
                                           readOnly: true
                                       }}
                                       className="form-view-fields"
                                       value={elem.question}
                            />
                            <FormViewField field={elem.field}
                                           id={elem.field.id}
                                           position={index}
                            /></div>)
                }
            </React.Fragment>
        )
    }

}

export default FormViewFieldList;