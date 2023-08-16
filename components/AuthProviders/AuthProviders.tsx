'use client';

import { useState, useEffect } from 'react';
import {
	ClientSafeProvider,
	LiteralUnion,
	getProviders,
	signIn
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';
import dynamic from 'next/dynamic';
const Button = dynamic(() => import('../Button/Button'));

type Provider = {
	id: string;
	name: string;
	type: string;
	signInUrl: string;
	callbackUrl: string;
	signInUrlParams?: Record<string, string> | undefined;
};

type Providers =
	| Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
	| Provider
	| null;

const AuthProviders = () => {
	const [providers, setProviders] = useState<Providers | null>(null);

	useEffect(() => {
		const fetchProviders = async () => {
			const res = await getProviders();
			setProviders(res);
		};
		fetchProviders();
	}, []);

	const handleClick = (provider: Provider) => {
		signIn(provider?.id);
	};

	if (providers) {
		return (
			<div>
				{Object.values(providers).map((provider: Provider, idx) => (
					<Button
						key={idx}
						handleClick={() => handleClick(provider)}
						title='Sign In'
						type={'button'}
					/>
				))}
			</div>
		);
	}
};

export default AuthProviders;
