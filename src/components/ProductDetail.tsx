import { FormEvent } from 'react';
import {
	useNavigate,
	Form,
	ActionFunctionArgs,
	redirect,
	useFetcher,
} from 'react-router-dom';
import type { Product } from '../types';
import { formatCurrency } from '../utils/index';
import { handleDeleteProduct } from '../handlers/ProductHandlers';

type ProductDetailProps = {
	product: Product;
};

async function action({ params }: ActionFunctionArgs) {
	await handleDeleteProduct(params);
	return redirect('/');
}

function ProductDetail({ product }: ProductDetailProps) {
	const fetcher = useFetcher();
	const navigate = useNavigate();
	const isAvailability = product.availability ? 'Disponible' : 'No Disponible';

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		if (
			!confirm(`¿Estás seguro de que deseas eliminar el producto ${product.name}?`)
		) {
			e.preventDefault();
		}
	};

	return (
		<tr className='border-b '>
			<td className='p-3 text-lg text-gray-800'>{product.name}</td>
			<td className='p-3 text-lg text-gray-800'>{formatCurrency(product.price)}</td>
			<td className='p-3 text-lg text-gray-800'>
				<fetcher.Form method='POST'>
					<button
						type='submit'
						name='id'
						className={`${isAvailability === 'Disponible' ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
						value={product.id}
					>
						{isAvailability}
					</button>
				</fetcher.Form>
			</td>
			<td className='p-3 text-lg text-gray-800'>
				<div className='flex gap-2 items-center'>
					<button
						onClick={() => navigate(`productos/${product.id}/editar`)}
						className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
					>
						Editar
					</button>

					<Form
						className='w-full'
						method='POST'
						action={`productos/${product.id}/eliminar`}
						onSubmit={handleSubmit}
					>
						<input
							type='submit'
							value='Eliminar'
							className='bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer'
						/>
					</Form>
				</div>
			</td>
		</tr>
	);
}

export default ProductDetail;
export { action };
