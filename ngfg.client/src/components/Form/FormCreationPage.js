import React, {Component} from 'react';
import axios from 'axios';
import FormCreation from './FormCreation';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class FormCreationPage extends Component {

    render() {
        return (
        <div>
            <Button>
                Add Field
            </Button>
            <FormCreation/>
        </div>
        )
    }
}

export default FormCreationPage;