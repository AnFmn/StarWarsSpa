import React, { useState, useEffect } from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { EditableCharacterCard } from '../components/CharacterCard/CharacterCard';
import { Character } from '../intefaces/interfaces';
import { availableColors, getRandomElementFromArray } from '../utils/helpers';

const CharacterPage: React.FC<{ characters: Character[] }> = ({
  characters,
}) => {
  const { characterId } = useParams<{ characterId?: string }>();

  const character = characters.find(
    (char) => char.name.replace(/ /g, '-') === characterId,
  );

  const [editableCharacter, setEditableCharacter] = useState<Character | null>(
    null,
  );
  const [editingFields, setEditingFields] = useState<Partial<Character>>({});

  useEffect(() => {
    if (character) {
      setEditableCharacter(character);
      setEditingFields(
        JSON.parse(
          localStorage.getItem(`${character.name}-editingFields`) || '{}',
        ),
      );
    }
  }, [character]);

  const handleFieldChange = (fieldName: keyof Character, value: string) => {
    setEditingFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  const handleSave = () => {
    if (editableCharacter) {
      const updatedCharacter: Character = {
        ...editableCharacter,
        ...editingFields,
      };
      localStorage.setItem(
        `${editableCharacter.name}-editingFields`,
        JSON.stringify(editingFields),
      );
      setEditableCharacter(updatedCharacter);
    }
  };

  if (!character) {
    return <p>Персонаж с ID {characterId} не найден</p>;
  }

  return (
    <>
      <Row>
        <Col xs={12} className="justify-content-center">
          <Nav>
            <Nav.Item>
              <Link to="/">{'<'}Back</Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Row className={'mt-4 justify-content-center'}>
        {editableCharacter && (
          <EditableCharacterCard
            character={editableCharacter}
            editingFields={editingFields}
            onFieldChange={handleFieldChange}
            onSave={handleSave}
            className={`character-card visible lightsaber${getRandomElementFromArray(
              availableColors,
            )}`}
          />
        )}
      </Row>
    </>
  );
};

export default CharacterPage;
