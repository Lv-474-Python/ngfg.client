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

    getName = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    getTitle = (event) => {
        this.setState({
            title: event.target.value
        });
    }

    getResultUrl = (event) => {
        this.setState({
           resultUrl: event.target.value
        });
    }

    publish = (event) => {
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
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        console.log(data);
    }


    render() {
        return(
            /*<div>
                <FormControl>
                    <TextField
                        label="Enter Form Name:"
                        type="text"
                        onChange={this.getName}
                    />
                    <TextField
                        label="Enter Form Title"
                        type="text"
                        onChange={this.getTitle}
                    />
                    <TextField
                        label="Link Result URL"
                        type="url"
                        onChange={this.getResultUrl}
                    />
                    {console.log(this.state)}
                    {console.log(typeof(this.state))}
                    <Button onClick={this.publish}>
                        Publish
                    </Button>
                    <Button onClick={this.save}>
                        Save
                    </Button>
                </FormControl>
            </div> */
              <form onSubmit={this.handleSubmit}>
                  <TextField name="name"
                             label="Enter Form Name"
                             type="text"
                  />
                  <TextField name="title"
                             label="Enter Form Title"
                             type="text"
                  />
                  <TextField name="resultUrl"
                             label="Enter Result Url"
                             type="url"
                  />
                  <Button type="submit">
                      Save
                  </Button>
              </form>
        )
    }

}

export default FormCreation;