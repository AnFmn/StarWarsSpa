import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { HomePageProps } from '../intefaces/interfaces';
import Loader from '../components/Loader/Loader';
import SearchResults from '../components/SearchResults/SearchResults';

const HomePage: React.FC<HomePageProps> = ({ characters, isLoading }) => {
  return (
    <Row className={'mt-4'}>
      <Col md={12} className="justify-content-center text-center mt-6">
        <h1>STAR WARS</h1>
        <h1>character cards</h1>
        {isLoading ? <Loader /> : <SearchResults characters={characters} />}
      </Col>
    </Row>
  );
};

export default HomePage;
