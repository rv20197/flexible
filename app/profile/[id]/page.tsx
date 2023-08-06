import { UserProfile } from '../../../common.types';
import ProfilePage from '../../../components/ProfilePage/ProfilePage';
import { getUserProjects } from '../../../lib/actions';

type Props = {
	params: {
		id: string;
	};
};

const UserProfile = async ({ params: { id } }: Props) => {
	const result = (await getUserProjects(id, 100)) as { user: UserProfile };

	if (!result?.user) {
		<p className='no-result-text'>Failed to fetch user information.</p>;
	}

	return <ProfilePage user={result?.user} />;
};

export default UserProfile;
