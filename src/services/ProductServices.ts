import axios from 'axios';
import {Product} from '../types';

export async function addProduct(product: Product) {
	try {
		const url = `${import.meta.env.VITE_API_URL}/api/product`;
		const {data} = await axios.post(url, product);
		console.log({data});
	} catch (err) {
		console.error(err);
	}
}
