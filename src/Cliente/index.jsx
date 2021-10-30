import React, {memo, useState } from 'react';

import { 
  Label} from 'semantic-ui-react';


import { 
  Container,
  Space,
  Positive, Text
} from './styles';


function Cliente() {
     
  return (
    <Container>
    <Text>Qual tipo de Cliente você deseja cadastrar ?</Text>
    <Space>
    <a href="/cliente-fisica">
        <Positive>
          Fisica
        </Positive>
      </a>
      <a href="/cliente-juridica">
        <Positive>
          Juridica
        </Positive>
      </a>
      </Space>
  </Container>
  );
};
export default Cliente;