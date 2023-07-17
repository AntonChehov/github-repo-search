import { ReactElement, useState } from "react";

import { useQuery as getQuery } from "@apollo/client";

import { START_REPOS, GET_REPOS } from "../../pages/Main/main.graphql.ts";
import { getRepoByPages } from "../../utils/getRepoByPages";
import Paginator from "../Paginator";
import Repos from "../Repository";
import Search from "../Search";
import SearchContext from "../context";
import * as styles from './main.module.css';

export default function Main(): ReactElement {
  const lastRequest = sessionStorage.getItem("lastRequest") || "";
  const lastPage = sessionStorage.getItem('lastPage') || 1;

  const [requestRepo, setRequestRepo] = useState<string>(lastRequest);
  const [currentPage, setPage] = useState<number>(Number(lastPage));

  const setRequest = (currentRequest: string): void => {
    sessionStorage.setItem('lastRequest', currentRequest);
    setRequestRepo(currentRequest);
  };

  const setPageRepo = (page: number): void => {
    sessionStorage.setItem('lastPage', String(page));
    setPage(page);
  };

  const { loading, error, data } = lastRequest
    ? getQuery(GET_REPOS, {
        variables: {
          getQuery: `${requestRepo} sort:stars`,
        },
      })
    : getQuery(START_REPOS);

  if (error) {
    return <h2 className={styles.h2_error}>{error.message}</h2>;
  }

  const pages =
    data && getRepoByPages(data.search.nodes, data.search.repositoryCount);

  return (
    <SearchContext.Provider value={{ requestRepo, setRequest }}>
      <Search />

      {loading ? (
        <h3 className={styles.h3}>Loading...</h3>
      ) : (
        <>
          <Repos repos={pages.repos[currentPage - 1]} />
          {pages.count > 1 && (
            <Paginator
              pages={pages.count}
              currentPage={currentPage}
              setPage={setPageRepo}
            />
          )}
        </>
      )}
    </SearchContext.Provider>
  );
}
