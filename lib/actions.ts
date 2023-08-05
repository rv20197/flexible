import { GraphQLClient } from 'graphql-request';
import {
	createProjectMutation,
	createUserMutation,
	getUserQuery
} from '../graphqlQueries';
import { ProjectForm } from '../common.types';

const isProduction = process.env.NODE_ENV === 'production';

const apiUrl = isProduction
	? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ''
	: 'http://127.0.0.1:4000/graphql';

const apiKey = isProduction
	? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ''
	: 'letMeIn';

const serverUrl = isProduction
	? process.env.NEXT_PUBLIC_SERVER_URL
	: 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
	try {
		return await client.request(query, variables);
	} catch (error) {
		throw error;
	}
};

export const getUser = (email: string) => {
	client.setHeader('x-api-key', apiKey);
	client.setHeader('Authorization', `Bearer ${apiKey}`);
	return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
	const queryVariables = {
		input: { name, email, avatarUrl }
	};
	client.setHeader('x-api-key', apiKey);
	client.setHeader('Authorization', `Bearer ${apiKey}`);
	return makeGraphQLRequest(createUserMutation, queryVariables);
};

export const fetchToken = async () => {
	try {
		const response = await fetch(`${serverUrl}/api/auth/token`);
		return response.json();
	} catch (error) {
		throw error;
	}
};

export const uploadImage = async (imagePath: string) => {
	try {
		const response = await fetch(`${serverUrl}/api/upload`, {
			method: 'POST',
			body: JSON.stringify({ path: imagePath })
		});
		return response.json();
	} catch (error) {
		throw error;
	}
};

export const createNewProject = async (
	form: ProjectForm,
	creatorID: string,
	token: string
) => {
	const imageUrl = await uploadImage(form.image);

	if (imageUrl.url) {
		client.setHeader('Authorization', `Bearer ${token}`);

		const queryVariables = {
			input: {
				...form,
				image: imageUrl.url,
				createdBy: {
					link: creatorID
				}
			}
		};

		return makeGraphQLRequest(createProjectMutation, queryVariables);
	}
};
