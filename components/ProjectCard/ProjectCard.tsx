'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

type Props = {
	id: string;
	image: string;
	title: string;
	name: string;
	avatarUrl: string;
	userId: string;
};

const ProjectCard = ({ id, image, title, name, avatarUrl, userId }: Props) => {
	const [likes, setLikes] = useState(0);
	const [views, setViews] = useState('');

	useEffect(() => {
		const generateRandomNumbers = () => {
			const randomLikes = Math.floor(Math.random() * 1000);
			const randomViews = (Math.floor(Math.random() * 10000) / 1000).toFixed(1);
			setLikes(randomLikes);
			setViews(randomViews);
		};
		generateRandomNumbers();
	}, []);

	return (
		<div className='flexCenter flex-col rounded-2xl drop-shadow-card'>
			<Link
				href={`/project/${id}`}
				className='flexCenter group relative w-full h-full'>
				<Image
					src={image}
					alt={title}
					width={414}
					height={314}
					priority
					fill
					className='w-full h-full object-cover rounded-2xl'
				/>
				<div className='hidden group-hover:flex profile_card-title'>
					{title}
				</div>
			</Link>

			<div className='flexBetween w-full px-2 mt-3 font-semibold text-sm'>
				<Link href={`/profile/${userId}`}>
					<div className='flexCenter gap-2'>
						<Image
							src={avatarUrl}
							width={24}
							height={24}
							alt='profile-image'
							className='rounded-full'
						/>
						<p className='text-md'>{name}</p>
					</div>
				</Link>

				<div className='flexCenter gap-3'>
					<div className='flexCenter gap-2'>
						<Image
							src={'/hearth.svg'}
							alt='like-button'
							width={13}
							height={12}
						/>
						<p className='text-sm'>{likes}</p>
					</div>
					<div className='flexCenter gap-2'>
						<Image
							src={'/eye.svg'}
							alt='views-button'
							width={13}
							height={12}
						/>
						<p className='text-sm'>{views}k</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
