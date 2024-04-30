import { array, boolean, number, object, string } from 'valibot';

export const DraftProductSchemaCreate = object({
	name: string(),
	price: number(),
});

export const DraftProductSchemaUpdate = object({
	name: string(),
	price: number(),
	availability: boolean(),
});

export const ProductSchema = object({
	id: number(),
	name: string(),
	price: number(),
	availability: boolean(),
});

export const ProductsSchema = array(ProductSchema);
