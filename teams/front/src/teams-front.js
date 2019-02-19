import React from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
    <TextField
        id="teams"
        label="Choose your team"
    />,
    document.getElementById('app')
);