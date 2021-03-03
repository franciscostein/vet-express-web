import React from 'react';
import { useHistory } from 'react-router-dom';
import CustomToolbar from './CustomToolbar';

const options = (admin, addPath, deleteCallback) => {
    const history = useHistory();

    const commomConfig = {
        filterType: 'checkbox',
        responsive: 'scrollFullHeight',
        download: false,
        print: false,
        textLabels: {
            body: {
                noMatch: "Nenhum registro encontrado",
                toolTip: "Ordenar",
                columnHeaderTooltip: column => `Ordenar por ${column.label}`
            },
            pagination: {
                next: "Próxima página",
                previous: "Página anterior",
                rowsPerPage: "Linhas por página:",
                displayRows: "de",
            },
            toolbar: {
                search: "Procurar",
                viewColumns: "Visualizar colunas",
                filterTable: "Filtrar tabela",
            },
            filter: {
                all: "TODOS",
                title: "FILTROS",
                reset: "LIMPAR TODOS",
            },
            viewColumns: {
                title: "Mostrar colunas",
                titleAria: "Mostrar/Esconder colunas da tabela",
            },
            selectedRows: {
                text: "linha(s) selecionadas",
                delete: "Excluir",
                deleteAria: "Excluir linhas selecionadas",
            }
        },
        onRowClick: (rowData, rowMeta) => {
            const _id = rowData[0];
            history.push(`${addPath}/${_id}`);
        }
    }

    if (admin) {
        return {
            ...commomConfig,
            // Callback function that triggers when row(s) are deleted.
            onRowsDelete: rowsDeleted => {
                // function(rowsDeleted: object(lookup: {[dataIndex]: boolean}, data: arrayOfObjects: {index: number, dataIndex: number})) => void OR false (Returning false prevents row deletion.)
                deleteCallback(rowsDeleted.data);
                return false;
            },
            customToolbar: () => {
                return (
                    <CustomToolbar addPath={addPath} />
                );
            }
        }
    } else {
        return {
            ...commomConfig,
            selectableRows: 'none'
        }
    }
}

export default options;