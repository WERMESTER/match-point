import React from 'react'

export default class TeamsPage extends React.Component {

    #executionContext;

    constructor(props) {
        super(props);
        this.#executionContext = props.context;
    }

    get executionContext(){
        return this.#executionContext;
    }


}