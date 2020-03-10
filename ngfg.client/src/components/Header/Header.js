import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});


class Header extends Component {
    state = {
        'page': 'home'
    };

    handleChange = (event, newValue) => {
        this.setState({
            page: newValue
        });
        console.log(this.props);
        console.log(this.props.history);
        this.props.history.push(`/${newValue}`);
    }

    render() {
        const { classes } = this.props; // classes = this.props.classes
        return (
            <div style={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        {/* <Typography edge="start" className={classes.menuButton} color="inherit" aria-label="menu" variant="h6">
                            NgFg
                        </Typography> */}
                        <Typography variant="h6" className={classes.title}>
                            NgFg
                        </Typography>

                        <Button >Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(useStyles)(Header);
