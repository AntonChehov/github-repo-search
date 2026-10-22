export const getRepoByPages = <T>(
  repos: T[],
  count = 1,
): {
  count: number;
  repos: T[][];
} => {
  const countRepos = count > 100 ? 100 : count;
  const countPages = Math.ceil(countRepos / 10);
  const reposPages: T[][] = [];

  for (let i = 0; i < countPages; i += 1) {
    reposPages.push(repos.slice(i * 10, (i + 1) * 10));
  }

  return { count: countPages, repos: reposPages };
};
