import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import MUIDataTable from 'mui-datatables';

import options from '../fragments/MuiDataTable/Options';
import DeleteAlert from '../fragments/DeleteAlert/DeleteAlert';

const columns = [{ 
    name: 'id', options: { display: false, viewColumns: false, filter: false, searchable: false } }, 'Nome', 'CNPJ', 'Cidade', 'Bairro', 'Telefone'
];

const clinincas = props => {
    const authToken = Cookies.get('authToken');
    const { administrator } = Cookies.getJSON('user');
    const [data, setData] = useState([]);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [dataDeleted, setDataDeleted] = useState(false);
    const [rowsData, setRowsData] = useState([]);

    useEffect(() => {
        axios.get(`/clinics`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(response => {
            const clinics = [];
            
            response.data.forEach(clinic => {
                const { _id, name, cnpj, address, phone } = clinic;

                clinics.push([_id, name, cnpj, address.city, address.neighborhood, phone]);
            });
            setData(clinics);
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
            const clinicsIds = [];

            rowsData.forEach(row => {
                dataIndexes.push(row.dataIndex);
            });
            dataIndexes.forEach(index => {
                const clinic = data[index];
                clinicsIds.push(clinic[0]);
            });

            axios.delete('/clinics/many/123', {
                data: { ids: clinicsIds },
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

    return (
        <Fragment>
            <h2 className={props.styles.row}>Clínicas</h2>
            <form className={props.styles.formTable}>
                <MUIDataTable
                    title={''}
                    columns={columns}
                    data={data}
                    options={options(administrator, '/clinica', rows => handleDeleteClick(rows))}
                />

                { showDeleteAlert ?
                    <DeleteAlert onChange={value => handleChangeDeleteAlert(value)} />
                : ''}
            </form>
        </Fragment>
    );
}

export default clinincas;