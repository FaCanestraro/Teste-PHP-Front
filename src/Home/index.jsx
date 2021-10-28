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


function Home() {
  
  return (
      <Container>
        <a href="/empresa"><button>Cadastrar Empresa</button></a>
        <p/>
        <a href="/cliente"><button>Cadastrar Cliente</button></a>
      </Container>
  );

}

export default Home;