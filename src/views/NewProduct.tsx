import {Link, Form, useActionData, ActionFunctionArgs} from 'react-router-dom';
import ErrorMsg from '../components/ErrorMsg';

import {handleAddProduct} from '../handlers/ProductHandlers';

export async function action({request}: ActionFunctionArgs) {
	const data = Object.fromEntries(await request.formData());

	if (Object.values(data).some((val) => !val)) {
		return 'Todos los datos son obligatorios';
	}

	handleAddProduct(data);
	return '';
}

export default function NewProduct() {
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
				<div className='mb-4'>
					<label
						className='text-gray-800'
						htmlFor='name'
					>
						Nombre Producto:
					</label>
					<input
						id='name'
						type='text'
						className='mt-2 block w-full p-3 bg-gray-50'
						placeholder='Nombre del Producto'
						name='name'
					/>
				</div>
				<div className='mb-4'>
					<label
						className='text-gray-800'
						htmlFor='price'
					>
						Precio:
					</label>
					<input
						id='price'
						type='number'
						className='mt-2 block w-full p-3 bg-gray-50'
						placeholder='Precio Producto. ej. 200, 300'
						name='price'
					/>
				</div>
				<input
					type='submit'
					className='mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded'
					value='Registrar Producto'
				/>
			</Form>
		</>
	);
}
