import {Output} from 'valibot';
import {DraftProductSchema} from '../schemas';

export type Product = Output<typeof DraftProductSchema>;
