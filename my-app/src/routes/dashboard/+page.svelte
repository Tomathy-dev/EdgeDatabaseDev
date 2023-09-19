<script>
	import Icon from '@iconify/svelte';
	import { scale } from 'svelte/transition';

	/** @type {import('./$types').PageServerData} */
	export let data;
	/**
	 * @type {number[]}
	 */
	let selected = [];
	let allSelected = false;

	/**
	 * @param {bigint} value
	 */
	function showBigInt(value) {
		if (value < BigInt(0)) {
			value = value * BigInt(-1);
			const s = handleDecimals(value);
			let left = s.substring(0, s.length - 2);
			let right = s.substring(s.length - 2);
			left = left.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			return left + '.' + right + '€';
		} else {
			const s = handleDecimals(value);
			let left = s.substring(0, s.length - 2);
			let right = s.substring(s.length - 2);
			left = left.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			return left + '.' + right + '€';
		}
	}

	/**
	 * @param {bigint} value
	 */
	function handleDecimals(value) {
		if (value < BigInt(10)) {
			return '00' + value.toString();
		} else if (value < BigInt(100) && value >= BigInt(10)) {
			return '0' + value.toString();
		} else {
			return value.toString();
		}
	}

	function selectAll() {
		if (allSelected) {
			selected = [];
			allSelected = false;
		} else {
			selected = data.list.map((item) => item.id);
			allSelected = true;
		}
	}
</script>

<!-- Default Layout -->
<div class="mx-10 my-4">
	<!-- Container for title -->
	<div class="mb-4">
		<h1 class="text-3xl font-bold">Dashboard</h1>
		<p class="text-base-content text-opacity-60">Welcome back, User!</p>
		<!-- TODO Change to actual User -->
	</div>
	<!-- Container for buttons -->
	<div class="my-2 w-full grid grid-cols-3 gap-x-2">
		<!-- Buttons -->
		<button class="btn btn-primary h-20 font-bold">
			<Icon icon="material-symbols:edit-document-outline" class="text-3xl" />
			Drafts
		</button>
		<!-- TODO Get the number of negative files -->
		<button class="btn btn-accent h-20 font-bold">
			<Icon icon="material-symbols:emergency-home-outline" class="text-3xl" />
			Negative Files
		</button>
		<button class="btn btn-secondary h-20 font-bold">
			<Icon icon="material-symbols:menu-book-outline" class="text-3xl" />
			Transaction History
		</button>
	</div>
	<div class="flex justify-center w-full">
		<div class="overflow-x-auto w-full rounded-md">
			<!-- Container -->
			<div class="border-4 border-primary w-full pb-2 relative flex justify-end gap-2 p-2">
				<h1 class="text-xl font-bold text-primary-content absolute left-4 top-2">Today</h1>
				<!-- Buttons -->
				{#if selected.length > 0}
					<div class="flex justify-end">
						<!-- TODO Add print and delete functionality -->
						<button class="btn btn-circle btn-ghost" transition:scale={{ duration: 200, start: 0 }}>
							<Icon icon="material-symbols:print-outline-rounded" class="text-2xl" />
						</button>
						<button class="btn btn-circle btn-ghost" transition:scale={{ duration: 200, start: 0 }}>
							<Icon icon="material-symbols:delete-outline" class="text-2xl" />
						</button>
					</div>
				{/if}
				<div class="join">
					<!--TODO Get actual banks-->
					<select name="Card" class="select select-bordered rounded-none font-bold">
						<option value="1234567891234567">1234 5678 9123 4567 - NB</option>
						<option value="1234567891234568">1234 5678 9123 4568 - CGD</option>
						<option value="1234567891234569">1234 5678 9123 4569 - BPI</option>
					</select>
					<!-- TODO Change table according to credit or debit-->
					<select name="Direction" class="select select-bordered rounded-none font-bold">
						<option value="OUT">OUT</option>
						<option value="IN">IN</option>
					</select>
				</div>
			</div>
			<!-- Table -->
			<table class="table table-zebra table-xs table-fixed font-bold">
				<thead class="bg-primary">
					<tr class="text-primary-content">
						<th class="w-8">
							<label for="Checkbox All">
								<input
									type="checkbox"
									class="checkbox"
									id="Checkbox All"
									on:click={selectAll}
									on:keydown={selectAll}
									bind:checked={allSelected}
								/>
							</label>
						</th>
						<th class="w-24">Date</th>
						<th class="w-24">File</th>
						<th class="w-24">Method</th>
						<th>Description</th>
						<th class="w-28">Value</th>
					</tr>
				</thead>
				<tbody>
					{#each data.list as { id, date, file, matter, transactionMethod, description, value }}
						<tr class="hover hover:cursor-pointer">
							<td>
								<label>
									<input type="checkbox" class="checkbox" bind:group={selected} value={id} />
								</label>
							</td>
							<td>
								{Number(date.getDate()) < 10
									? '0' + date.getDate()
									: date.getDate()}-{date.getMonth()}-{date.getFullYear()}
							</td>
							<td>{file}-{Number(matter) < 10 ? '0' + matter : matter}</td>
							<td>{transactionMethod}</td>
							<td>{description}</td>
							<td>{showBigInt(value)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style>
	table td:last-child {
		text-align: right;
	}

	table th:last-child {
		text-align: center;
	}

	th {
		font-weight: bold;
	}
</style>
