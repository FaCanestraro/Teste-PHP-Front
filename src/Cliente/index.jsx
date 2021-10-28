import React, {memo, useState } from 'react';

import { 
    Form,Button} from 'semantic-ui-react';


import { 
  Container,
  Space,
  Positive, Negative
} from './styles';

import axios from '../services/Axios';


function Cliente() {

    const [nome, setNome] = useState('');
    const [identidade, setIdentidade] = useState('');
    const [telefone , setTelefone ] = useState('');
    const [email , setEmail ] = useState('');
    const [endereco , setEndereco ] = useState('');
    const [numero , setNumero ] = useState('');
    const [cep , setCep ] = useState('');
   


  
function pesquisacep() {
 
  var url = `https://viacep.com.br/ws/${cep}/json`

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();

    var objeto = JSON.parse(xhttp.response);
    setEndereco( objeto.logradouro);

} 
 


    const handleCreateCliente = async (event) => {
    
        // event.preventDefault();
        // try {
        //   if (nome == null || razaoSocial == null || cnpj == null) {
        //         setMensagem({
        //           descricao: 'Preencha todos os campos',
        //           color: 'red',
        //           status: true
        //       });
        //   } else {
        //     let formData = new FormData();
        //     formData.append("nome", nome);
        //     formData.append("razaoSocial", razaoSocial);
        //     formData.append("cnpj", cnpj);
    
        //     const response = await axios.post(`/cliente-fisica/add`, formData, {
        //       headers: {
        //         'Content-Type': 'multipart/form-data'
        //       }
        //     });
        //     const json = await response.data;
    
        //     setNome('');
        //     setRazaoSocial('');
        //     setCnpj(null);
        //     setMensagem({
        //       status: false
        //     });
        //   }
        // } catch (err) {
        //   //setError(err.response.data.error);
        // }
  
      }

  
  return (
    <Container>
    <Space>
    <Form onSubmit={handleCreateCliente}>
        
        <Form.Group widths='equal'>
          <Form.Input 
            required
            label='Nome' 
            value={nome}
            placeholder='Nome'
            onChange={({target}) => setNome(target.value)}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input 
            required
            label='CPF ou CNPJ' 
            value={identidade}
            type="number"
            placeholder='CPF ou CNPJ'
            onChange={({target}) => setIdentidade(target.value)}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input 
            required
            label='Telefone ' 
            placeholder='Telefone '
            type='number'
            value={telefone}
            onChange={({target}) => setTelefone(target.value)}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input 
            required
            label='Email' 
            placeholder='Email'
            type='text'
            value={email}
            onChange={({target}) => setEmail(target.value)}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input 
            required
            label='CEP' 
            placeholder='CEP'
            type='number'
            value={cep}
            onChange={({target}) => setCep(target.value)}
          />
          {(cep.length == 8) ? (<button onClick={pesquisacep}>Buscar</button>) : <></>}
        </Form.Group> 
        <Form.Group widths='equal'>
          <Form.Input 
            required
            label='Endereço' 
            placeholder='Endereço'
            type='text'
            value={endereco}
            onChange={({target}) => setEndereco(target.value)}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input 
            required
            label='Numero' 
            placeholder='Numero'
            type='number'
            value={numero}
            onChange={({target}) => setNumero(target.value)}
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
};
export default Cliente;