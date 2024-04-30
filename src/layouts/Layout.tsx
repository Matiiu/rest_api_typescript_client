import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
function Layout() {
	return (
		<>
			<Header />
			<main className='mt-10 mx-auto max-w-6xl p-10 bg-white shadow'>
				<Outlet />
			</main>
		</>
	);
}

export default Layout;
