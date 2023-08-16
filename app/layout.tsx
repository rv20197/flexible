import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import './globals.css';
import { Inter } from 'next/font/google'

const inter = Inter({
	weight: ['400','500','600','700','800'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
	title: 'Flexible',
	description: 'Showcase and discover remarkable developer projects.'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={inter.className}>
			<body>
				<Navbar />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
