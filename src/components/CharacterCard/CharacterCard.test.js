import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditableCharacterCard } from './CharacterCard';

describe('EditableCharacterCard', () => {
  const mockCharacter = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
  };

  const mockEditingFields = {
    height: '175',
    hair_color: 'brown',
  };

  const mockOnFieldChange = jest.fn();
  const mockOnSave = jest.fn();

  it('should update local fields when editing', () => {
    render(
      <EditableCharacterCard
        character={mockCharacter}
        className="test-class"
        editingFields={mockEditingFields}
        onFieldChange={mockOnFieldChange}
        onSave={mockOnSave}
      />,
    );

    const heightInput = screen.getByLabelText('Рост');

    fireEvent.change(heightInput, { target: { value: '180' } });

    expect(heightInput.value).toBe('180');
  });

  it('should call onSave when Save button is clicked', () => {
    render(
      <EditableCharacterCard
        character={mockCharacter}
        className="test-class"
        editingFields={mockEditingFields}
        onFieldChange={mockOnFieldChange}
        onSave={mockOnSave}
      />,
    );

    const saveButton = screen.getByText('Сохранить');

    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalled();
  });
});
