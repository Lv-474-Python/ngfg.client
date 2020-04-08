import React from 'react';
import Routers from './routers'
import './App.css';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

function App() {
    return (
        <div className="App">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Routers/>
            </MuiPickersUtilsProvider>

        </div>
    );
}

export default App;
