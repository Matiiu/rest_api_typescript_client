import {
	Link,
	Form,
	useActionData,
	ActionFunctionArgs,
	redirect,
} from 'react-router-dom';
import ErrorMsg from '../components/ErrorMsg';

import { handleAddProduct } from '../handlers/ProductHandlers';
import ProductForm from '../components/ProductForm';

async function action({ request }: ActionFunctionArgs) {
	const data = Object.fromEntries(await request.formData());

	if (Object.values(data).some((val) => !val)) {
		return 'Todos los datos son obligatorios';
	}

	await handleAddProduct(data);
	return redirect('/');
}

function NewProduct() {
	const error = useActionData() as string;

	return (
		<>
			<div className='flex justify-between'>
				<h2 className='text-4xl font-black text-slate-500'>Registrar Producto</h2>
				<Link
					to='/'
					className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
				>
					Volver A Productos
				</Link>
			</div>

			{error && <ErrorMsg>{error}</ErrorMsg>}

			<Form
				className='mt-10'
				method='POST'
			>
				<ProductForm />
				<input
					type='submit'
					className='mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded'
					value='Registrar Producto'
				/>
			</Form>
		</>
	);
}

export default NewProduct;

export { action };
