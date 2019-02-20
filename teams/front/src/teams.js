import React from 'react';
import ReactDOM from 'react-dom';
import Home from './page/home'
import TeamsContext from "./teams-context";


const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
    <Home context={new TeamsContext('test')}/>,
    document.getElementById('app')
);