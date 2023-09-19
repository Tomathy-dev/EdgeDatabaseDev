<script>
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
</script>

<div class="w-20 h-full flex flex-col items-center shadow-md">
	<div class="my-4">
		<Icon icon="material-symbols:database-outline" class="text-5xl" />
	</div>
	<div class="w-16 h-[2px] bg-base-content" />
	<div
		class="mt-3 p-3 flex justify-center items-center rounded-md tooltip tooltip-right hover:bg-base-200 hover:cursor-pointer {$page.route.id?.split(
			'/'
		)[1] === 'dashboard'
			? 'outline-[3px] outline outline-base-content'
			: ''}"
		data-tip="Dashboard"
	>
		<Icon icon="material-symbols:dashboard" class="text-3xl" />
	</div>
	<div
		class="mt-3 p-3 flex justify-center items-center rounded-md tooltip tooltip-right hover:bg-base-200 hover:cursor-pointer {$page.route.id?.split(
			'/'
		)[1] === 'bank'
			? 'outline-[3px] outline outline-base-content'
			: ''}"
		data-tip="Bank"
	>
		<Icon icon="material-symbols:account-balance" class="text-3xl" />
	</div>
	<div
		class="mt-3 p-3 flex justify-center items-center rounded-md tooltip tooltip-right hover:bg-base-200 hover:cursor-pointer {$page.route.id?.split(
			'/'
		)[1] === 'list'
			? 'outline-[3px] outline outline-base-content'
			: ''}"
		data-tip="File List"
	>
		<Icon icon="material-symbols:list-alt" class="text-3xl" />
	</div>
</div>
