import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import {withRouter} from "react-router-dom";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import {
    Button,
    Typography,
    Box,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    AppBar,
    Tabs,
    Tab,
    Tooltip,
    ClickAwayListener
} from "@material-ui/core";
import axios from "axios";
import copy from 'copy-to-clipboard'

import ShareGroupAndUser from "./ShareGroupAndUser";
import FormShareLink from "./FormShareLink";

import './ShareFormModal.css'



const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#F9A825'
        }
    },
});


class ShareFormModal extends Component {

    state = {
        open: false,
        groups: [],
        panel: 0,
        formShareLink: "",
        selectedGroups: [],
        fromDate: null,
        toDate: null,
        users: [],
        form: null,
        fromDateLink: null,
        toDateLink: null,
        tooltipOpen: false
    };

    getGroups = () => {
        axios.get(`${API_URL}/${API_VERSION}/groups`, {
            withCredentials: true,
        })
            .then(res => {
                const groups = res.data.groups;
                this.setState({groups})
            });
    };

    handleTooltipClose = () => {
        this.setState({tooltipOpen: false});
    };

    componentDidMount() {
        this.setState({form: this.props.form});
        this.getGroups()
    }

    handleSelectedGroup = (selectedGroups) => {
        this.setState({selectedGroups})
    };

    handleUsers = (users) => {
        this.setState({users})
    };

    handleToDate = (toDate) => {
        this.setState({toDate})
    };

    handleFromDate = (fromDate) => {
        this.setState({fromDate})
    };

    handleFromDateLink = (fromDateLink) => {
        this.setState({fromDateLink})
    };

    handleToDateLink = (toDateLink) => {
        this.setState({toDateLink})
    };

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleCopy = () => {
        copy(this.state.formShareLink);
        this.setState({tooltipOpen: true})
    };

    handleGenerate = () => {
        let url = `${API_URL}/${API_VERSION}/shared_forms/${this.state.form.id}?`;

        if (this.state.fromDateLink) {
            url += `nbf=${this.state.fromDateLink.toJSON()}&`
        }
        if (this.state.toDateLink) {
            url += `exp=${this.state.toDateLink.toJSON()}&`
        }

        axios.get(
            url,
            {withCredentials: true}
        ).then(response => {
            let formShareLink = `http://localhost:3000/pass-form/${response.data.token}`;
            this.setState({formShareLink})

        }).catch(error => {
            console.log(error)
        })
    };

    handleSend = (event) => {
        event.preventDefault();

        let data = {
            groups_ids: this.state.selectedGroups.map(element => {
                return element.id
            }),
            users_emails: this.state.users
        };

        if (this.state.fromDate) {
            data['nbf'] = this.state.fromDate.toJSON()
        }

        if (this.state.toDate) {
            data['exp'] = this.state.toDate.toJSON()
        }

        axios.post(
            `${API_URL}/${API_VERSION}/shared_forms/${this.state.form.id}/`,
            data,
            {withCredentials: true}
        ).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    };

    handleChange = (event, panel) => {
        this.setState({panel})
    };

    handleFormLink = (formShareLink) => {
        this.setState({formShareLink})
    };

    handleMinimalDiffLink = () => {
        if (this.state.toDateLink && this.state.fromDateLink) {
            let valid = true;
            let diff = (this.state.toDateLink.getTime() - this.state.fromDateLink.getTime()) / 1000 / 60;
            let diffMinutes = Math.abs(Math.round(diff));
            if (diffMinutes < 5 || this.state.toDateLink <= this.state.fromDateLink) {
                valid = false
            }

            return valid ? (
                <Button onClick={this.handleGenerate}
                        className='form-share-dialog-btn'>
                    Generate
                </Button>
            ) : (
                <Tooltip title="Not valid date" placement="top">
                    <span>
                        <Button onClick={this.handleGenerate}
                                disabled
                                className='form-share-dialog-btn'>
                            Generate
                        </Button>
                    </span>
                </Tooltip>
            )
        }

        return (
            <Button onClick={this.handleGenerate}
                    className='form-share-dialog-btn'>
                Generate
            </Button>
        )
    };


