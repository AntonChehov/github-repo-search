import { ReactElement, useState } from 'react';

import { IToken } from './interfaces';
import * as styles from './token.module.css';
import * as formStyles from '../Search/search.module.css';

export default function Token({ onSave }: IToken): ReactElement {
  const [valueInput, setValueInput] = useState('');

  return (
    <section>
      <p className={styles.token__hint}>
        The app uses the GitHub GraphQL API, which requires a personal access token.{' '}
        <a
          href="https://github.com/settings/tokens/new?description=github-repo-search"
          target="_blank"
          rel="noreferrer"
        >
          Create a token
        </a>{' '}
        without any scopes and paste it below. The token is stored only in this browser tab.
      </p>
      <form
        className={formStyles.form}
        onSubmit={(evt) => {
          evt.preventDefault();
          if (valueInput.trim()) {
            onSave(valueInput.trim());
          }
        }}
      >
        <input
          className={formStyles.form__input}
          type="password"
          id="token"
          value={valueInput}
          placeholder="GitHub token..."
          autoComplete="off"
          onChange={(evt) => {
            setValueInput(evt.target.value);
          }}
        />
        <button className={formStyles.form__btn} type="submit" aria-label="save token" />
      </form>
    </section>
  );
}
