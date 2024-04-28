import {safeParse} from 'valibot';
import {DraftProductSchema} from '../schemas';
import {addProduct} from '../services/ProductServices';

type ProductData = {
	[k: string]: FormDataEntryValue;
};

export async function handleAddProduct(data: ProductData) {
	try {
		const result = safeParse(DraftProductSchema, {
			name: data.name,
			price: +data.price,
		});

		if (!result.success) {
			throw new Error('Invalid Data');
		}

		return await addProduct({...result.output});
	} catch (err) {
		console.error(err);
	}
}
