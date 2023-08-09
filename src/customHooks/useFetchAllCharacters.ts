import { useEffect, useState } from 'react';
import { Character } from '../intefaces/interfaces';

const useFetchAllCharacters = (): Character[] => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const cachedCharacters = localStorage.getItem('cachedCharacters');

    if (cachedCharacters) {
      setCharacters(JSON.parse(cachedCharacters));
    } else {
      const fetchAllCharacters = async () => {
        const allCharacters: Character[] = [];
        let nextPage = 'https://swapi.dev/api/people/?page=1';

        while (nextPage) {
          const response = await fetch(nextPage);
          const data = await response.json();
          allCharacters.push(...data.results);
          nextPage = data.next;
        }

        localStorage.setItem('cachedCharacters', JSON.stringify(allCharacters));
        setCharacters(allCharacters);
      };

      fetchAllCharacters();
    }
  }, []);

  return characters;
};

export default useFetchAllCharacters;
