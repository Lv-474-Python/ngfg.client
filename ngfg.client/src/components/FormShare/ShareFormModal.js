import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import {withRouter} from "react-router-dom";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
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
    Tab
} from "@material-ui/core";
import axios from "axios";

import './ShareFormModal.css'
import ShareGroupAndUser from "./ShareGroupAndUser";
import FormShareLink from "./FormShareLink";

import copy from 'copy-to-clipboard'
import SendIcon from "@material-ui/icons/Send";

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
        form: null
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

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleCopy = () => {
        copy(this.state.formShareLink)
    };

    handleSend = () => {
        console.log('send');
        console.log(this.state)
    };

    handleChange = (event, panel) => {
        this.setState({panel})
    };

    handleFormLink = (formShareLink) => {
        this.setState({formShareLink})
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
                                    <ShareGroupAndUser handleSelectedGroups={this.handleSelectedGroup}
                                                       handleUsers={this.handleUsers}
                                                       handleFromDate={this.handleFromDate}
                                                       handleToDate={this.handleToDate}
                                                       groups={this.state.groups}/>
                                    <DialogActions style={{marginTop: '3vw'}}>
                                        <Button onClick={this.handleSend}
                                                className='form-share-dialog-btn'>
                                            Send
                                        </Button>
                                        <Button onClick={this.handleClose}
                                                className='form-share-dialog-btn'
                                                autoFocus>
                                            Close
                                        </Button>
                                    </DialogActions>
                                </TabPanel>
                                <TabPanel value={this.state.panel}
                                          index={1}>
                                    <FormShareLink handleFormShare={this.handleFormLink}/>
                                    <DialogActions style={{marginTop: '3vw'}}>
                                        <Button onClick={this.handleCopy}
                                                className='form-share-dialog-btn'>
                                            Copy
                                        </Button>
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