import { PUBLIC_BEARER_TOKEN } from '$env/static/public';
import { error } from '@sveltejs/kit';
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
		/* 		const id = data.get('id') as unknown as number;
		const name = data.get('name') as string;
		const sku = data.get('sku') as string;
		const brand = data.get('brand') as string;
		const mpn = data.get('mpn') as string;
		const barcode = data.get('barcode') as string;
		const m_product_category_id = data.get('m_product_category_id') as unknown as number; */
		const isselfservice = data.get('isselfservice');
		const discontinued = data.get('discontinued') as unknown as boolean;
		const isactive = data.get('isactive') as unknown as boolean;
		console.log(
			'isselfservice:',
			isselfservice,
			'discontinued:',
			discontinued,
			'isactive:',
			isactive
		);
		return;
	},
	callExternalApi: async ({ url, locals: { getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw error(401, { message: 'Unauthorized' });
		}

		const activeCategoryId = url.searchParams.get('cat');
		/* const title = 'Market research'; */

		/* 		const { data: activeCategory } = await supabase
			.from('m_product_category')
			.select('name')
			.eq('id', Number(activeCategoryId))
			.maybeSingle(); */

		// Send notifcation
		/* addToast(title, `Start: ${activeCategory?.name}`, 'brand', 10); */
		/* 		await supabase
			.from('ad_note')
			.insert([{ textMsg: `Start: ${activeCategory?.name}`, ad_user_id: user.id }]);
 */
		//Prepare fetch property
		const apiUrl = 'http://192.168.1.10:4443/cenoteka';
		const myHeaders = new Headers({ Authorization: 'Bearer ' + PUBLIC_BEARER_TOKEN });
		const formData = new FormData();
		formData.append('categ', activeCategoryId ?? '');

		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				body: formData,
				headers: myHeaders
			});
			if (!response.ok) {
				const data = await response.text();
				console.log('data', data);
				throw new Error(`Network response was not OK: ${response.statusText}`);
			}

			// Send notifcation
			/* addToast(title, `Finish: ${activeCategory?.name}`, 'success'); */
			/* await supabase
				.from('ad_note')
				.insert([{ textMsg: `Finish: ${activeCategory?.name}`, ad_user_id: user.id }]); */

			return;
		} catch (error) {
			if (error instanceof TypeError && error.message === 'Failed to fetch') {
				console.error('Failed to fetch:', error.message);
			} else {
				console.error('There has been a problem with your fetch operation:', error);
			}
		}
	}
} satisfies Actions;
