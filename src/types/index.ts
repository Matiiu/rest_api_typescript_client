import {Output} from 'valibot';
import {
	DraftProductSchemaCreate,
	DraftProductSchemaUpdate,
	ProductSchema,
} from '../schemas';

export type NewProduct = Output<typeof DraftProductSchemaCreate>;
export type Product = Output<typeof ProductSchema>;
export type UpdateProduct = Output<typeof DraftProductSchemaUpdate>;
export type AvailabilityOptions = {
	name: string;
	value: boolean;
};
