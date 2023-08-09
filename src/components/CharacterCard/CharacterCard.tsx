import React from 'react';
import { Card, Col, ListGroup, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  availableImages,
  getRandomElementFromArray,
} from '../../utils/helpers';
import { Character, CharacterCardProps } from '../../intefaces/interfaces';

interface EditableCharacterCardProps extends CharacterCardProps {
  editingFields: Partial<Character>;
  onFieldChange: (field: keyof Character, value: string) => void;
  onSave: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  className,
}) => {
  return (
    <Col className="my-2" xs={12} sm={6} md={4} lg={2} mb={6}>
      <Card data-bs-theme="dark" className={className}>
        <Card.Img
          variant="top"
          src={getRandomElementFromArray(availableImages)}
        />
        <Card.Body>
          <Card.Title>{character.name}</Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>Рост: {character.height}</ListGroup.Item>
          <ListGroup.Item>Вес: {character.mass}</ListGroup.Item>
          <ListGroup.Item>Цвет волос: {character.hair_color}</ListGroup.Item>
          <ListGroup.Item>Цвет кожи: {character.skin_color}</ListGroup.Item>
          <ListGroup.Item>Цвет глаз: {character.eye_color}</ListGroup.Item>
          <ListGroup.Item>Дата рождения: {character.birth_year}</ListGroup.Item>
          <ListGroup.Item>Пол: {character.gender}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Link to={`/character/${character.name.replace(/ /g, '-')}`}>
            Редактировать характеристики
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

const EditableCharacterCard: React.FC<EditableCharacterCardProps> = ({
  character,
  className,
  editingFields,
  onSave,
}) => {
  const [localFields, setLocalFields] =
    React.useState<Partial<Character>>(editingFields);
  const [showAlert, setShowAlert] = React.useState(false);
  const savedDataMessage = `Данные сохранены в localStorage ${
    character.name
  }: ${JSON.stringify(localFields)}`;

  const handleLocalFieldChange = (field: keyof Character, value: string) => {
    setLocalFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem(
      `${character.name}-editingFields`,
      JSON.stringify(localFields),
    );
    setShowAlert(true);
    onSave();
  };

  return (
    <Col className="my-2" xs={12} sm={6} md={4} lg={2} mb={6}>
      <Card data-bs-theme="dark" className={className}>
        <Card.Img variant="top" src="https://placehold.co/5x5?text=Image cap" />
        <Card.Body>
          <Card.Title>{character.name}</Card.Title>
          <Form>
            <Form.Group controlId="formHeight">
              <Form.Label>Рост</Form.Label>
              <Form.Control
                type="text"
                value={localFields.height || character.height}
                onChange={(e) =>
                  handleLocalFieldChange('height', e.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formMass">
              <Form.Label>Вес</Form.Label>
              <Form.Control
                type="text"
                value={localFields.mass || character.mass}
                onChange={(e) => handleLocalFieldChange('mass', e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formHairColor">
              <Form.Label>Цвет волос</Form.Label>
              <Form.Control
                type="text"
                value={localFields.hair_color || character.hair_color}
                onChange={(e) =>
                  handleLocalFieldChange('hair_color', e.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formSkinColor">
              <Form.Label>Цвет кожи</Form.Label>
              <Form.Control
                type="text"
                value={localFields.skin_color || character.skin_color}
                onChange={(e) =>
                  handleLocalFieldChange('skin_color', e.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formEyeColor">
              <Form.Label>Цвет глаз</Form.Label>
              <Form.Control
                type="text"
                value={localFields.eye_color || character.eye_color}
                onChange={(e) =>
                  handleLocalFieldChange('eye_color', e.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formBirthYear">
              <Form.Label>Дата рождения</Form.Label>
              <Form.Control
                type="text"
                value={localFields.birth_year || character.birth_year}
                onChange={(e) =>
                  handleLocalFieldChange('birth_year', e.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Пол</Form.Label>
              <Form.Control
                type="text"
                value={localFields.gender || character.gender}
                onChange={(e) =>
                  handleLocalFieldChange('gender', e.target.value)
                }
              />
            </Form.Group>
            <Button variant="warning" className="mt-4" onClick={handleSave}>
              Сохранить
            </Button>
            <Alert
              show={showAlert}
              variant="success"
              onClose={() => setShowAlert(false)}
              dismissible
              className="mt-3 in"
            >
              {savedDataMessage}
            </Alert>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export { CharacterCard, EditableCharacterCard };
