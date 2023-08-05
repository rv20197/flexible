'use client';
import React, { ChangeEvent, useState } from 'react';
import { SessionInterface } from '../../common.types';
import Image from 'next/image';
import FormField from '../FormField/FormField';
import { categoryFilters, formFields, projectForm } from '../../constants';
import CustomMenu from '../CustomMenu/CustomMenu';
import Button from '../Button/Button';

type Props = {
	type: string;
	session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {
	const [form, setForm] = useState(projectForm);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleFormSubmit = (e: React.FormEvent) => {};

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
