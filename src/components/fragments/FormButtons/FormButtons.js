import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

import styles from './FormButtons.module.css';

const formButtons = props => {
    const history = useHistory();

    const salvarClickHandler = event => {
        const { id, data, path, urlPath } = props;
        const authToken = Cookies.get('authToken');
        props.setError(false);
        // console.log(data);
        
        if (id) {   // edit
            axios.patch(`${path}/${id}`, 
                data,
                { headers: { 'Authorization': `Bearer ${authToken}` }
            })
            .then(response => {
                console.log(response);
                history.push(urlPath);
            })
            .catch(error => {
                props.setErrorMessage('Erro ao atualizar dados, verifique as informações.');
                props.setError(true);
                console.log(error);
            });
        }
        else {  // insert
            axios.post(path, 
                data,
                { headers: { 'Authorization': `Bearer ${authToken}` }
            })
            .then(response => {
                console.log(response);
                history.goBack();
            })
            .catch(error => {
                props.setErrorMessage('Erro ao inserir dados, verifique as informações.');
                props.setError(true);
                console.log(error);
            });
        }
    }

    const cancelarClickHandler = () => {
        history.goBack();
    }

    return (
        <Grid justify="center" spacing={2} container className={styles.buttons}>
            <Grid item>
                <Button 
                    variant="contained"
                    color="primary"
                    disabled={props.blockSave}
                    className={props.styles.primaryButton}
                    onClick={event => salvarClickHandler(event)}
                >Salvar</Button>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="secondary"
                    className={props.styles.secondaryButton}
                    onClick={() => cancelarClickHandler()}
                >{props.blockSave? 'Voltar' : 'Cancelar'}</Button>
            </Grid>
        </Grid>
    );
}

export default formButtons;