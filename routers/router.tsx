import {createBrowserRouter} from 'react-router-dom';
import Layout from '../layouts/Layout';
import Products from '../views/Products';
import NewProduct from '../views/NewProduct';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Products />,
			},
			{
				path: 'products/new',
				element: <NewProduct />,
			},
		],
	},
]);

export default router;
