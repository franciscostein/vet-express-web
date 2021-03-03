import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory, useParams } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import SelectUsuario from '../../fragments/selects/Usuario/SelectUsuario';
import SelectCidades from '../../fragments/selects/Cidades/SelectCidades';
import FormButtons from '../../fragments/FormButtons/FormButtons';
import ErrorSnackBar from '../../fragments/ErrorSnackBar/ErrorSnackBar';

import styles from './Motorista.module.css';

const motorista = props => {
    const { id } = useParams();
    const authToken = Cookies.get('authToken');
    const { administrator } = Cookies.getJSON('user');
    const history = useHistory();
    const [usuario, setUsuario] = useState({
        _id: '',
        nome: ''
    });
    const [segunda, setSegunda] = useState([]);
    const [terca, setTerca] = useState([]);
    const [quarta, setQuarta] = useState([]);
    const [quinta, setQuinta] = useState([]);
    const [sexta, setSexta] = useState([]);
    const [sabado, setSabado] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (id) {
            const driverId = administrator ? id : `user/${id}`;

            axios.get(`/drivers/${driverId}`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            })
            .then(response => {
                const { data } = response;
                const { user, region } = data;

                setUsuario({ _id: user._id, nome: user.name });
                setSegunda(region.monday.cities);
                setTerca(region.tuesday.cities);
                setQuarta(region.wednesday.cities);
                setQuinta(region.thursday.cities);
                setSexta(region.friday.cities);
                setSabado(region.saturday.cities);
            })
            .catch(error => {
                setErrorMessage('Erro ao carregar dados.');
                setError(true);
                console.log(error);
            });
        }
    }, []);

    const novoMotoristaClickHandler = () => {
        history.push('/usuario');
    }

    return (
        <Fragment>
            <h2 className={props.styles.row}>Motorista</h2>
            <form noValidate autoComplete="off">
                <div className={props.styles.row}>
                    <div className={`${props.styles.col} ${props.styles.span11of12}`}>
                        <SelectUsuario
                            disabled={id ? true : false}
                            value={usuario} 
                            onChange={(userId, userName) => setUsuario({ _id: userId, nome: userName })}
                        />
                    </div>
                    <div className={`${props.styles.col} ${props.styles.span1of12}`}>
                        <Tooltip title="Novo usuário">
                            <Fab
                                className={`${props.styles.floatRight} ${props.styles.fabMarginTop}`} 
                                color="primary" 
                                size="small"
                                disabled={!administrator}
                                onClick={() => novoMotoristaClickHandler()}
                            >
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </div>
                </div>

                <h3 className={`${props.styles.row} ${styles.h3}`}>Regiões</h3>
                <div className={`${props.styles.row} ${styles.dia}`}>
                    <div className={`${props.styles.col} ${props.styles.span2of2}`}>
                        <SelectCidades
                            key="segunda"
                            dia='Segunda-feira'
                            disabled={!administrator}
                            value={segunda}
                            onChange={value => setSegunda(value)}
                        />                       
                    </div>                    
                </div>
                <div className={`${props.styles.row} ${styles.dia}`}>
                    <div className={`${props.styles.col} ${props.styles.span2of2}`}>
                        <SelectCidades
                            key="terca"
                            dia='Terça-feira'
                            disabled={!administrator}
                            value={terca}
                            onChange={value => setTerca(value)}
                        />
                    </div>
                </div>
                <div className={`${props.styles.row} ${styles.dia}`}>
                    <div className={`${props.styles.col} ${props.styles.span2of2}`}>
                        <SelectCidades
                            key="quarta"
                            dia='Quarta-feira'
                            disabled={!administrator}
                            value={quarta}
                            onChange={value => setQuarta(value)}
                        />
                    </div>
                </div>
                <div className={`${props.styles.row} ${styles.dia}`}>
                    <div className={`${props.styles.col} ${props.styles.span2of2}`}>
                        <SelectCidades
                            key="quinta"
                            dia='Quinta-feira'
                            disabled={!administrator}
                            value={quinta}
                            onChange={value => setQuinta(value)}
                        />
                    </div>
                </div>
                <div className={`${props.styles.row} ${styles.dia}`}>
                    <div className={`${props.styles.col} ${props.styles.span2of2}`}>
                        <SelectCidades
                            key="sexta"
                            dia='Sexta-feira'
                            disabled={!administrator}
                            value={sexta}
                            onChange={value => setSexta(value)}
                        />
                    </div>
                </div>
                <div className={`${props.styles.row} ${styles.dia}`}>
                    <div className={`${props.styles.col} ${props.styles.span2of2}`}>
                        <SelectCidades
                            key="sabado"
                            dia='Sábado'
                            disabled={!administrator}
                            value={sabado}
                            onChange={value => setSabado(value)}
                        />
                    </div>
                </div>
                
                <FormButtons 
                    styles={props.styles}
                    blockSave={!administrator}
                    urlPath='/motoristas'
                    path='/drivers'
                    id={id}
                    setError={value => setError(value)}
                    setErrorMessage={message => setErrorMessage(message)}
                    data={ !id ? {
                        user: usuario._id,
                        region: {
                            monday: {
                                cities: segunda
                            },
                            tuesday: {
                                cities: terca
                            },
                            wednesday: {
                                cities: quarta
                            },
                            thursday: {
                                cities: quinta
                            },
                            friday: {
                                cities: sexta
                            },
                            saturday: {
                                cities: sabado
                            }
                        }
                    } : {
                        region: {
                            monday: {
                                cities: segunda
                            },
                            tuesday: {
                                cities: terca
                            },
                            wednesday: {
                                cities: quarta
                            },
                            thursday: {
                                cities: quinta
                            },
                            friday: {
                                cities: sexta
                            },
                            saturday: {
                                cities: sabado
                            }
                        }
                    }}
                />

                { error ?
                    <ErrorSnackBar message={errorMessage} />
                : '' }
            </form>
        </Fragment>
    );
}

export default motorista;