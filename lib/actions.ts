import { GraphQLClient } from 'graphql-request';
import { createUserQuery, getUserQuery } from '../graphqlQueries';

const isProduction = process.env.NODE_ENV === 'production';

const apiUrl = isProduction
	? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ''
	: 'http://localhost:4000/graphql';

const apiKey = isProduction
	? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ''
	: 'letMeIn';

const serverUrl = isProduction
	? process.env.NEXT_PUBLIC_SERVER_URL
	: 'http://localhost:3000';

const makeGraphQLRequest = async (query: string, variables = {}) => {
	try {
		const client = new GraphQLClient(apiUrl);
		return await client.request(query, variables);
	} catch (error) {
		throw error;
	}
};

export const getUser = (email: string) => {
	return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
	const queryVariables = {
		input: { name, email, avatarUrl }
	};
	return makeGraphQLRequest(createUserQuery, queryVariables);
};
