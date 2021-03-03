import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import RetiradasIcon from '@material-ui/icons/RestoreFromTrash';
import ClinicasIcon from '@material-ui/icons/Store';
import MotoristaIcon from '@material-ui/icons/SportsMotorsports';
import UsuariosIcon from '@material-ui/icons/AccountBox';
import { Nav } from 'mui-layout';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    toolbar: theme.mixins.toolbar
}));

const SimpleList = props => {
    const classes = useStyles();
    const { administrator } = Cookies.getJSON('user');

    const handleLinkClick = path => {
        props.history.push(path);
        window.location.reload();
    }

    return (
        <Nav
            renderIcon={collapsed =>
                collapsed ? <ChevronRight /> : <ChevronLeft />
            }
        >
            <div className={classes.root}>
                <div className={classes.toolbar} />
                <Divider />
                <List component="nav" aria-label="main mailbox folders">
                    
                    <ListItem 
                        button
                        onClick={() => handleLinkClick('/')}
                    >
                        <ListItemIcon>
                            <RetiradasIcon />
                        </ListItemIcon>
                        <ListItemText primary="Retiradas" />
                    </ListItem>

                    <ListItem 
                        button 
                        onClick={() => handleLinkClick('/clinicas')}
                    >
                        <ListItemIcon>
                            <ClinicasIcon />
                        </ListItemIcon>
                        <ListItemText primary="Clínicas" />
                    </ListItem>

                    { administrator ? 
                        <Fragment>
                            <ListItem 
                                button
                                onClick={() => handleLinkClick('/motoristas')}
                            >
                                <ListItemIcon>
                                    <MotoristaIcon />
                                </ListItemIcon>
                                <ListItemText primary="Motoristas" />
                            </ListItem>

                            <ListItem 
                                button
                                onClick={() => handleLinkClick('/usuarios')}
                            >
                                <ListItemIcon>
                                    <UsuariosIcon />
                                </ListItemIcon>
                                <ListItemText primary="Usuários" />
                            </ListItem>
                        </Fragment>
                    : '' }
                    
                </List>
                <div className={classes.toolbar} />
                <Divider />
            </div>
        </Nav>
  );
}

export default withRouter(SimpleList);