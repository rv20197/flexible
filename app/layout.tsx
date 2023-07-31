import './globals.css'
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
		<html lang='en'>
			<body>
				<h1>Navbar</h1>
				<main>{children}</main>
				<h1>Footer</h1>
			</body>
		</html>
	);
}
