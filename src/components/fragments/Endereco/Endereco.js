import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';

import Estado from '../../fragments/selects/Estado/SelectEstado';

const endereco = props => {
    return (
        <Fragment>
            <h3 className={props.styles.row}>Endereço</h3>
            <div className={props.styles.row}>
                <div className={`${props.styles.col} ${props.styles.span1of3}`}>
                    <TextField
                        id="inputCEP"
                        label="CEP"
                        margin="normal"
                        value={props.cep}
                        onChange={event => props.setCep(event.target.value)}
                    />
                </div>
            </div>
            <div className={props.styles.row}>
                <div className={`${props.styles.col} ${props.styles.span4of5}`}>
                    <TextField
                        id="inputLogradouro"
                        label="Logradouro"
                        margin="normal"
                        fullWidth
                        value={props.logradouro}
                        onChange={event => props.setLogradouro(event.target.value)}
                    />
                </div>
                <div className={`${props.styles.col} ${props.styles.span1of5}`}>
                    <TextField
                        id="inputNumero"
                        label="Número"
                        margin="normal"
                        fullWidth
                        value={props.numero}
                        onChange={event => props.setNumero(event.target.value)}
                    />
                </div>
            </div>
            <div className={props.styles.row}>
                <div className={`${props.styles.col} ${props.styles.span1of3}`}>
                    <TextField
                        id="inputBairro"
                        label="Bairro"
                        margin="normal"
                        fullWidth
                        value={props.bairro}
                        onChange={event => props.setBairro(event.target.value)}
                    />
                </div>
                <div className={`${props.styles.col} ${props.styles.span1of3}`}>
                    <TextField
                        id="inputCidade"
                        label="Cidade"
                        margin="normal"
                        fullWidth
                        value={props.cidade}
                        onChange={event => props.setCidade(event.target.value)}
                    />
                </div>
                <div className={`${props.styles.col} ${props.styles.span1of3} ${props.styles.select}`}>
                    <Estado 
                        value={props.estado} setEstado={value => props.setEstado(value)}
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default endereco;