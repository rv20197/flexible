export const getUserQuery = `
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

export const createUserQuery = `
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
