import type { Actions } from './$types';

export const actions = {
	readProduct: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		console.log('id', id);
		return {
			smoothies: data ?? []
		};
	},
	updateProduct: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as unknown as number;
		const name = data.get('name') as string;
		const sku = data.get('sku') as string;
		const brand = data.get('brand') as string;
		const mpn = data.get('mpn') as string;
		const barcode = data.get('barcode') as string;
		const m_product_category_id = data.get('m_product_category_id') as unknown as number;
		const isselfservice = data.get('isselfservice') as unknown as boolean;
		const discontinued = data.get('discontinued') as unknown as boolean;
		const isactive = data.get('isactive') as unknown as boolean;
		console.log(
			id,
			name,
			sku,
			brand,
			mpn,
			barcode,
			m_product_category_id,
			isselfservice,
			discontinued,
			isactive
		);
	}
} satisfies Actions;
