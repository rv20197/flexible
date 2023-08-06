'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { categoryFilters } from '../../constants';

const Categories = () => {
	const router = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();

	const category = searchParams.get('category') || 'All';

	const handleClick = (category: string) => {
		if (category.toLowerCase() === 'all') {
			router.refresh();
			router.push('/');
		} else {
			router.push(`${pathName}?category=${category}`);
		}
	};

	return (
		<div className='flexBetween w-full gap-5 flex-wrap'>
			<ul className='flex gap-2 overflow-auto'>
				{categoryFilters.map((cat, index) => (
					<button
						key={index}
						type='button'
						className={`${
							category === cat
								? 'bg-light-white-300 font-medium'
								: 'font-normal'
						}  px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
						onClick={() => handleClick(cat)}>
						{cat}
					</button>
				))}
			</ul>
		</div>
	);
};

export default Categories;
