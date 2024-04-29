import axios from 'axios';
import {safeParse} from 'valibot';
import type {NewProduct, Product, UpdateProduct} from '../types';
import {ProductSchema, ProductsSchema} from '../schemas';

export async function addProduct(product: NewProduct) {
	try {
		const url = `${import.meta.env.VITE_API_URL}/api/product`;
		await axios.post(url, product);
	} catch (err) {
		console.error('Server Error: ', err);
	}
}

export async function getProducts() {
	try {
		const url = `${import.meta.env.VITE_API_URL}/api/products`;
		const {data} = await axios(url);
		const result = safeParse(ProductsSchema, data.data);

		if (!result.success) {
			throw new Error('Invalid Data');
		}
		return result.output;
	} catch (err) {
		console.error('Server Error: ', err);
		return [];
	}
}

export async function getProductById(id: Product['id']) {
	try {
		const url = `${import.meta.env.VITE_API_URL}/api/product/${id}`;
		const {data} = await axios(url);
		const result = safeParse(ProductSchema, data.data);

		if (!result.success) {
			throw new Error('Invalid Data');
		}
		return result.output;
	} catch (err) {
		console.error('Server Error: ', err);
	}
}

export async function updateProduct(id: Product['id'], product: UpdateProduct) {
	try {
		const url = `${import.meta.env.VITE_API_URL}/api/product/${id}`;
		await axios.put(url, product);
	} catch (err) {
		console.error('Server Error: ', err);
	}
}
