import {createBrowserRouter} from 'react-router-dom';
import Layout from '../layouts/Layout';
import Products from '../views/Products';
import NewProduct, {action as NewProductAction} from '../views/NewProduct';

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
				path: 'productos/nuevo',
				element: <NewProduct />,
				action: NewProductAction,
			},
		],
	},
]);

export default router;
