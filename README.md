<h1 align="center">App for finding repositories</h1>

> **Note:** this is a test assignment for a Middle Frontend Developer position, completed in July 2023.
> The application code is kept close to its original state; later commits fix the build/lint setup,
> remove the API token from the bundle and add deployment to GitHub Pages.

A small SPA for searching GitHub repositories via the GitHub GraphQL API.

**Live demo:** https://antonchehov.github.io/github-repo-search/

The GitHub GraphQL API requires authorization, so on the first visit the app asks for a
[personal access token](https://github.com/settings/tokens/new?description=github-repo-search)
(no scopes needed). The token is stored only in your browser's `sessionStorage` (until the tab is closed) and is sent only to `api.github.com`.

## Features

- Search repositories by query, sorted by stars
- Client-side pagination (up to 100 results, 10 per page)
- Repository details page: stars, last commit date, owner, description, languages
- Last search query and page are restored from `sessionStorage`

## Tech stack

React 18 · TypeScript · Apollo Client (GraphQL) · React Router 6 · Vite · CSS Modules · Playwright · ESLint (Airbnb) + Prettier

## Steps for setup and usage

### Installation

1. Clone the repository.
2. Run command `npm install`.
3. Run the app with the `npm run dev` command and enter your GitHub token in the form.
4. Run the tests with `GITHUB_TOKEN=YOUR_TOKEN npm test` (the dev server must be running).

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm test` | Run Playwright e2e tests |

Every push to `main` is built and deployed to GitHub Pages by GitHub Actions.

## What I would do differently today

- Use cursor-based pagination from the GraphQL API instead of loading 100 results at once
- Handle edge cases on the details page (unknown id, repositories without commits)
- Reset the current page on a new search
- Make e2e tests independent from hashed CSS class names and the live API (`data-testid`, mocked responses)
