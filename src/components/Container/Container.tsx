import React from 'react';
import { Container } from 'react-bootstrap';
import { PageContainerProps } from '../../intefaces/interfaces'

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <Container className="custom-container">{children}</Container>;
};

export default PageContainer;
