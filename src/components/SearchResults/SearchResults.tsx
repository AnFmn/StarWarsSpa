import React, { useEffect, useState } from 'react';
import { Row, Col, Pagination, Form, FormControl } from 'react-bootstrap';
import { Character, SearchResultsProps } from '../../intefaces/interfaces'
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { getRandomElementFromArray, availableColors } from '../../utils/helpers';
import usePagination from '../../customHooks/usePagination';
import './SearchResults.scss'

const ITEMS_PER_PAGE = 6;

const SearchResults: React.FC<SearchResultsProps> = ({ characters }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Character[]>(characters);

  useEffect(() => {
    const filteredCharacters = characters.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredCharacters);
  }, [characters, searchTerm]);

  const { paginatedData, currentPage, handlePageChange } = usePagination(
    filteredData,
    ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const showPagination = filteredData.length > ITEMS_PER_PAGE;

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12}>
          <Form className="mb-4">
            <FormControl
              type="text"
              placeholder="Поиск по имени"
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchInputKeyPress}
            />
          </Form>
        </Col>
        {paginatedData.length === 0 ? (
          <Col xs={12} className="text-center">
            <p>Персонаж с именем "{searchTerm}" не найден</p>
          </Col>
        ) : (
          paginatedData.map((character, index) => (
            <CharacterCard
              key={character.name}
              character={character}
              className={`character-card ${index < paginatedData.length ? 'visible' : ''} lightsaber${getRandomElementFromArray(availableColors)}`}
            />
          ))
        )}
      </Row>
      {showPagination && (
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <Pagination>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => {
                      handlePageChange(page);
                    }}
                  >
                    {page}
                  </Pagination.Item>
                ),
              )}
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SearchResults;
