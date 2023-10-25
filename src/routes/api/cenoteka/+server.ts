import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
//import { PUBLIC_BEARER_TOKEN } from '$env/static/public';

export const POST: RequestHandler = async ({ request, locals: { getSession } }) => {
	const session = await getSession();
	if (!session) {
		throw error(401, { message: 'Unauthorized' });
	}
	const req = await request.json();
	console.log('req', req);

	//const html = await getCenoteka(categoryId);
	return new Response();
};

/* async function getCenoteka(categoryId: string) {
	const api = 'http://192.168.1.10:4443/cenoteka';
	const response = await fetch(api);

	if (!response.ok) {
		throw new Error(`Failed to fetch: ${response.status}`);
	}

	return await response.text();
} */
