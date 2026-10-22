export interface IRepoInfo {
  node: {
    name: string;
    url: string;
    description: string | null;
    stargazers: {
      totalCount: number;
    };
    defaultBranchRef: {
      target: {
        committedDate: string;
      };
    };
    owner: {
      avatarUrl: string;
      login: string;
      url: string;
    };
    languages: {
      nodes: {
        name: string;
      }[];
    };
  };
}
