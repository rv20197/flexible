import Link from 'next/link';
import Image from 'next/image';
import { NavLinks } from '../../constants';
import AuthProviders from '../AuthProviders/AuthProviders';
import { getCurrentUser } from '../../lib/session';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const Navbar = async () => {
	const session = await getCurrentUser();

	return (
		<nav className='flexBetween navbar'>
			<div className='flex-1 flexStart gap-10'>
				<Link href='/'>
					<Image
						src='/logo.svg'
						alt='flexible-logo'
						width={115}
						height={43}
						priority
					/>
				</Link>
			</div>

			<div className='flexCenter gap-4'>
				{session?.user ? (
					<>
						<ProfileMenu session={session} />
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
