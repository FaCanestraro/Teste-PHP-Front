import React, {memo, useState } from 'react';

import { 
    Button} from 'semantic-ui-react';

import { 
  Container,
  Space
} from './styles';

import axios from '../services/Axios';


function Home() {
  


  return (
      <Container>
        <a href="/empresa"><Button>Cadastrar Empresa</Button></a>
        <a href="/cliente"><Button>Cadastrar Cliente</Button></a>
      </Container>
  );

}

export default Home;