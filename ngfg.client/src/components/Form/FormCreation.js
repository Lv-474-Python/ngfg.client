import React, {Component} from 'react';
import axios from 'axios';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {InputLabel, Input, TextField} from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import Button from "@material-ui/core/Button";

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

    handlePublish = (event) => {
        this.setState({
            isPublished: true
        });
    }

    save = () => {
        axios.post('http://ngfg.com:8000/api/v1/forms/', {
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

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        this.setState({...data});
        axios.post('http://ngfg.com:8000/api/v1/forms/',
            {
                name: this.state.name,
                title: this.state.title,
                resultUtl: this.state.resultUrl,
                isPublished: this.state.isPublished
            },
            {withCredentials: true})
            .then ( res => {
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
                    <TextField
                        label="Enter Form Name:"
                        type="text"
                        onChange={this.handleNameChange}
                    />
                    <TextField
                        label="Enter Form Title"
                        type="text"
                        onChange={this.handleTitleChange}
                    />
                    <TextField
                        label="Link Result URL"
                        type="url"
                        onChange={this.handleResultUrlChange}
                    />
                    <Button onClick={this.handlePublish}>
                        Publish
                    </Button>
                    <Button onClick={this.save}>
                        Save
                    </Button>
                </FormControl>
            </div>
        )
    }

}

export default FormCreation;