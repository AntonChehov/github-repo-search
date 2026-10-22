import { ReactElement } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { useQuery as getQuery } from '@apollo/client';

import { GET_INFO } from './card.graphql';
import * as styles from './card.module.css';
import { IRepoInfo } from './interfaces';
import { stringifyDate } from '../../utils/stringifyDate';

export default function Card(): ReactElement {
  const { id } = useParams();
  const { loading, error, data } = getQuery<IRepoInfo>(GET_INFO, {
    variables: {
      getId: `${id}`,
    },
  });

  if (error) {
    return <h2 className={styles.h2_error}>{error.message}</h2>;
  }

  if (loading) {
    return <h3 className={styles.h3}>Loading...</h3>;
  }

  return data ? (
    <article className={styles.article}>
      <NavLink className={styles.back} to="/">
        ← Back to search
      </NavLink>

      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={data.node.owner.avatarUrl}
          alt={`${data.node.owner.login} avatar`}
        />
        <div>
          <h2 className={styles.title}>
            <a href={data.node.url} target="_blank" rel="noreferrer">
              {data.node.name}
            </a>
          </h2>
          <a className={styles.name} href={data.node.owner.url} target="_blank" rel="noreferrer">
            {data.node.owner.login}
          </a>
        </div>
      </div>

      <ul className={styles.meta}>
        <li>
          <span className={styles.star}>★</span> {data.node.stargazers.totalCount} stars
        </li>
        <li>Last commit: {stringifyDate(data.node.defaultBranchRef.target.committedDate)}</li>
      </ul>

      {data.node.description && <p className={styles.description}>{data.node.description}</p>}

      {!!data.node.languages.nodes.length && (
        <>
          <h3 className={styles.subtitle}>Languages</h3>
          <ul className={styles.languages}>
            {data.node.languages.nodes.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
        </>
      )}
    </article>
  ) : (
    <h2 className={styles.h2_error}>Could not resolve to a node</h2>
  );
}
