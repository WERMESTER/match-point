import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import TeamsPage from "./teams-page";
import BaseToolbar from "../component/base-toolbar";
import Team from "../domain/team";

export default class Home extends TeamsPage {


    constructor(props) {
        super(props);
        this.state = {team: null};
        this.handleConnect = this.handleConnect.bind(this);
    }

    handleConnect() {
        let team = new Team("ASS");
        let btb = this.refs.btb;
        this.setState(state => {
            state.team = team;
            btb.connect(team);
        })
    }

    render() {
        return (
            <AppBar color={'default'}>
                <BaseToolbar ref={"btb"} id={"testing"}/>
            </AppBar>
        )
    }
}