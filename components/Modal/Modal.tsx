'use client';
import { useCallback, useRef, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Modal = ({ children }: { children: ReactNode }) => {
	const overlay = useRef<HTMLDivElement>(null);
	const wrapper = useRef<HTMLDivElement>(null);

	const router = useRouter();

	const onClose = useCallback(() => {
		router.push('/');
		router.refresh();
	}, [router]);

	const handleClick = useCallback((e: React.MouseEvent) => {
		if ((e.target === overlay.current) && onClose) {
			onClose()
		}
	}, [onClose, overlay]);

	return (
		<div ref={overlay} className='modal' onClick={handleClick}>
			<button
				type='button'
				onClick={onClose}
				className='absolute top-4 right-8'>
				<Image src='/close.svg' width={17} height={17} alt='close' />
			</button>
			<div ref={wrapper} className='modal_wrapper'>
				{children}
			</div>
		</div>
	);
};

export default Modal;
