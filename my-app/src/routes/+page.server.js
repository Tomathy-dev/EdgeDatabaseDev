import { redirect } from '@sveltejs/kit';


/** @type {import('./$types').PageServerLoad} */
export function load() {
  throw redirect(303, '/dashboard');
}