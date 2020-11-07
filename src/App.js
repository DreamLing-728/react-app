import React from 'react';

import './assets/css/App.css';
import MyRoute from './router/router';
import {connect} from 'react-redux'

function App() {
    return (
        <div className="App">
            <MyRoute/>
        </div>
    );
}


export default connect((state, props) => {
    // console.log('in connect',state, props);
    return Object.assign({}, state, props);
},{}) (App);
