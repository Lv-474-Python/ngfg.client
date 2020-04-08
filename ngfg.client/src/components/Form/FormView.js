import React, {Component} from 'react';

import {TextField, FormControl} from "@material-ui/core";
import FormViewFieldList from "./FormViewFieldList";
import {withRouter} from "react-router-dom";

import "./FormView.css"


class FormView extends Component {

    handlePublishTest = () => {
        return this.props.form.isPublished ? "Published" : "Draft"
    }

    render() {
        return (
            <div className="form-container-view">
                <FormControl>
                    <div className="form-creation-card">
                        <TextField
                            id="form-name"
                            inputProps={{
                                readOnly: true
                            }}
                            label={'Name'}
                            className="form-view-fields"
                            variant="outlined"
                            type="text"
                            value={this.props.form.name}
                        />
                        <TextField
                            className="form-view-fields"
                            variant="outlined"
                            inputProps={{
                                readOnly: true
                            }}
                            label={'Title'}
                            size="small"
                            margin="dense"
                            type="text"
                            value={this.props.form.title}
                        />
                        <TextField
                            className="form-view-fields"
                            variant="outlined"
                            inputProps={{
                                readOnly: true
                            }}
                            label={'Result Url'}
                            size="small"
                            margin="dense"
                            type="url"
                            value={this.props.form.resultUrl}
                        />

                        <TextField
                            className="form-view-fields"
                            variant="outlined"
                            inputProps={{
                                readOnly: true
                            }}
                            label={'Status'}
                            size="small"
                            margin="dense"
                            type="url"
                            value={this.props.form.isPublished !== "" ? this.handlePublishTest() : ''}
                        />
                        <div>
                            <FormViewFieldList fields={this.props.fields}
                            />
                        </div>
                    </div>

                </FormControl>
            </div>
        )
    }
}


export default withRouter(FormView);