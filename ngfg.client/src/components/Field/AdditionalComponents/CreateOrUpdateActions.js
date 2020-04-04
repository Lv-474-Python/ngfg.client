import React, { Component } from 'react';

import '../../Form/Form.css'
import {Button, DialogActions} from '@material-ui/core';



class CreateOrUpdateActions extends Component {
    render() {
        return (
            <DialogActions>
                <Button onClick={this.props.handleClose} className="form-item-link">
                        Close
                </Button>
                {
                    this.props.isUpdate &&
                    <Button onClick={this.props.sendUpdateData} className="form-item-link" autoFocus>
                    Update
                    </Button>  
                }
                {
                    !this.props.isUpdate &&
                    <Button onClick={this.props.sendData} className="form-item-link" autoFocus>
                    Send
                    </Button> 
                }
            </DialogActions>
        );
    }
}

export default CreateOrUpdateActions;