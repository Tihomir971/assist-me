import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) {
		throw error(401, { message: 'Unauthorized' });
	}
	const productId = params.slug as unknown as number;
	const getProduct = async (id: number) => {
		const { data } = await supabase.from('m_product').select().eq('id', id).maybeSingle();

		return data;
	};
	const getCategories = async () => {
		const { data } = await supabase
			.from('m_product_category')
			.select('value:id,label:name')
			.order('name');

		return data;
	};
	const getImages = async (id: number) => {
		const { data: product } = await supabase
			.from('m_product')
			.select('imageurl')
			.eq('id', id)
			.single();

		// Generate public image URLs from the Supabase bucket
		const imageURLs: (string | null)[] = [];
		const imageNames = product?.imageurl?.split(';');
		if (imageNames) {
			for (let i = 0; i < imageNames.length; i++) {
				const { data } = await supabase.storage.from('products').getPublicUrl(imageNames[i]);
				imageURLs.push(data.publicUrl);
			}
		}

		/* 		if (imageNames) {
			imageURLs = await Promise.all(
				imageNames.map(async (imageName) => {
					const { data } = await supabase.storage.from('products').getPublicUrl(imageName);
					if (error) {
						console.error('Error getting public URL:', error);
						return null;
					}
					return data.publicUrl;
				})
			);
		} */

		return { imageURLs };
	};
	return {
		product: getProduct(productId),
		categories: getCategories(),
		streamed: {
			images: getImages(productId)
		}
	};
}) satisfies PageServerLoad;
