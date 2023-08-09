import React from 'react';
import { Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import './Loader.scss'

const Loader: React.FC = () => {
  return (
    <Col xs={12} className='loader'>
    <Spinner animation="border" role="status" variant="warning">
      <span className="visually-hidden">Загрузка...</span>
    </Spinner>
    </Col>
  );
};

export default Loader;
