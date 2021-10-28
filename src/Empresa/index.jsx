import React, {memo, useState } from 'react';

import { 
    Button, 
    Form, 
    Modal, 
    Header,
    Message, 
    Input} from 'semantic-ui-react';

import { 
  Container,
  Space
} from './styles';

import axios from '../services/Axios';


function Empresa() {

    const [uf, setUf] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [cnpj, setCnpj] = useState(null);
    const [mensagem, setMensagem] = useState({
        descricao: '',
        color: '',
        status: false
      });

    const handleCreateEmpresa = async (event) => {
    
        event.preventDefault();
        try {
          if (uf == null || razaoSocial == null || cnpj == null) {
                setMensagem({
                  descricao: 'Preencha todos os campos',
                  color: 'red',
                  status: true
              });
          } else {
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
    
            setUf('');
            setRazaoSocial('');
            setCnpj(null);
            setMensagem({
              status: false
            });
          }
        } catch (err) {
          //setError(err.response.data.error);
        }
  
      }

  
  return (
      <Container>
        <Form onSubmit={handleCreateEmpresa}>
            
            <Form.Group widths='equal'>
              <Form.Input 
                required
                label='UF da Empresa' 
                placeholder='UF da Empresa'
                onChange={({target}) => setUf(target.value)}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input 
                required
                label='Razão Social' 
                placeholder='Razão Social'
                onChange={({target}) => setRazaoSocial(target.value)}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input 
                required
                label='CNPJ' 
                placeholder='CNPJ'
                onChange={({target}) => setCnpj(target.value)}
              />
            </Form.Group>  
              <Button type="submit" positive>
                Salvar
              </Button>
          </Form>
      </Container>
  );

}

export default Empresa;