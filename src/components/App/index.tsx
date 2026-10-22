import { ReactElement, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { useApolloClient } from '@apollo/client';

import * as styles from './app.module.css';
import Card from '../../pages/Card';
import Main from '../../pages/Main';
import { getToken, removeToken, saveToken } from '../../utils/token';
import Token from '../Token';

export default function App(): ReactElement {
  const client = useApolloClient();
  const [token, setToken] = useState<string | null>(getToken);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>GitHub Repository Search</h1>
        <p className={styles.subtitle}>Find public repositories with the GitHub GraphQL API</p>
      </header>

      <main className={styles.panel}>
        {token ? (
          <HashRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/:id" element={<Card />} />
            </Routes>
          </HashRouter>
        ) : (
          <Token
            onSave={(newToken) => {
              saveToken(newToken);
              setToken(newToken);
            }}
          />
        )}
      </main>

      {token && (
        <footer className={styles.footer}>
          <button
            className={styles.change_token}
            type="button"
            onClick={() => {
              removeToken();
              setToken(null);
              client.clearStore();
            }}
          >
            Change token
          </button>
        </footer>
      )}
    </>
  );
}