    handleMinimalDiff = () => {
        if (this.state.toDate && this.state.fromDate) {
            let valid = true;
            let diff = (this.state.toDate.getTime() - this.state.fromDate.getTime()) / 1000 / 60;
            let diffMinutes = Math.abs(Math.round(diff));
            if (diffMinutes < 5 || this.state.toDate <= this.state.fromDate) {
                valid = false
            }


            return valid ? (
                <Button type='submit'
                        className='form-share-dialog-btn'>
                    Send
                </Button>
            ) : (
                <Tooltip title="Not valid date" placement="top">
                    <span>
                        <Button onClick={this.handleSend}
                                disabled
                                type='submit'
                                className='form-share-dialog-btn'>
                        Send
                        </Button>
                    </span>
                </Tooltip>
            )
        }

        return (
            <Button type='submit'
                    className='form-share-dialog-btn'>
                Send
            </Button>
        )
    };

    render() {
        return (
            <div>
                <Button className={this.props.btnClassName}
                        endIcon={<SendIcon/>}
                        onClick={this.handleOpen}>
                    Share
                </Button>
                <Dialog disableBackdropClick
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="share-dialog-title"
                        aria-describedby="share-dialog-description"
                        fullWidth={true}
                        maxWidth='md'>
                    <DialogTitle id="share-dialog-title">Share {this.props.form.name}</DialogTitle>
                    <DialogContent className='share-form-modal'>
                        <ThemeProvider theme={theme}>
                            <DialogContentText id="share-dialog-description">
                                <AppBar position="static"
                                        className='tab-bar'>
                                    <Tabs centered
                                          value={this.state.panel}
                                          onChange={this.handleChange}
                                          indicatorColor='primary'>
                                        <Tab label="Share"
                                             id='tab-0'
                                             aria-controls='tabpanel-0'/>
                                        <Tab label="Link"
                                             id='tab-1'
                                             aria-controls='tabpanel-1'/>
                                    </Tabs>
                                </AppBar>
                                <TabPanel value={this.state.panel}
                                          index={0}>
                                    <form onSubmit={(event => this.handleSend(event))}>
                                        <ShareGroupAndUser handleSelectedGroups={this.handleSelectedGroup}
                                                           handleUsers={this.handleUsers}
                                                           handleFromDate={this.handleFromDate}
                                                           handleToDate={this.handleToDate}
                                                           groups={this.state.groups}/>
                                        <DialogActions style={{marginTop: '3vw'}}>
                                            {this.handleMinimalDiff()}
                                            <Button onClick={this.handleClose}
                                                    className='form-share-dialog-btn'
                                                    autoFocus>
                                                Close
                                            </Button>
                                        </DialogActions>
                                    </form>
                                </TabPanel>
                                <TabPanel value={this.state.panel}
                                          index={1}>
                                    <FormShareLink formShareLink={this.state.formShareLink}
                                                   handleFormShare={this.handleFormLink}
                                                   handleToDate={this.handleToDateLink}
                                                   handleFromDate={this.handleFromDateLink}/>
                                    <DialogActions style={{marginTop: '3vw'}}>
                                        {this.handleMinimalDiffLink()}
                                        <ClickAwayListener onClickAway={this.handleTooltipClose}>
                                            <div>
                                                <Tooltip
                                                    PopperProps={{
                                                        disablePortal: true,
                                                    }}
                                                    onClose={this.handleTooltipClose}
                                                    open={this.state.tooltipOpen}
                                                    disableFocusListener
                                                    disableHoverListener
                                                    disableTouchListener
                                                    title="Сopied!">

                                                    <Button onClick={this.handleCopy}
                                                            className='form-share-dialog-btn'
                                                            autoFocus>
                                                        Copy
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </ClickAwayListener>
                                        <Button onClick={this.handleClose}
                                                className='form-share-dialog-btn'
                                                autoFocus>
                                            Close
                                        </Button>
                                    </DialogActions>
                                </TabPanel>
                            </DialogContentText>
                        </ThemeProvider>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default withRouter(ShareFormModal);

class TabPanel extends Component {

    render() {
        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={this.props.value !== this.props.index}
                id={`stabpanel-${this.props.index}`}
                aria-labelledby={`tab-${this.props.index}`}

            >
                {this.props.value === this.props.index && <Box p={3}>{this.props.children}</Box>}
            </Typography>
        );
    }
}