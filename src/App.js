import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import lightGreen from '@material-ui/core/colors/lightGreen';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Root, Content, presets } from 'mui-layout';

import Header from './layout/HeaderBar/HeaderBar';
import SideDrawer from './layout/SideDrawer/SideDrawer';
import Footer from './layout/Footer/Footer';

import Login from './components/Login/Login';
import Retiradas from './components/Retiradas/Retiradas';
import Retirada from './components/Retiradas/Retirada/Retirada';
import Clinicas from './components/Clinicas/Clinicas';
import Clinica from './components/Clinicas/Clinica/Clinica';
import Usuarios from './components/Usuarios/Usuarios';
import Usuario from './components/Usuarios/Usuario/Usuario';
import Motoristas from './components/Motoristas/Motoristas';
import Motorista from './components/Motoristas/Motorista/Motorista';

import globalStyles from './Global.module.css';

const baseTheme = createMuiTheme({ 
    palette: {
        primary: lightGreen,
        secondary: {
            main: '#f3f3f3'
        },
        error: red,
        danger: orange
    }
});

const config = presets.createStandardLayout({ navVariant: 'temporary', autoCollapsedDisabled: true, headerPosition: 'sticky' });

// Auth token
const auth = Cookies.get('authToken');
 
const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={baseTheme}>
                {auth === undefined ? <Login styles={globalStyles} /> :
                    <Root config={config}>
                        <Header />
                        <SideDrawer />
                        <Content className={globalStyles.content}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Switch>
                                    <Route path="/clinicas">
                                        <Clinicas styles={globalStyles} />
                                    </Route>
                                    <Route path="/clinica/:id?">
                                        <Clinica styles={globalStyles} />
                                    </Route>
                                    <Route path="/usuarios">
                                        <Usuarios styles={globalStyles} />
                                    </Route>
                                    <Route path="/usuario/:id?">
                                        <Usuario styles={globalStyles} />
                                    </Route>
                                    <Route path="/motoristas">
                                        <Motoristas styles={globalStyles} />
                                    </Route>
                                    <Route path="/motorista/:id?">
                                        <Motorista styles={globalStyles} />
                                    </Route>
                                    <Route path="/retirada/:id?">
                                        <Retirada styles={globalStyles} />
                                    </Route>
                                    <Route exact path="/">
                                        <Retiradas styles={globalStyles} />
                                    </Route>
                                </Switch>
                            </MuiPickersUtilsProvider>
                        </Content>
                        <Footer styles={globalStyles} />
                    </Root>
                }
            </ThemeProvider>
        </BrowserRouter>
    );
}
 
export default App;