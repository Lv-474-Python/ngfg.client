import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';


class SettingAutocomplete extends Component {
    render() {
        let dataUrlMissed = false;
        let sheetMissed = false;
        let fromRowMissed = false;
        let toRowMissed = false;

        if (this.props.missedAutocompleteData.dataUrl === true) {
            dataUrlMissed = "Missed data";
        }
        if (this.props.missedAutocompleteData.sheet === true) {
            sheetMissed = "Missed data";
        }
        if (this.props.missedAutocompleteData.fromRow === true) {
            fromRowMissed = "Missed data";
        }
        if (this.props.missedAutocompleteData.toRow === true) {
            toRowMissed = "Missed data";
        }

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
                        helperText={dataUrlMissed}
                        error={dataUrlMissed}
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
                        helperText={sheetMissed}
                        error={sheetMissed}
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
                        helperText={fromRowMissed ? fromRowMissed : "Values E.G. A1"}
                        error={fromRowMissed}
                    />
                    <TextField
                        label="Column and row end"
                        placeholder="Enter column and row"
                        type="text"
                        value={this.props.toRow || ""}
                        onChange={this.props.onChangeToRow}
                        variant="outlined"
                        helperText={toRowMissed ? toRowMissed : "Values E.G. B10"}
                        error={toRowMissed}
                    />
                </div>
            </div>
        );
    }
}

export default SettingAutocomplete;
