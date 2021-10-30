import React, {useEffect, useState } from 'react';

import { Button, Table, Form, Transition} from 'semantic-ui-react';

import { 
  Container,
  TableWrapper,
  Space,
  Filtro
} from './styles';

import axios from '../services/Axios';
import Dropdown from '../components/DropdownFiltro';


function Home() {
  
  const [cliente, setCliente] = useState();
  const [created, setCreated] = useState("");
  const [identidade, setIdentidade] = useState("");
  const [result, setResult] = useState();
  const [open, setOpen] = useState(false);
  const [dropCliente, setDropCliente] = useState("");


  const buscaCliente = async () => {
    try {
       const response = await axios.get(`clientes`);
       const json = await response.data;
       setCliente(json.clientes);
     }
     catch (e) {
       console.log(e.response.data);
     } 
  } 

  const handleFiltroCliente = async (event) => {
    event.preventDefault();
    
    try {
      if(dropCliente == null || dropCliente == undefined) {
      setDropCliente("")
      }
      if(created == null || created == undefined) {
          setCreated("")
      }
      if(identidade == null || identidade == undefined) {
          setIdentidade("");
      }
        
          let formData = new FormData();
          formData.append("dropCliente", dropCliente);
          formData.append("identidade", identidade);
          formData.append("created_at", created);
          
          const response = await axios.post(`/filtro-cliente`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          const json = await response.data;
          setResult(json.clientes);

          setDropCliente();
          setIdentidade('');
          setCreated('');

        } catch (e) {}}

        const abrir = async () => {
         setOpen(!open);
        }
  
  useEffect(() => {
    buscaCliente();  
  }, []);

  return (

      <Container>
        <Space>
          <Button positive href="/empresa">Cadastrar Empresa</Button>
          <Button positive href="/cliente">Cadastrar Cliente</Button>
        </Space>
        <Filtro>
          <Button positive
            content={'Filtro'}
            onClick={abrir}
            />
            <Transition visible={open} animation='scale' duration={500}>
            <Form onSubmit={handleFiltroCliente}>
            <Dropdown setState={setDropCliente}/>
                  <Form.Group>
                    <Form.Input
                      label='CPF' 
                      value={identidade}
                      type="number"
                      placeholder='CPF'
                      onChange={({target}) => setIdentidade(target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                  <Form.Input
                      label='Criado em' 
                      value={created}
                      type="date"
                      placeholder='Criado em'
                      onChange={({target}) => setCreated(target.value)}
                    />
                    </Form.Group>
                    <Button positive type="submit">
                      Pesquisar
                    </Button>
              </Form>
            </Transition>
          </Filtro>
          
          <Table basic>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nome</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Telefone</Table.HeaderCell>
                    <Table.HeaderCell>Endereço</Table.HeaderCell>
                </Table.Row>
            </Table.Header> 
              {cliente &&
                  <Table.Body>
                      {cliente.map((value, index) => 
                          <Table.Row key={index}>
                              <Table.Cell>{value.nome}</Table.Cell>
                              <Table.Cell>{value.email}</Table.Cell>
                              <Table.Cell>{value.telefone}</Table.Cell>
                              <Table.Cell>{value.endereco}</Table.Cell>
                          </Table.Row>
                      )}
                  </Table.Body>
              }
        </Table>
      
      {(result != null) ? (
       <Table basic>
       <Table.Header>
           <Table.Row>
               <Table.HeaderCell>Nome</Table.HeaderCell>
               <Table.HeaderCell>Email</Table.HeaderCell>
               <Table.HeaderCell>Telefone</Table.HeaderCell>
               <Table.HeaderCell>Endereço</Table.HeaderCell>
           </Table.Row>
       </Table.Header> 
         {(result != null) ? (
             <Table.Body>
                 {result.map((value, index) => 
                     <Table.Row key={index}>
                         <Table.Cell>{value.nome}</Table.Cell>
                         <Table.Cell>{value.email}</Table.Cell>
                         <Table.Cell>{value.telefone}</Table.Cell>
                         <Table.Cell>{value.endereco}</Table.Cell>
                     </Table.Row>
                 )}
             </Table.Body>
         ):<></>}
   </Table>
       ) : <></>}
      </Container>
  );

}

export default Home;