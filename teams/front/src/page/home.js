import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import TeamsPage from "./teams-page";
import BaseToolbar from "../component/base-toolbar";
import Team from "../domain/team";
import Drawer from "@material-ui/core/Drawer/Drawer";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import {FaPlusSquare} from "react-icons/fa";
import {IconContext} from "react-icons";
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Select from "react-select/dist/react-select";

const allTeams = [
    new Team('ASSVB'),
    new Team('PUC')
].map(team => ({
    value: team.name,
    label: team.name,
}));

const styles = theme => ({
    root: {
        display: 'flex'
    },
    bar: {
        zIndex: theme.zIndex.drawer + 1
    },
    underBar: {
        marginTop: 65
    },
    afterMenuClose: {
        marginLeft: theme.spacing.unit * 7 + 7,
        transition: theme.transitions.create('padding-left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    afterMenuOpen: {
        marginLeft: 207,
        transition: theme.transitions.create('padding-left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menu: {
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    menuContent: {
        overflow: 'hidden'
    },
    menuContentOpen: {
        width: 200,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),

    },
    menuContentClose: {
        width: theme.spacing.unit * 7 + 1,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    main: {
        width: '100%',
        height: '90vh'
    },
    teamChooser: {
        textAlign: 'center',
        paddingTop: '35vh'
    }
});

function Control(props) {
    return (<TextField ref={props.innerRef} children={props.children} fullWidth label={"Choose your team"} {...props.innerProps}/>)
}

class Home extends TeamsPage {


    constructor(props) {
        super(props);
        this.state = {team: null, openMenu: false};
        this.handleConnect = this.handleConnect.bind(this);
        this.menuTransition = this.menuTransition.bind(this);
        this.menuClose = this.menuClose.bind(this);
    }

    handleConnect() {
        let team = new Team("ASS");
        let btb = this.refs.btb;
        this.setState(state => {
            state.team = team;
            btb.connect(team);
        })
    }

    menuClose() {
        if (this.state.openMenu) {
            this.setState({openMenu: false})
        }
    }

    menuTransition() {
        this.setState({openMenu: !this.state.openMenu})
    }

    render() {
        const {classes, theme} = this.props;
        return (
            <div className={classes.root}>
                <AppBar color={'default'} className={classes.bar}>
                    <BaseToolbar ref={"btb"} id={"testing"} onClick={this.menuTransition}/>
                </AppBar>
                <Drawer variant={"permanent"} className={classes.menu}>
                    <IconContext.Provider value={{size: "1.5em"}}>
                        <List className={classNames(classes.menuContent, classes.underBar, {[classes.menuContentOpen]: this.state.openMenu, [classes.menuContentClose]: !this.state.openMenu})}>
                            <ListItem button key={"New Team"}>
                                <ListItemIcon><FaPlusSquare/></ListItemIcon>
                                <ListItemText primary={"New Team"}/>
                            </ListItem>
                        </List>
                    </IconContext.Provider>
                </Drawer>
                <section id={"main"} className={classNames(classes.main, classes.underBar, {[classes.afterMenuOpen]: this.state.openMenu, [classes.afterMenuClose]: !this.state.openMenu})} onClick={this.menuClose}>
                    <Grid container className={classes.teamChooser}>
                        <Grid item xs={4}>

                        </Grid>
                        <Grid item xs={4}>
                            <Select
                                autoFocus={false}
                                options={allTeams}
                                components={{Control}}
                                isClearable
                            />
                        </Grid>
                        <Grid item xs={4}>

                        </Grid>
                    </Grid>
                </section>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Home);