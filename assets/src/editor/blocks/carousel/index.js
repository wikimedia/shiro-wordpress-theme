import metadata from './block.json';
import edit from './edit';
import save from './save';

export const { name } = metadata;

export const settings = {
	...metadata,
	edit,
	save,
};
