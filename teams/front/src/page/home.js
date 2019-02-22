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
import {FaPlusSquare, FaQuestion} from "react-icons/fa";
import {IconContext} from "react-icons";
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Paper from "@material-ui/core/Paper/Paper";
import Avatar from "@material-ui/core/Avatar/Avatar";

const allTeams = [
    new Team('ASSVB'),
    new Team('PUC')
];


class ListTeams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: props.teams,
        };
    }


    render() {
        return (
            <List>
                {this.state.teams.map((element, i) => {
                    return (
                        <ListItem button onClick={this.props.onSelect} key={i}>
                            <ListItemIcon>
                                <Avatar>
                                    <FaQuestion/>
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText>
                                {element.name}
                            </ListItemText>
                        </ListItem>
                    );
                })}
            </List>
        )
    }
}

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
    },
    hidden: {
        display: 'none'
    }
});

class Home extends TeamsPage {


    constructor(props) {
        super(props);
        this.state = {
            team: null,
            openMenu: false,
            choosing: false
        };
        this.connect = this.connect.bind(this);
        this.menuTransition = this.menuTransition.bind(this);
        this.menuClose = this.menuClose.bind(this);
        this.filter = this.filter.bind(this);
        this.btb = React.createRef();
        this.cyt = React.createRef();
    }

    connect() {
        let team = new Team("ASS");
        let btb = this.btb;
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

    filter() {

    }

    render() {
        const {classes, theme} = this.props;
        return (
            <div className={classes.root}>
                <AppBar color={'default'} className={classes.bar}>
                    <BaseToolbar ref={this.btb} id={"testing"} onClick={this.menuTransition}/>
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
                            <TextField ref={this.cyt} fullWidth label={"Choose your team"} onKeyDown={this.filter} onFocus={() => this.setState({choosing: true})}/>
                            <Paper className={classNames({[classes.hidden]: !this.state.choosing})}>
                                <ListTeams teams={allTeams} onSelect={(e) => {
                                    console.log("select");
                                    this.setState({choosing: false});
                                    console.log(this.btb);
                                    this.setState({team: new Team('test')});
                                    console.log(this.cyt);
                                }}/>
                            </Paper>
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