import { Params } from 'react-router-dom';
import { safeParse, coerce, number, parse } from 'valibot';

import { DraftProductSchemaCreate, DraftProductSchemaUpdate } from '../schemas';
import {
	addProduct,
	deleteProduct,
	getProductById,
	updateProduct,
} from '../services/ProductServices';
import type { NewProduct, UpdateProduct } from '../types';
import { toBoolean } from '../utils/index';

type ProductData = {
	[k: string]: FormDataEntryValue;
};

async function handleAddProduct(data: ProductData) {
	try {
		const result = safeParse(DraftProductSchemaCreate, {
			name: data.name,
			price: +data.price,
		});

		if (!result.success) {
			const msgErrors = result.issues.map((msg, i) => `${i + 1}. ${msg.message}`);
			const msgErrorsStr = msgErrors.join(',\n');
			throw new Error(`Invalid Data:\n${msgErrorsStr}`);
		}

		const product: NewProduct = result.output;

		await addProduct(product);
	} catch (err) {
		console.error(err);
	}
}

async function handleGetProduct(params: Params<string>) {
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

async function handleUpdateProduct(params: Params<string>, data: ProductData) {
	try {
		const NumberSchema = coerce(number(), Number);

		const result = safeParse(DraftProductSchemaUpdate, {
			name: data.name,
			price: parse(NumberSchema, data.price),
			availability: toBoolean(data.availability.toString()),
		});

		if (!result.success) {
			const msgErrors = result.issues.map((msg, i) => `${i + 1}. ${msg.message}`);
			const msgErrorsStr = msgErrors.join(',\n');
			throw new Error(`Invalid Data:\n${msgErrorsStr}`);
		}

		const id = params.id ? parseInt(params.id) : 0;
		if (isNaN(id)) {
			throw new Error('Invalid ID');
		}

		const product: UpdateProduct = { ...result.output };

		return await updateProduct(id, product);
	} catch (err) {
		console.error(err);
	}
}

async function handleDeleteProduct(params: Params<string>) {
	try {
		const id = params.id ? parseInt(params.id) : 0;
		if (isNaN(id)) {
			throw new Error('Invalid ID');
		}
		return await deleteProduct(id);
	} catch (err) {
		console.error(err);
	}
}

export {
	handleAddProduct,
	handleGetProduct,
	handleUpdateProduct,
	handleDeleteProduct,
};
