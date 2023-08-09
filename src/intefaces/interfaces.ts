import { ReactNode } from 'react';

export interface PaginationResult<T> {
  paginatedData: T[];
  currentPage: number;
  handlePageChange: (page: number) => void;
}

export interface HomePageProps {
  characters: Character[];
  isLoading?: boolean;
}

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export interface SearchResultsProps {
  characters: Character[];
}

export interface CharacterCardProps {
  character: Character;
  className?: string;
}

export interface PageContainerProps {
  children: ReactNode;
}
