import Modal from "../../components/Modal/Modal";
import ProjectForm from "../../components/ProjectForm/ProjectForm";

const CreateProject = () => {
	return (
		<Modal>
			<h3 className='modal-head-text'>Create a New Project</h3>
			<ProjectForm />
		</Modal>
	);
};

export default CreateProject;
