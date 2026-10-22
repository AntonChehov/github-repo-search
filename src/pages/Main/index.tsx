import { useState, useEffect, useMemo } from 'react';

import { useLazyQuery, ApolloError } from '@apollo/client';

import { START_REPOS, GET_REPOS } from './main.graphql';
import * as styles from './main.module.css';
import Paginator from '../../components/Paginator';
import Repos from '../../components/Repository';
import Search from '../../components/Search';
import SearchContext from '../../components/context';
import { getRepoByPages } from '../../utils/getRepoByPages';

export default function Main() {
  const lastRequest = sessionStorage.getItem('lastRequest') || '';
  const lastPage = sessionStorage.getItem('lastPage') || '1';

  const [requestRepo, setRequestRepo] = useState<string>(lastRequest);
  const [currentPage, setPage] = useState<number>(Number(lastPage));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApolloError | null>(null);

  const [getQuery, { loading: queryLoading, error: queryError, data: queryData }] =
    useLazyQuery(GET_REPOS);
  const [getStartRepos, { loading: startLoading, error: startError, data: startData }] =
    useLazyQuery(START_REPOS);

  useEffect(() => {
    if (lastRequest) {
      getQuery({
        variables: {
          getQuery: `${requestRepo} sort:stars`,
        },
      });
    } else {
      getStartRepos();
    }
  }, [requestRepo, lastRequest, getQuery, getStartRepos]);

  useEffect(() => {
    if (queryError) {
      setError(queryError);
    } else if (startError) {
      setError(startError);
    } else {
      setLoading(queryLoading || startLoading);
    }
  }, [queryError, queryLoading, startError, startLoading]);

  const searchContext = useMemo(
    () => ({
      requestRepo,
      setRequest: (currentRequest: string): void => {
        sessionStorage.setItem('lastRequest', currentRequest);
        setRequestRepo(currentRequest);
      },
    }),
    [requestRepo],
  );

  if (error) {
    return <h2 className={styles.h2_error}>{error.message}</h2>;
  }

  const data = queryData || startData;
  const pages = data && getRepoByPages(data.search.nodes, data.search.repositoryCount);

  const setPageRepo = (page: number): void => {
    sessionStorage.setItem('lastPage', String(page));
    setPage(page);
  };

  const renderRepos = () => {
    if (!pages || pages.count === 0) {
      return <p>No repositories found.</p>;
    }

    return (
      <>
        <Repos repos={pages.repos[currentPage - 1]} />
        {pages.count > 1 && (
          <Paginator pages={pages.count} currentPage={currentPage} setPage={setPageRepo} />
        )}
      </>
    );
  };

  return (
    <SearchContext.Provider value={searchContext}>
      <Search />

      {loading ? <h3 className={styles.h3}>Loading...</h3> : renderRepos()}
    </SearchContext.Provider>
  );
}
