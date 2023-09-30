import type { RequestHandler } from './$types';
// src/routes/api/protected-route/+server.ts
import { json, error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) {
		// the user is not signed in
		throw error(401, { message: 'Unauthorized' });
	}
	const { data } = await supabase.from('ad_user').select('*');

	return json({ data });
	/* return new Response(); */
};
