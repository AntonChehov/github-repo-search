import { createRoot } from "react-dom/client";

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import App from "./components/App";
import { getToken } from "./utils/token";
import "../index.css";

const httpLink = createHttpLink({
	uri: "https://api.github.com/graphql",
});

const authLink = setContext((_, { headers }) => ({
	headers: {
		...headers,
		authorization: `Bearer ${getToken()}`,
	},
}));

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const rootContainer = document.querySelector("#root");
const root = createRoot(rootContainer);
root.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
);
