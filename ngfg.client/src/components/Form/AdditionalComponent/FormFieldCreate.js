import React, {Component} from "react";
import axios from 'axios';
import FieldItem from "../../Field/FieldItem";
import TextField from "@material-ui/core/TextField";
import '../Form.css'

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

class FormFieldCreate extends Component {

    state = {
        field: undefined
    }

    getData = () => {
        axios.get(`${API_URL}/${API_VERSION}/fields/${this.props.id}`,
            {withCredentials: true})
            .then(res => {
                const field = res.data
                this.setState({field: field});
                })
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        console.log('Logging state withing FormField', this.props);
        return(
            <React.Fragment>
                <TextField variant="outlined"
                           helperText='Enter question'
                           size="small"
                           type="text"
                           className="form-creation-fields"
                />
                <FieldItem  item={this.props.field}
                            key={this.props.id}
                />
            </React.Fragment>
        );
    }

}

export default FormFieldCreate;