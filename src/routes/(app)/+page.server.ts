import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { getSession } }) => {
	console.log('(app) +page.server:', new Date());
	const session = await getSession();
	if (session) {
		// the user is signed in
		throw redirect(303, '/dashboard');
	}
}) satisfies PageServerLoad;
