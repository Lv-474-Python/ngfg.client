import React, {Component} from 'react';
import axios from 'axios';

import FormControl from '@material-ui/core/FormControl';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

class FormCreation extends Component {
    state = {
        "name": undefined,
        "title": undefined,
        "resultUrl": undefined,
        "isPublished": false,
        "formFields": []
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value
        });
    }

    handleResultUrlChange = (event) => {
        this.setState({
           resultUrl: event.target.value
        });
    }

    handlePublish = () => {
        this.setState({
            isPublished: true
        }, this.save);
    }

    save = () => {
        axios.post(`${API_URL}/${API_VERSION}/forms/`, {
                name: this.state.name,
                title: this.state.title,
                resultUrl: this.state.resultUrl,
                isPublished: this.state.isPublished
            },
            {withCredentials: true})
            .then( res => {
                console.log(res);
                }
            )
            .catch ( error => {
                console.log(error);
                }
            );
    }


    render() {
        return(
            <div className="form-container">
                <FormControl>
                    <div className="form-btn-container">
                        <Button onClick={this.handlePublish}
                                className="form-creation-btn"
                        >
                            Publish
                        </Button>
                        <Button onClick={this.save}
                                className="form-creation-btn"
                        >
                            Save
                        </Button>
                    </div>

                    <div className="form-creation-card">
                            <TextField
                            id="form-name"
                            className="form-creation-field"
                            variant="outlined"
                            helperText="Enter Form Name"
                            type="text"
                            onChange={this.handleNameChange}
                        />
                        <TextField
                            className="form-creation-field"
                            variant="outlined"
                            helperText="Enter Form Title"
                            size="small"
                            margin="dense"
                            type="text"
                            onChange={this.handleTitleChange}
                        />
                        <TextField
                            className="form-creation-field"
                            variant="outlined"
                            helperText="Link Result URL"
                            size="small"
                            margin="dense"
                            type="url"
                            onChange={this.handleResultUrlChange}
                        />
                    </div>
                </FormControl>
            </div>
        )
    }
}

export default FormCreation;