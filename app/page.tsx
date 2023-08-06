import { ProjectInterface } from '../common.types';
import Categories from '../components/Categories/Categories';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import { fetchAllProjects } from '../lib/actions';

type ProjectsSearch = {
	projectSearch: {
		edges: { node: ProjectInterface }[];
		pageInfo: {
			hasPreviousPage: boolean;
			hasNestPage: boolean;
			startCursor: string;
			endCursor: string;
		};
	};
};

type searchParams = {
	category?: string;
};

type Props = {
	searchParams: searchParams;
};

const Home = async ({ searchParams: { category } }: Props) => {
	const data = (await fetchAllProjects(category)) as ProjectsSearch;

	const projectsToDisplay = data?.projectSearch?.edges || [];

	if (projectsToDisplay.length === 0) {
		return (
			<section className='flexStart flex-col paddings'>
				<Categories />
				<p className='no-result-text text-center'>
					No Projects Found Under Category {category}.
				</p>
			</section>
		);
	}

	return (
		<section className='flex-start flex-col paddings mb-16'>
			<Categories />
			<section className='projects-grid'>
				{projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
					<ProjectCard
						key={node?.id}
						id={node?.id}
						image={node?.image}
						title={node?.title}
						name={node?.createdBy?.name}
						avatarUrl={node?.createdBy?.avatarUrl}
						userId={node?.createdBy?.id}
					/>
				))}
			</section>
			<h1>LoadMore</h1>
		</section>
	);
};

export default Home;
