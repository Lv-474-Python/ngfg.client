import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import "./Sort.css"


class Sort extends Component {
    state = {
        sortKey: '',
        ascending: {
            'Name': false,
            'Date': false
        }
    };

    handleClick = (event) => {
        let {ascending} = this.state;
        let sortKey = event.target.innerText;

        ascending[sortKey] = !ascending[sortKey];
        this.setState({sortKey, ascending});
        this.props.handleSort(sortKey, ascending[sortKey])
    };

    render() {
        return (
            <div className='sort'>
                <Typography className='sort-title'
                            variant="h5"
                            component="h2">
                    Sort
                </Typography>

                <div className='sort-content'>
                    {this.props.sortValue.map(elem =>
                        <Typography className="sort-item"
                                    onClick={this.handleClick}
                                    variant="p"
                                    component="p">
                            {elem}
                        </Typography>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(Sort);