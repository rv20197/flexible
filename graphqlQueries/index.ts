import { gql} from 'graphql-request'

export const getUserQuery = gql`
query GetUser($email: String!) {
	user(by: {email: $email}) {
		name
		email
		avatarUrl
		description
		githubUrl
		linkedinUrl
		id
		updatedAt
		createdAt
	}
}
`;

export const createUserQuery = gql`
mutation UserCreate($input: UserCreateInput!) {
  userCreate(input: $input){
    user {
      name
      email
      avatarUrl
      description
      githubUrl
      linkedinUrl
      id
    }
  }
}
`
