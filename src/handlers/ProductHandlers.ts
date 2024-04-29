import {safeParse, coerce, number, parse} from 'valibot';
import {DraftProductSchemaCreate, DraftProductSchemaUpdate} from '../schemas';
import {
	addProduct,
	getProductById,
	updateProduct,
} from '../services/ProductServices';
import {Params} from 'react-router-dom';
import type {NewProduct, UpdateProduct} from '../types';
import {toBoolean} from '../utils/index';

type ProductData = {
	[k: string]: FormDataEntryValue;
};

export async function handleAddProduct(data: ProductData) {
	try {
		const result = safeParse(DraftProductSchemaCreate, {
			name: data.name,
			price: +data.price,
		});

		if (!result.success) {
			const msgsErrors = result.issues.map((msg, i) => `${i + 1}. ${msg.message}`);
			const msgsErrorsStr = msgsErrors.join(',\n');
			throw new Error(`Invalid Data:\n${msgsErrorsStr}`);
		}

		const product: NewProduct = result.output;

		await addProduct(product);
	} catch (err) {
		console.error(err);
	}
}

export async function handleGetProduct(params: Params<string>) {
	try {
		const id = params.id ? parseInt(params.id) : 0;
		if (isNaN(id)) {
			throw new Error('Invalid ID');
		}
		return await getProductById(id);
	} catch (err) {
		console.error(err);
	}
}

export async function handleUpdateProduct(
	params: Params<string>,
	data: ProductData
) {
	try {
		const NumberSchema = coerce(number(), Number);

		const result = safeParse(DraftProductSchemaUpdate, {
			name: data.name,
			price: parse(NumberSchema, data.price),
			availability: toBoolean(data.availability.toString()),
		});

		if (!result.success) {
			const msgsErrors = result.issues.map((msg, i) => `${i + 1}. ${msg.message}`);
			const msgsErrorsStr = msgsErrors.join(',\n');
			throw new Error(`Invalid Data:\n${msgsErrorsStr}`);
		}

		const id = params.id ? parseInt(params.id) : 0;
		if (isNaN(id)) {
			throw new Error('Invalid ID');
		}

		const product: UpdateProduct = {...result.output};

		return await updateProduct(id, product);
	} catch (err) {
		console.error(err);
	}
}
