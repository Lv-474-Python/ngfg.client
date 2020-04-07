import React, {Component} from 'react';

import '../../Form/Form.css'
import {Button, DialogActions} from '@material-ui/core';


class CreateOrUpdateActions extends Component {
    render() {
        return (
            <DialogActions>

                {
                    this.props.isUpdate &&
                    <div>
                        <Button onClick={this.props.sendUpdateData} className="field-action-btn" autoFocus>
                            Update
                        </Button>
                    </div>
                }
                {
                    !this.props.isUpdate &&
                    <div>
                        <Button onClick={this.props.sendData} className="field-action-btn" autoFocus>
                            Send
                        </Button>
                    </div>
                }
                <div>
                    <Button onClick={this.props.handleClose} className="field-action-btn">
                        Close
                    </Button>
                </div>
            </DialogActions>
        );
    }
}

export default CreateOrUpdateActions;