import { gql } from "@apollo/client";

export const START_REPOS = gql`
  query GetStartRepos {
    search(query: "owner:AntonChehov", type: REPOSITORY, last: 10) {
      repositoryCount
      nodes {
        ... on Repository {
          id
          name
          url
          stargazers {
            totalCount
          }
          defaultBranchRef {
            target {
              ... on Commit {
                committedDate
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOS = gql`
  query GetRepos($getQuery: String!) {
    search(query: $getQuery, type: REPOSITORY, first: 100) {
      repositoryCount
      nodes {
        ... on Repository {
          id
          name
          url
          stargazers {
            totalCount
          }
          defaultBranchRef {
            target {
              ... on Commit {
                committedDate
              }
            }
          }
        }
      }
    }
  }
`;
