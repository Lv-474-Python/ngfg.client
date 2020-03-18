import React, {Component} from 'react';


import TextField from '@material-ui/core/TextField';


class SettingAutocomplete extends Component {
    render() {
        return (
            <div>
                <TextField
                    label="data URL"
                    type="url"
                    value={this.props.settingAutocomplete_dataUrl}
                    onChange={this.props.onChangeDataURL}
                />
                <TextField
                    label="Sheet"
                    type="text"
                    value={this.props.settingAutocomplete_sheet}
                    onChange={this.props.onChangeSheet}
                />
                <TextField
                    label="from row"
                    type="text"
                    value={this.props.settingAutocomplete_fromRow}
                    onChange={this.props.onChangeFromRow}
                />
                <TextField
                    label="to row"
                    type="text"
                    value={this.props.settingAutocomplete_toRow}
                    onChange={this.props.onChangeToRow}
                />
            </div>
        );
    }
}

export default SettingAutocomplete;
