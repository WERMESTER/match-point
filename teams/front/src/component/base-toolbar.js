import * as React from "react";
import {FaTumblr} from "react-icons/fa";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";

export default class BaseToolbar extends React.Component {

    #id;

    constructor(props) {
        super(props);
        this.#id = props.id
    }

    connect(team) {
        console.log(this.#id + " name: " + team.name)
    }


    render() {
        return (
            <Toolbar>
                <IconButton onClick={this.props.onClick}>
                    <FaTumblr/>
                </IconButton>
            </Toolbar>

        )
    }

}