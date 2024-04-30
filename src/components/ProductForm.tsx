import { Product } from '../types/index';
import { availabilityOptions } from '../data/availabilityOptions';

type ProductFormProps = {
	product?: Product;
	isAvailability?: boolean;
};
function ProductForm({ product, isAvailability = false }: ProductFormProps) {
	return (
		<>
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
					defaultValue={product?.name}
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
					defaultValue={product?.price}
				/>
			</div>

			{isAvailability && (
				<div className='mb-4'>
					<label
						className='text-gray-800'
						htmlFor='availability'
					>
						Disponibilidad:
					</label>
					<select
						id='availability'
						className='mt-2 block w-full p-3 bg-gray-50'
						name='availability'
						defaultValue={product?.availability.toString()}
					>
						{availabilityOptions.map((option) => (
							<option
								key={option.name}
								value={option.value.toString()}
							>
								{option.name}
							</option>
						))}
					</select>
				</div>
			)}
		</>
	);
}

export default ProductForm;
