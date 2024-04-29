import {useNavigate} from 'react-router-dom';
import {Product} from '../types';
import {formatCurrency} from '../utils/index';

type ProductDetailProps = {
	product: Product;
};

export default function ProductDetail({product}: ProductDetailProps) {
	const navigate = useNavigate();
	const isAvailability = product.availability ? 'Disponible' : 'No Disponible';

	return (
		<tr className='border-b '>
			<td className='p-3 text-lg text-gray-800'>{product.name}</td>
			<td className='p-3 text-lg text-gray-800'>{formatCurrency(product.price)}</td>
			<td className='p-3 text-lg text-gray-800'>{isAvailability}</td>
			<td className='p-3 text-lg text-gray-800'>
				<div className='flex gap-2 items-center'>
					<button
						onClick={() => navigate(`productos/${product.id}/editar`)}
						className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
					>
						Editar
					</button>
				</div>
			</td>
		</tr>
	);
}
