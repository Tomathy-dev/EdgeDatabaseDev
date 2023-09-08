<script>
	import '../app.css';
	import MainNav from '$lib/components/MainNav.svelte';
</script>

<div class="w-screen h-screen flex flex-row overflow-hidden">
	<!--SideBar Left-->
	<MainNav />
	<slot />
</div>
