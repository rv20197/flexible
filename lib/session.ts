import { getServerSession } from 'next-auth/next';
import { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import jsonwebtoken from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

import { SessionInterface, UserProfile } from '../common.types';
import { createUser, getUser } from './actions';

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXT_AUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.NEXT_GOOGLE_SECRET || ''
		})
	],
	jwt: {
		encode: async ({ secret, token }) => {
			const encodedToken = jsonwebtoken.sign(
				{
					...token,
					issuer: 'grafbase',
					expiresIn: 900000
				},
				secret
			);
			return encodedToken;
		},
		decode: async ({ secret, token }) => {
			const decodedToken = jsonwebtoken.verify(token!, secret) as JWT;
			return decodedToken;
		}
	},
	theme: {
		colorScheme: 'auto',
		logo: '/logo.png'
	},
	callbacks: {
		async session({ session }) {
			const email = session?.user?.email as string;
			try {
				const userData = (await getUser(email as string)) as {
					user?: UserProfile;
				};
				const newSession = {
					...session,
					user: {
						...session.user,
						...userData?.user
					}
				};
				return newSession;
			} catch (error) {
				console.error(error);
				return session;
			}
		},
		async signIn({ user }: { user: User }) {
			try {
				//Get user if exist
				const userExists = (await getUser(user?.email as string)) as {
					user?: UserProfile;
				};
				// If they don't exist create one
				if (!userExists.user) {
					await createUser(
						user.name as string,
						user.email as string,
						user.image as string
					);
				}
				return true;
			} catch (error: any) {
				console.log(error);
				return false;
			}
		}
	}
};

export const getCurrentUser = async () => {
	const session = (await getServerSession(authOptions)) as SessionInterface;
	return session;
};
