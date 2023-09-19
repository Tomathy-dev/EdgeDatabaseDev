import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		list: await prisma.transaction.findMany({
			where: {
				date: {
					gte: new Date(new Date().setDate(new Date().getDate() - 120))
				}
			}
		})
	};
}
