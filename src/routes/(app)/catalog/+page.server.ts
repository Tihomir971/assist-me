import type { Actions } from './$types';

export const actions = {
	updateProduct: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const name = data.get('name');
		const sku = data.get('sku');
		const barcode = data.get('barcode');
		console.log('id,name,sku,barcode,', id, name, sku, barcode);
	}
} satisfies Actions;
