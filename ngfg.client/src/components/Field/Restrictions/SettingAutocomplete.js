import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';


class SettingAutocomplete extends Component {
    render() {
        return (
            <div>
                <div className="create-field-autocomplete-url-sheet">
                    <TextField
                        label="Data URL"
                        placeholder="Enter Google sheet url"
                        type="url"
                        value={this.props.dataUrl || ""}
                        onChange={this.props.onChangeDataURL}
                        fullWidth
                        variant="outlined"
                    />
                </div>
                <div className="create-field-autocomplete-url-sheet">
                    <TextField
                        label="Sheet"
                        placeholder="Enter sheet name"
                        type="text"
                        value={this.props.sheet || ""}
                        onChange={this.props.onChangeSheet}
                        fullWidth
                        variant="outlined"
                    />
                </div>
                <div className="create-field-limits-autocomplete-container">
                    <TextField
                        label="Column and row start"
                        placeholder="Enter column and row"
                        type="text"
                        value={this.props.fromRow || ""}
                        onChange={this.props.onChangeFromRow}
                        variant="outlined"
                        helperText="Values E.G. A1"
                    />
                    <TextField
                        label="Column and row end"
                        placeholder="Enter column and row"
                        type="text"
                        value={this.props.toRow || ""}
                        onChange={this.props.onChangeToRow}
                        variant="outlined"
                        helperText="Values E.G. B10"
                    />
                </div>
            </div>
        );
    }
}

export default SettingAutocomplete;
