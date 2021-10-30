import React, {memo, useState, useEffect} from 'react';
import { Select } from 'semantic-ui-react';

import { 
    Teste
  } from './styles';

import axios from '../../services/Axios';

const SelectEmpresa = ({value, uf, setState}) => {


    const [dadosEmpresa, setDadoEmpresa] = useState([]);

    const getEmpresa = async () => {
        try {
            const response = await axios.get(`select-empresa`);
            const json = await response.data;
            setDadoEmpresa(json.empresa);
        } catch (err) {
            console.log(err.response.data.error);
        }
    }

    const empresaOptions = [];
    if (dadosEmpresa.length > 0) {
        dadosEmpresa.forEach((value) => {
            empresaOptions.push({
                key: Number(value.id),
                value: Number(value.id),
                text: value.razaoSocial
            });
        }); 
    }

    useEffect(() => {
        getEmpresa();
    }, []);

    return (
    <Select
        required
        options={empresaOptions}
        value={value}
        onChange={(event, data) => { setState(data.value)}}
        />
    );
}

export default memo(SelectEmpresa);