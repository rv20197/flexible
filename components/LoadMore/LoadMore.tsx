'use client';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const Button = dynamic(() => import('../Button/Button'));

type Props = {
	hasPreviousPage: boolean;
	hasNextPage: boolean;
	startCursor: string;
	endCursor: string;
};

const LoadMore = ({
	hasNextPage,
	hasPreviousPage,
	startCursor,
	endCursor
}: Props) => {
	const router = useRouter();
	const handleNavigation = (direction: string) => {
		const currentParams = new URLSearchParams(window.location.search);
		if (direction === 'next' && hasNextPage) {
			currentParams.delete('startCursor');
			currentParams.set('endCursor', endCursor);
		} else if (direction === 'previous' && hasPreviousPage) {
			currentParams.delete('endCursor');
			currentParams.set('startCursor', startCursor);
		}

		const newSearchParams = currentParams.toString();
		const newPathName = `${window.location.pathname}?${newSearchParams}`;
		router.push(newPathName);
	};

	return (
		<div className='w-full flexCenter gap-5 mt-10'>
			{hasPreviousPage && (
				<Button
					title={'Previous Page'}
					type={'button'}
					handleClick={() => handleNavigation('previous')}
				/>
			)}
			{hasNextPage && (
				<Button
					title={'Next Page'}
					type={'button'}
					handleClick={() => handleNavigation('next')}
				/>
			)}
		</div>
	);
};

export default LoadMore;
