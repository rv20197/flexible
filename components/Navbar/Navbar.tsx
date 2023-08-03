import Link from 'next/link';
import Image from 'next/image';
import { NavLinks } from '../../constants';
import AuthProviders from '../AuthProviders/AuthProviders';
import { getCurrentUser } from '../../lib/session';

const Navbar = async () => {
	const session = await getCurrentUser();

	return (
		<nav className='flexBetween navbar'>
			<div className='flex-1 flexStart gap-10'>
				<Link href='/'>
					<Image
						src='/logo.svg'
						alt='flexibble-logo'
						width={115}
						height={43}
						priority
					/>
				</Link>
				<ul className='xl:flex hidden text-small gap-7'>
					{NavLinks.map(link => (
						<Link key={`navbar-${link.key}`} href={link.href}>
							{link.text}
						</Link>
					))}
				</ul>
			</div>

			<div className='flexCenter gap-4'>
				{session?.user ? (
					<>
						<Image
							src={`${session?.user?.image}`}
							alt='profile-photo'
							width={40}
							height={40}
							className='rounded-full'
						/>
						<Link href={'/create-project'}>Share your work</Link>
					</>
				) : (
					<AuthProviders />
				)}
			</div>
		</nav>
	);
};

export default Navbar;