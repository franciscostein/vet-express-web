import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import MUIDataTable from 'mui-datatables';

import options from '../fragments/MuiDataTable/Options';
import DeleteAlert from '../fragments/DeleteAlert/DeleteAlert';

import styles from './Retiradas.module.css';

const columns = [
    { name: 'id', options: { display: false, viewColumns: false, filter: false, searchable: false } }, 'Clínica', 'Data', 'Observação', 'Motorista'
];
  
const retiradas = props => {
    const authToken = Cookies.get('authToken');
    const { administrator } = Cookies.getJSON('user');
    const [data, setData] = useState([]);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [dataDeleted, setDataDeleted] = useState(false);
    const [rowsData, setRowsData] = useState([]);

    useEffect(() => {
        const urlEnd = administrator ? '' : `/driver`;

        axios.get(`/pickUps${urlEnd}`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(response => {
            const retiradas = [];

            response.data.forEach(retirada => {
                const { _id, clinic, date, note, driver } = retirada;

                retiradas.push([_id, clinic.name, formatDate(date), note, driver.user.name]);
            });
            setData(retiradas);
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
            const pickUpIds = [];

            rowsData.forEach(row => {
                dataIndexes.push(row.dataIndex);
            });
            dataIndexes.forEach(index => {
                const pickUp = data[index];
                pickUpIds.push(pickUp[0]);
            });

            axios.delete('/pickUps/many/123', {
                data: { ids: pickUpIds },
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
        <form className={props.styles.formTable}>
            <h2 className={props.styles.row}>Retiradas</h2>
            <div className={styles.marginTop}>
                <MUIDataTable
                    title={''}
                    columns={columns}
                    data={data}
                    options={options(administrator, '/retirada', rows => handleDeleteClick(rows))}
                />
            </div>

            { showDeleteAlert ?
                <DeleteAlert onChange={value => handleChangeDeleteAlert(value)} />
            : ''}
        </form>
    );
}

export default retiradas;