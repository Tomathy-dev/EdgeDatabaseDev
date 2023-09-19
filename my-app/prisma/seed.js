import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

let users = [];
let trans = [];
let gamer = {};
let transac = {};

async function main() {
	for (let i = 0; i < 100; i++) {
		gamer = {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			personal: Math.random() < 0.5,
			matters: {
				create: [
					{
						matter: 1,
						department: faker.commerce.department(),
						inCharge: faker.person.firstName()
					},
					{
						matter: 2,
						department: faker.commerce.department(),
						inCharge: faker.person.firstName()
					}
				]
			}
		};
		users.push(gamer);
	}

	for (const u of users) {
		const file = await prisma.file.create({
			data: u
		});
		console.log(file);
	}
	const addedCards = [
		{
			cardNumber: '1234567890123456',
			bankName: 'Caixa Geral de Depósitos'
		},
		{
			cardNumber: '1234567890123457',
			bankName: 'Novo Banco'
		}
	];
	await Promise.all(
		addedCards.map(async (card) => {
			await prisma.card.create({
				data: card
			});
		})
	);

	for (let i = 0; i < 500; i++) {
		transac = {
			matterRel: {
				connect: {
					fileId_matter: {
						fileId: faker.number.int({ min: 1, max: 100 }),
						matter: faker.number.int({ min: 1, max: 2 })
					}
				}
			},
			date: faker.date.between({
				from: '2017-01-01T00:00:00.000Z',
				to: '2023-07-31T00:00:00.000Z'
			}),
			description: faker.finance.transactionDescription(),
			value: faker.number.bigInt({ min: -50000000n, max: 50000000n }),
			card: {
				connect: { cardNumber: '1234567890123456' }
			},
			transactionMethod: faker.finance.transactionType()
		};
		trans.push(transac);
	}
	for (const u of trans) {
		const card = await prisma.card.findUnique({
			where: {
				cardNumber: '1234567890123456'
			},
			select: {
				totalMoney: true
			}
		});
		const matter = await prisma.matter.findUnique({
			where: {
				fileId_matter: {
					fileId: u.matterRel.connect.fileId_matter.fileId,
					matter: u.matterRel.connect.fileId_matter.matter
				}
			},
			select: {
				totalMoney: true
			}
		});
		if (!card) throw new Error('Card not found');
		await prisma.$transaction(async (tx) => {
			const transaction = await tx.transaction.create({
				data: u
			});
			console.log(transaction);
			await tx.matter.update({
				where: {
					fileId_matter: {
						fileId: transaction.file,
						matter: transaction.matter
					}
				},
				data: {
					totalMoney: matter.totalMoney + BigInt(u.value)
				}
			});
			await tx.card.update({
				where: {
					cardNumber: '1234567890123456'
				},
				data: {
					totalMoney: card.totalMoney + BigInt(u.value)
				}
			});
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.log(e);
		await prisma.$disconnect();
		process.exit(1);
	});
