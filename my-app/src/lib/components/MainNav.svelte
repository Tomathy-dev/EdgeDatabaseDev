<script>
	import Icon from '@iconify/svelte';
</script>

<div class="w-20 h-full flex flex-col items-center shadow-md">
	<div class="my-4">
		<Icon icon="material-symbols:database-outline" class="text-5xl" />
	</div>
	<div class="w-16 h-[2px] bg-secondary" />
	<div
		class="mt-3 p-3 flex justify-center items-center rounded-md border-4 border-secondary hover:bg-base-200 hover:cursor-pointer"
	>
		<Icon icon="material-symbols:dashboard" class="text-3xl" />
	</div>
	<div
		class="mt-3 p-3 flex justify-center items-center rounded-md hover:bg-base-200 hover:cursor-pointer"
	>
		<Icon icon="material-symbols:account-balance" class="text-3xl" />
	</div>
	<div
		class="mt-3 p-3 flex justify-center items-center rounded-md hover:bg-base-200 hover:cursor-pointer"
	>
		<Icon icon="material-symbols:list-alt" class="text-3xl" />
	</div>
</div>
