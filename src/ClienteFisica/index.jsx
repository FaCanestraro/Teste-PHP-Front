import React, {useEffect, useState } from 'react';

import { Form,Button,Icon} from 'semantic-ui-react';

import { Container,Space} from './styles';
import SelectEmpresa from '../components/SelectEmpresa';

import axios from '../services/Axios';


function ClienteFisica() {

    const [nome, setNome] = useState('');
    const [identidade, setIdentidade] = useState('');
    const [rg, setRg] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [telefone , setTelefone ] = useState('');
    const [empresa , setEmpresa ] = useState('');
    const [email , setEmail ] = useState('');
    const [endereco , setEndereco ] = useState('');
    const [numero , setNumero ] = useState('');
    const [cep , setCep ] = useState('');
    const [uf , setUf ] = useState();
    const [idade , setIdade ] = useState('');

  
    function pesquisacep() {
    
      var url = `https://viacep.com.br/ws/${cep}/json`

        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, false);
        xhttp.send();

        var objeto = JSON.parse(xhttp.response);
        setEndereco(objeto.logradouro);
    } 

    const getUfEmpresa = async () => {
      try {
          let formData = new FormData();
              formData.append("empresa", empresa);
              
        const response = await axios.post(`/select-uf-empresa`, formData, {
              headers: {
              'Content-Type': 'multipart/form-data'
              }
          });
        const json = await response.data;
        
          setUf(json.Ufempresa);
        
    } catch (err) {
        console.log(err.response.data.error);
    }
    }

    const calcIdade = async () => {
      var anoAtual = new Date().getFullYear();
      var anoCliente = nascimento.substr(0, 4);
      var idade = anoAtual - anoCliente;
      setIdade(idade);
    }
    
    const handleCreateClienteFisico = async (event) => {
        event.preventDefault();
       
        try {
            
            if(uf == "PR" && idade < 18 || uf == "Paraná" && idade < 18) {
              alert("Proibido cadastrar usuario menor de idade esta Empresa");

            } else {

              let formData = new FormData();
              formData.append("nome", nome);
              formData.append("empresa", empresa);
              formData.append("identidade", identidade);
              formData.append("rg", rg);
              formData.append("nascimento", nascimento);
              formData.append("telefone", telefone);
              formData.append("email", email);
              formData.append("endereco", endereco);
              formData.append("numero", numero);
              formData.append("cep", cep);
              
              const response = await axios.post(`/cliente-fisica/add`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
              const json = await response.data;

              window.alert("Cliente Cadastrada com Sucesso!!");
              setNome('');
              setIdentidade('');
              setRg('');
              setNascimento('');
              setTelefone('');
              setEmail('');
              setEndereco('');
              setNumero('');
              setCep('');

            }
              
        } catch (err) {
          //setError(err.response.data.error);
        }
  
      }
      useEffect(() => {
        calcIdade();
          getUfEmpresa();
      });
    
  
  return (
  <Container>
    <Form onSubmit={handleCreateClienteFisico}>
    <Space>
    <Form.Group>
      <label>Empresa</label>
      </Form.Group>
      <Form.Group>
        <SelectEmpresa setState={setEmpresa}/>
        </Form.Group>
        <Form.Group>
          <Form.Input 
            required
            label='Nome' 
            value={nome}
            placeholder='Nome'
            onChange={({target}) => setNome(target.value)}
          />
          <Form.Input 
            required
            label='CPF' 
            value={identidade}
            type="number"
            placeholder='CPF'
            onChange={({target}) => setIdentidade(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input 
              required
              label='RG (Apenas numero)' 
              value={rg}
              type="number"
              placeholder='RG'
              onChange={({target}) => setRg(target.value)}
          />
          <Form.Input 
              required
              label='Data de Nascimento' 
              value={nascimento}
              type="date"
              placeholder='Data de Nascimento'
              onChange={({target}) => setNascimento(target.value)}
            />
        </Form.Group>
        <Form.Group>
          <Form.Input 
            required
            label='Telefone ' 
            placeholder='Telefone '
            type='number'
            value={telefone}
            onChange={({target}) => setTelefone(target.value)}
          />
           <Form.Input 
            required
            label='Email' 
            placeholder='Email'
            type='text'
            value={email}
            onChange={({target}) => setEmail(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input 
            required
            label='CEP' 
            placeholder='CEP'
            type='number'
            value={cep}
            onChange={({target}) => setCep(target.value)}
          />
          {(cep.length == 8) ? (<Button onClick={pesquisacep}><Icon className="search"></Icon></Button>) : <></>}
        </Form.Group> 
        
        <Form.Group>
          <Form.Input 
            required
            label='Endereço' 
            placeholder='Endereço'
            type='text'
            value={endereco}
            onChange={({target}) => setEndereco(target.value)}
          />
           <Form.Input 
            required
            label='Numero' 
            placeholder='Numero'
            type='number'
            value={numero}
            onChange={({target}) => setNumero(target.value)}
          />
        </Form.Group>
        <Button positive type="submit">
          Cadastrar
        </Button>
        <Button negative href="/">
          Cancelar
        </Button>
        </Space>
      </Form>
  </Container>
  );
};
export default ClienteFisica;