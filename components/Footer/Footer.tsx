import Image from 'next/image';
import Link from 'next/link';
import { footerLinks } from '../../constants';

type ColumnProps = {
	title: string;
	links: Array<string>;
};

const FooterColumn = ({ title, links }: ColumnProps) => {
	return (
		<div className='footer_column'>
			<h4 className='font-semibold'>{title}</h4>
			<ul className='flex flex-col gap-2 font-normal'>
				{links.map((link, index) => (
					<Link href='/' key={index}>
						{link}
					</Link>
				))}
			</ul>
		</div>
	);
};

const Footer = () => {
	return (
		<footer className='flexStart footer absolute left-0 right-0 bottom-0'>
			<div className='flex flex-col w-full'>
				<div className='flex items-start flex-col'>
					<Image src='logo-purple.svg' width={115} height={38} alt='logo' />
					<p className='text-start text-sm font-normal mt-5'>
						Flexible is the world&apos;s leading community for creatives to
						share, grow and get hired.
					</p>
				</div>
			</div>
			<div className='flexCenter footer_copyright flex-wrap flex-col '>
				<div>
					<p>&copy; 2023 Flexible. All rights reserved.</p>
				</div>
				<div>
					<p className='text-gray'>
						<span className='text-black font-semibold'>
							<Link href={'https://www.vatsalrajgor.com'} target='_blank'>
								Vatsal Rajgor
							</Link>
						</span>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
