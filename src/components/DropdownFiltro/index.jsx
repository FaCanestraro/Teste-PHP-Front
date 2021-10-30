import React, {memo, useState, useEffect} from 'react';
import { Dropdown } from 'semantic-ui-react';

import axios from '../../services/Axios';

const DropCliente = ({value, setState}) => {


    const [dadosCliente, setDadoCliente] = useState([]);

    const getCliente = async () => {
        try {
            const response = await axios.get(`clientes`);
            const json = await response.data;
            setDadoCliente(json.clientes);
        } catch (err) {
            console.log(err.response.data.error);
        }
    }

    const clienteOptions = [];
    if (dadosCliente.length > 0) {
        dadosCliente.forEach((value) => {
            clienteOptions.push({
                key: Number(value.id),
                value: value.nome,
                text: value.nome
            });
        }); 
    }

    useEffect(() => {
        getCliente();
    }, []);

    return (
    <Dropdown
        required
        options={clienteOptions}
        value={value}
        onChange={(event, data) => { setState(data.value)}}
        />
    );
}

export default memo(DropCliente);