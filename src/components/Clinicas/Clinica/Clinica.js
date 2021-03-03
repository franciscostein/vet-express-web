import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import TextField from '@material-ui/core/TextField';

import Endereco from '../../fragments/Endereco/Endereco';
import FormButtons from '../../fragments/FormButtons/FormButtons';
import ErrorSnackBar from '../../fragments/ErrorSnackBar/ErrorSnackBar';

const clinica = props => {
    const { id } = useParams();
    const authToken = Cookies.get('authToken');
    const { administrator } = Cookies.getJSON('user');
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [contato, setContato] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (id) {
            axios.get(`/clinics/${id}`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            })
            .then(response => {
                const { data } = response;
                const { address } = data;

                setNome(data.name);
                setCnpj(data.cnpj);
                setTelefone(data.phone);
                setContato(data.contact);
                setCep(address.zipCode);
                setLogradouro(address.street);
                setNumero(address.number);
                setBairro(address.neighborhood);
                setCidade(address.city);
                setEstado(address.state);
            })
            .catch(error => {
                setErrorMessage('Erro ao carregar dados.');
                setError(true);
                console.log(error);
            });
        }
    }, []);

    return (
        <Fragment>
            <h2 className={props.styles.row}>Clínica</h2>
            <form noValidate autoComplete="off">
                <div className={props.styles.row}>
                    <div className={`${props.styles.col} ${props.styles.span2of2}`}>
                        <TextField
                            id="inputFantasia"
                            label="Nome fantasia"
                            margin="normal"
                            required
                            fullWidth
                            disabled={!administrator}
                            value={nome}
                            onChange={value => setNome(value.target.value)}
                        />
                    </div>
                </div>
                <div className={props.styles.row}>
                    <div className={`${props.styles.col} ${props.styles.span1of3}`}>
                        <TextField
                            id="inputCNPJ"
                            label="CNPJ"
                            margin="normal"
                            required
                            fullWidth
                            disabled={!administrator}
                            value={cnpj}
                            onChange={value => setCnpj(value.target.value)}
                        />
                    </div>
                    <div className={`${props.styles.col} ${props.styles.span1of3}`}>
                        <TextField
                            id="inputTelefone"
                            label="Telefone"
                            margin="normal"
                            fullWidth
                            value={telefone}
                            onChange={value => setTelefone(value.target.value)}
                        />  
                    </div>
                    <div className={`${props.styles.col} ${props.styles.span1of3}`}>
                        <TextField
                            id="inputContato"
                            label="Contato"
                            margin="normal"
                            fullWidth
                            value={contato}
                            onChange={value => setContato(value.target.value)}
                        />
                    </div>
                </div>
                <Endereco
                    styles={props.styles} 
                    cep={cep} setCep={value => setCep(value)}
                    logradouro={logradouro} setLogradouro={value => setLogradouro(value)}
                    numero={numero} setNumero={value => setNumero(value)}
                    bairro={bairro} setBairro={value => setBairro(value)}
                    cidade={cidade} setCidade={value => setCidade(value)}
                    estado={estado} setEstado={value => setEstado(value)}
                />

                <FormButtons 
                    styles={props.styles}
                    urlPath='/clinicas'
                    path='/clinics'
                    id={id}
                    setError={value => setError(value)}
                    setErrorMessage={message => setErrorMessage(message)}
                    data={ administrator ? {
                        name: nome,
                        cnpj: parseInt(cnpj),
                        address: {
                            zipCode: parseInt(cep),
                            street: logradouro,
                            number: parseInt(numero),
                            neighborhood: bairro,
                            city: cidade,
                            state: estado
                        },
                        phone: parseInt(telefone),
                        contact: contato
                    } : {
                        address: {
                            zipCode: parseInt(cep),
                            street: logradouro,
                            number: parseInt(numero),
                            neighborhood: bairro,
                            city: cidade,
                            state: estado
                        },
                        phone: parseInt(telefone),
                        contact: contato
                    }}
                />

                { error ?
                    <ErrorSnackBar message={errorMessage} />
                : '' }
            </form>
        </Fragment>
    );
}

export default clinica;