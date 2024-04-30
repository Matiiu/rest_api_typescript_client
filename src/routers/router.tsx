import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Products, {
	loader as productsLoader,
	action as productAvailabilityAction,
} from '../views/Products';
import NewProduct, { action as newProductAction } from '../views/NewProduct';
import EditProduct, {
	action as editProductAction,
	loader as editProductLoader,
} from '../views/EditProduct';
import { action as deleteProductAction } from '../components/ProductDetail';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Products />,
				loader: productsLoader,
				action: productAvailabilityAction,
			},
			{
				path: 'productos/nuevo',
				element: <NewProduct />,
				action: newProductAction,
			},
			{
				path: 'productos/:id/editar',
				element: <EditProduct />,
				action: editProductAction,
				loader: editProductLoader,
			},
			{
				path: 'productos/:id/eliminar',
				action: deleteProductAction,
			},
		],
	},
]);

export default router;
