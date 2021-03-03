import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
// import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { KeyboardDatePicker } from '@material-ui/pickers';

import CategoriaCNH from '../../fragments/selects/CategoriasCNH/SelectCategoriasCNH';
import Endereco from '../../fragments/Endereco/Endereco';
import FormButtons from '../../fragments/FormButtons/FormButtons';
import ErrorSnackBar from '../../fragments/ErrorSnackBar/ErrorSnackBar';

import styles from './Usuario.module.css';

const usuario = props => {
    const { id } = useParams();
    const authToken = Cookies.get('authToken');
    const { administrator } = Cookies.getJSON('user');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [nascimento, setNascimento] = useState(Date());
    const [telefone, setTelefone] = useState('');
    const [numeroCNH, setNumeroCNH] = useState('');
    const [validadeCNH, setValidadeCNH] = useState(new Date());
    const [categoriasCNH, setCategoriasCNH] = useState([]);
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [admin, setAdmin] = useState({ checkedAdmin: false });
    const [showSenha, setShowSenha] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const password = senha ?  { password: senha } : '';
    
    useEffect(() => {
        if (id) {
            axios.get(`/users/${id}`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            })
            .then(response => {
                const { data } = response;
                setNome(data.name);
                setCpf(data.cpf);
                setNascimento(formatDateFromAPI(data.birthday));
                setTelefone(data.phone);
                setNumeroCNH(data.cnh.number);
                setValidadeCNH(formatDateFromAPI(data.cnh.expiringDate));
                setCategoriasCNH(data.cnh.category);
                setCep(data.address.zipCode);
                setLogradouro(data.address.street);
                setNumero(data.address.number);
                setBairro(data.address.neighborhood);
                setCidade(data.address.city);
                setEstado(data.address.state);
                setEmail(data.email);
                setAdmin({ ...admin, checkedAdmin: data.administrator });
            })
            .catch(error => {
                setErrorMessage('Erro ao carregar dados.');
                setError(true);
                console.log(error);
            });
        }
    }, []);

    const formatDateFromAPI = date => {
        const dateArray = date.split('-');
        const day = dateArray[2].substring(0, 2);
        const month = dateArray[1];
        const year = dateArray[0];
        return `${month}/${day}/${year}`;
    }

    const handleChangeAdmin = name => event => {
        setAdmin({ ...admin, [name]: event.target.checked });
    }

    return (
        <Fragment>
            <h2 className={props.styles.row}>Usuário</h2>
            <form>
                <div className={props.styles.row}>
                    <div className={`${props.styles.col} ${props.styles.span3of3}`}>
                        <TextField
                            id="inputNome"
                            label="Nome"
                            margin="normal"
                            required
                            fullWidth
                            disabled={!administrator}
                            value={nome}
                            onChange={event => setNome(event.target.value)}
                        />
                    </div>
                </div>
                <div className={`${props.styles.row} ${props.styles.clearfix}`}>
                    <div className={`${props.styles.col} ${props.styles.span1of3}`}>
                        <TextField
                            id="inputCPF"
                            label="CPF"
                            margin="normal"
                            required
                            fullWidth
                            disabled={!administrator}
                            value={cpf}
                            onChange={event => setCpf(event.target.value)}
                            inputProps={{
                                maxlength: 11
                            }}
                        >
                            {/* <InputMask mask="999.999.999-99" maskChar=" " /> */}
                        </TextField>
                    </div>
                    <div className={`${props.styles.col} ${props.styles.span1of3}`}>
                        <KeyboardDatePicker
                            id="inputNascimento"
                            label="Nascimento"
                            margin="normal"
                            format="dd/MM/yyyy"
                            autoOk
                            required
                            disabled={!administrator}
                            disableFuture={true}
                            value={nascimento}
                            onChange={date => setNascimento(date)}
                        />
                    </div>
                    <div className={`${props.styles.col} ${props.styles.span1of3}`}>
                        <TextField
                            id="inputTelefone"
                            label="Telefone"
                            className={props.styles.floatRight}
                            margin="normal"
                            fullWidth
                            value={telefone}
                            onChange={event => setTelefone(event.target.value)}
                        />    
                    </div>
                </div>

                <h3 className={props.styles.row}>CNH</h3>
                <div className={props.styles.row}>
                    <div className={`${props.styles.col} ${props.styles.span1of3}`}>
                        <TextField
                            id="inputNumeroCNH"
                            label="Número"
                            margin="normal"
                            fullWidth
                            value={numeroCNH}
                            onChange={event => setNumeroCNH(event.target.value)}
                        />
                    </div>
                    <div className={`${props.styles.col} ${props.styles.span1of3}`}>
                        <KeyboardDatePicker
                            id="inputValidadeCNH"
                            label="Válido até"
                            format="dd/MM/yyyy"
                            autoOk
                            value={validadeCNH}
                            onChange={date => setValidadeCNH(date)}
                            margin="normal"
                        />
                    </div>
                    <div className={`${props.styles.col} ${props.styles.span1of3} ${props.styles.select}`}>
                        <CategoriaCNH 
                            value={categoriasCNH} 
                            onChange={value => setCategoriasCNH(value)}
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

                <h3 className={props.styles.row}>Acesso</h3>
                <div className={props.styles.row}>
                    <div className={`${props.styles.col} ${props.styles.span1of2}`}>
                        <TextField
                            id="inputEmail"
                            label="E-mail"
                            margin="normal"
                            disabled={!administrator}
                            required
                            fullWidth
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </div>
                    <div className={`${props.styles.col} ${props.styles.span1of2} ${props.styles.switch}`}>
                        <FormControlLabel
                            control={
                                <Switch
                                    color="primary"
                                    disabled={!administrator}
                                    checked={admin.checkedAdmin}
                                    onChange={handleChangeAdmin('checkedAdmin')}
                                    value="checkedAdmin"
                                />
                            }
                            label="Administrador"
                            className={props.styles.floatRight}
                        />
                    </div>
                </div>

                { showSenha || !id ?
                    <div className={props.styles.row}>
                        <div className={`${props.styles.col} ${props.styles.span1of2}`}>
                            <TextField
                                id="inputSenha"
                                label="Senha"
                                type="password"
                                margin="normal"
                                required
                                fullWidth
                                value={senha}
                                onChange={event => setSenha(event.target.value)}
                            />
                        </div>
                        <div className={`${props.styles.col} ${props.styles.span1of2}`}>
                            <TextField
                                id="inputConfirmarSenha"
                                label="Confirme a senha"
                                type="password"
                                margin="normal"
                                required
                                fullWidth
                                value={senha}
                                onChange={event => setSenha(event.target.value)}
                            />
                        </div>
                    </div>
                :
                    <Grid justify="center" spacing={2} container>
                        <Grid item>
                            <Button 
                                variant="contained"
                                color="secondary"
                                className={`${props.styles.secondaryButton} ${styles.buttonSenha}`}
                                onClick={() => setShowSenha(true)}
                            >Alterar senha</Button>
                            </Grid>
                    </Grid>
                }
                
                <FormButtons 
                    styles={props.styles}
                    urlPath='/usuarios'
                    path='/users'
                    id={id}
                    setError={value => setError(value)}
                    setErrorMessage={message => setErrorMessage(message)}
                    data={ administrator ? {
                        name: nome,
                        cpf: parseInt(cpf),
                        birthday: new Date(nascimento),
                        phone: parseInt(telefone),
                        cnh: {
                            number: parseInt(numeroCNH),
                            expiringDate: new Date(validadeCNH),
                            category: categoriasCNH
                        },
                        address: {
                            zipCode: parseInt(cep),
                            street: logradouro,
                            number: parseInt(numero),
                            neighborhood: bairro,
                            city: cidade,
                            state: estado
                        },
                        email: email,
                        ...password,
                        administrator: admin.checkedAdmin
                    } : {
                        phone: parseInt(telefone),
                        cnh: {
                            number: parseInt(numeroCNH),
                            expiringDate: new Date(validadeCNH),
                            category: categoriasCNH
                        },
                        address: {
                            zipCode: parseInt(cep),
                            street: logradouro,
                            number: parseInt(numero),
                            neighborhood: bairro,
                            city: cidade,
                            state: estado
                        },
                        ...password
                    }}
                />

                { error ?
                    <ErrorSnackBar message={errorMessage} />
                : '' }
            </form>
        </Fragment>
    );
}

export default usuario;