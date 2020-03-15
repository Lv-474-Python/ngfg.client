import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';



import './Home.scss';


class HomePage extends Component {

    handleViewMoreClick = () => {
        console.log('view more click');
    }

    handleShareClick = () => {
        console.log('share click');
    }

    render() {
        return (
            <div className="home">
                <div className="home__title">
                    New generation Form generator welcomes you
                </div>
                <div className="home__content">

                    <div className="home__forms">
                        <div className="home__forms__title">
                            Forms
                        </div>
                        <div className="home__forms__list">
                            <div className="home__forms__list__newitem">
                                +
                            </div>
                            <div className="home__forms__list__newitem">
                                +
                            </div>
                            <div className="home__forms__list__item">
                                <div className="home__forms__list__item__name">
                                    Registration Form
                                </div>
                                <div className="home__forms__list__item__title">
                                    Registration form title
                                </div>
                                <div className="home__forms__list__item__status">
                                    Status: Published
                                </div>
                                <div className="home__forms__list__item__buttons">
                                    <Button className="home__forms__list__item__buttons__more"
                                        onClick={this.handleViewMoreClick}
                                    >
                                    View more
                                    </Button>

                                    <Button className="home__forms__list__item__buttons__share"
                                            endIcon={<SendIcon>send</SendIcon>}
                                    >
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home__fields">
                        Fields
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
