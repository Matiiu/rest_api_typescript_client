import {AvailabilityOptions} from '../types';

export const availabilityOptions: AvailabilityOptions[] = [
	{name: 'Disponible', value: true},
	{name: 'No Disponible', value: false},
].sort((a, b) => a.name.localeCompare(b.name));
