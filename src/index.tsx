import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from './components/Container/Container';
import HomePage from './pages/HomePage';
import CharacterPage from './pages/CharacterPage';
import useFetchAllCharacters from './customHooks/useFetchAllCharacters';
import Loader from './components/Loader/Loader';
import './index.scss';

const App = () => {
  const characters = useFetchAllCharacters();

  return (
    <Router>
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              characters.length ? (
                <HomePage characters={characters} />
              ) : (
                <Loader />
              )
            }
          />
          <Route
            path="/character/:characterId"
            element={
              characters.length ? (
                <CharacterPage characters={characters} />
              ) : (
                <Loader />
              )
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />,
);
