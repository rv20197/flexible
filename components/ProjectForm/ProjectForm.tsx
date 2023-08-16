'use client';
import React, { ChangeEvent, useState } from 'react';
import dynamic from 'next/dynamic';
import { ProjectInterface, SessionInterface } from '../../common.types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { categoryFilters, formFields } from '../../constants';
import { createNewProject, fetchToken, updateProject } from '../../lib/actions';

const Button = dynamic(() => import('../Button/Button'));
const CustomMenu = dynamic(() => import('../CustomMenu/CustomMenu'));
const FormField = dynamic(() => import('../FormField/FormField'));

type Props = {
	type: string;
	session: SessionInterface;
	project?: ProjectInterface;
};

const ProjectForm = ({ type, session, project }: Props) => {
	const projectForm = {
		title: project?.title || '',
		description: project?.description || '',
		image: project?.image || '',
		liveSiteUrl: project?.liveSiteUrl || '',
		githubUrl: project?.githubUrl || '',
		category: project?.category || ''
	};
	const [form, setForm] = useState(projectForm);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		const { token } = await fetchToken();
		try {
			if (type === 'create') {
				// create project
				await createNewProject(form, session?.user?.id, token);
				router.push('/');
			}

			if (type === 'edit') {
				await updateProject(form, project?.id as string, token);
				router.push('/');
			}
		} catch (error) {
			console.log(`Error creating ${type}:`, error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const file = e.target.files?.[0];
		if (!file) {
			return;
		}

		if (!file.type.includes('image')) {
			return alert('Please upload an image file.');
		}

		const reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onload = () => {
			const result = reader.result as string;
			handleStateChange('image', result);
		};
	};

	const handleStateChange = (fieldName: string, value: string) => {
		setForm(prevState => ({
			...prevState,
			[fieldName]: value
		}));
	};

	return (
		<form onSubmit={handleFormSubmit} className='flexStart form'>
			<div className='flexStart form_image-container'>
				<label htmlFor='poster' className='flexCenter form_image-label'>
					{!form.image && 'Choose a poster for your project.'}
				</label>
				<input
					id='poster'
					name='poster'
					accept='image/*'
					type='file'
					required={type === 'create'}
					className='form_image-input'
					onChange={handleImageChange}
				/>
				{form.image && (
					<Image
						src={form?.image}
						className='sm:p-10 object-contain z-20'
						alt='Project-Poster'
						fill
					/>
				)}
			</div>
			{formFields.map((f, i) => {
				const fieldValue = form[f.name as keyof typeof form];
				return (
					<FormField
						title={f.title}
						type={f.type}
						state={fieldValue}
						placeholder={f.placeholder}
						setState={value => handleStateChange(f.name, value)}
						key={`${i}-${f.title}`}
					/>
				);
			})}

			<CustomMenu
				title='Category'
				state={form.category}
				filters={categoryFilters}
				setState={value => handleStateChange('category', value)}
			/>

			<div className='flexStart w-full'>
				<Button
					title={
						isSubmitting
							? `${type === 'create' ? 'Creating' : 'Editing'}`
							: `${type === 'create' ? 'Create' : 'Edit'}`
					}
					type='submit'
					leftIcon={isSubmitting ? '' : '/plus.svg'}
					isSubmitting={isSubmitting}
				/>
			</div>
		</form>
	);
};

export default ProjectForm;

// Project Time Stamp: 2:21:13
