import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import FormItem from "../Form/FormItem";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


class GroupList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        'groups': []
    }

    getData = () => {
        axios.get('http://ngfg.com:8000/api/v1/groups/', {
            withCredentials: true,
        })
            .then(res => {
                const groups = res.data.groups;
                console.log(groups);
                this.setState({groups})
            })
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div className='group-list'>
                {
                    this.state.groups.map(elem =>
                        <FormItem item={elem}
                                  key={elem.id}/>
                    )
                }
            </div>
        );
    }
}

export default GroupList;