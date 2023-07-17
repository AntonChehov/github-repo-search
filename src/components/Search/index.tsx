import { ReactElement, useContext, useState } from "react";

import * as styles from './search.module.css';
import SearchContext from '../context';

export default function Search(): ReactElement {
  const { setRequest } = useContext(SearchContext);
  const [valueInput, setValueInput] = useState('');

  return (
    <form
      className={styles.form}
      action="#"
      method="GET"
      onSubmit={(evt) => {
        evt.preventDefault();
        setRequest(valueInput);
      }}
    >
      <input
        className={styles.form__input}
        type="search"
        id="search"
        value={valueInput}
        placeholder="Search..."
        onChange={(evt) => {
          setValueInput(evt.target.value);
        }}
      />
      <button className={styles.form__btn} type="submit" aria-label="поиск" />
    </form>
  );
}
