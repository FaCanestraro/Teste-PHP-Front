import React, {memo, useState } from 'react';

import { 
    Button, 
    Form} from 'semantic-ui-react';

import { 
  Container,
  Space,
  Positive,
  Negative
} from './styles';

import axios from '../services/Axios';


const Empresa = () => {

    const [uf, setUf] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [mensagem, setMensagem] = useState({
        descricao: '',
        color: '',
        status: false
      });

    const handleCreateEmpresa = async (event) => {
    
        event.preventDefault();
        try {
            let formData = new FormData();
            formData.append("uf", uf);
            formData.append("razaoSocial", razaoSocial);
            formData.append("cnpj", cnpj);
    
            const response = await axios.post(`/empresa/add`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            const json = await response.data;
            window.alert("Empresa Cadastrada com Sucesso!!");
            setUf('');
            setRazaoSocial('');
            setCnpj('');
            setMensagem({
              status: false
            });
        } catch (err) {
          //setError(err.response.data.error);
        }
  
      }

  
  return (
      <Container>
        <Space>
        <Form onSubmit={handleCreateEmpresa}>
            
            <Form.Group widths='equal'>
              <Form.Input 
                required
                label='UF da Empresa' 
                value={uf}
                placeholder='UF da Empresa'
                onChange={({target}) => setUf(target.value)}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input 
                required
                label='Razão Social' 
                value={razaoSocial}
                placeholder='Razão Social'
                onChange={({target}) => setRazaoSocial(target.value)}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input 
                required
                label='CNPJ' 
                placeholder='CNPJ'
                type='number'
                value={cnpj}
                onChange={({target}) => setCnpj(target.value)}
              />
            </Form.Group>  
            <Positive type="submit">
              Cadastrar
            </Positive>
          </Form>
          <a href="/">
            <Negative>
              Cancelar
            </Negative>
          </a>
          </Space>
      </Container>
  );

}

export default memo(Empresa);