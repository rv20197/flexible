import { MouseEventHandler } from 'react';
import Image from 'next/image';

type Props = {
	title: string;
	type: 'button' | 'submit';
	leftIcon?: string | undefined;
	rightIcon?: string | null;
	handleClick?: MouseEventHandler;
	isSubmitting?: boolean;
	bgColor?: string;
	textColor?: string;
};

const Button = ({
	title,
	type,
	leftIcon,
	rightIcon,
	handleClick,
	isSubmitting,
	bgColor,
	textColor
}: Props) => {
	return (
		<button
			type={type || 'button'}
			disabled={isSubmitting}
			className={`flexCenter gap-3 px-4 py-3 rounded-xl text-sm font-medium max-md:w-full ${
				isSubmitting ? 'bg-black/50' : bgColor || 'bg-primary-purple'
			} ${textColor || 'text-white'}`}
			onClick={handleClick}>
			{leftIcon && (
				<Image src={leftIcon} alt='leftIcon' width={14} height={14} />
			)}
			{rightIcon && (
				<Image src={rightIcon} alt='rightIcon' width={14} height={14} />
			)}
			{title}
		</button>
	);
};

export default Button;
