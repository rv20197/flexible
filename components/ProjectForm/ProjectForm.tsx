'use client';
import React, { ChangeEvent } from 'react';
import { SessionInterface } from '../../common.types';
import Image from 'next/image';
import FormField from '../FormField/FormField';
import { formFields, projectForm } from '../../constants';

type Props = {
	type: string;
	session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {
	const handleFormSubmit = (e: React.FormEvent) => {};

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {};

	const handleStateChange = (fieldName: string, value: string) => {};

	return (
		<form onSubmit={handleFormSubmit} className='flexStart form'>
			<div className='flexStart form_image-container'>
				<label htmlFor='poster' className='flexCenter form_image-label'>
					{!projectForm.image && 'Choose a poster for your project.'}
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
				{projectForm.image && (
					<Image
						src={projectForm?.image}
						className='sm:p-10 object-contain z-20'
						alt='Project-Poster'
						fill
					/>
				)}
			</div>
			{formFields.map((f, i) => (
				<FormField
					title={f.title}
					state={f.state}
					placeholder={f.placeholder}
					setState={value => handleStateChange(f.name, value)}
					key={`${i}-${f}`}
				/>
			))}
			{/* CustomInput Category */}

			<div className='flexStart w-full'>
				<button>Create</button>
			</div>
		</form>
	);
};

export default ProjectForm;
