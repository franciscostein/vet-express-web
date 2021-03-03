import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import MUIDataTable from 'mui-datatables';

import options from '../fragments/MuiDataTable/Options';
import DeleteAlert from '../fragments/DeleteAlert/DeleteAlert';

const columns = [
    { name: 'id', options: { display: false, viewColumns: false, filter: false, searchable: false } }, 'Nome', 'Nascimento', 'Telefone', 'e-mail', 'Função'
];

const usuarios = props => {
    const { administrator } = Cookies.getJSON('user');
    const authToken = Cookies.get('authToken');
    const [data, setData] = useState([]);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [dataDeleted, setDataDeleted] = useState(false);
    const [rowsData, setRowsData] = useState([]);

    useEffect(() => {
        axios.get(`/users`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(response => {
            const users = [];

            response.data.forEach(user => {
                users.push([user._id, user.name, formatDate(user.birthday), user.phone, user.email, user.administrator ? 'Administrador' : 'Motorista']);
            });

            setData(users);
        })
        .catch(error => {
            console.log(error);
        });
    }, [dataDeleted]);

    const handleDeleteClick = value => {
        setRowsData(value);
        setShowDeleteAlert(true);
    }

    const handleChangeDeleteAlert = userResponse => {
        setShowDeleteAlert(false);

        if (userResponse === true) {
            const dataIndexes = [];
            const usersIds = [];

            rowsData.forEach(row => {
                dataIndexes.push(row.dataIndex);
            });
            dataIndexes.forEach(index => {
                const user = data[index];
                usersIds.push(user[0]);
            });

            axios.delete('/users/many/123', {
                data: { ids: usersIds },
                headers: { 'Authorization': `Bearer ${authToken}` }
            })
            .then(response => {
                console.log(response);
                setDataDeleted(true);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
    
    const formatDate = date => {
        const dateArray = date.split('-');
        const day = dateArray[2].substring(0, 2);
        const month = dateArray[1];
        const year = dateArray[0];
        return `${day}/${month}/${year}`;
    }

    return (
        <Fragment>
            <h2 className={props.styles.row}>Usuários</h2>
            <form className={props.styles.formTable}>
                <MUIDataTable
                    title={''}
                    columns={columns}
                    data={data}
                    options={options(administrator, '/usuario', rows => handleDeleteClick(rows))}
                />

                { showDeleteAlert ?
                    <DeleteAlert onChange={value => handleChangeDeleteAlert(value)} />
                : ''}
            </form>
        </Fragment>
    );
}

export default usuarios;