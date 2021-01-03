<template>
	<footer class="footer mt-3">
		<div class="container text-center">
			<p>
				Copyright &copy; 2020, <strong v-html='company'></strong> All Rights Reserved.
			</p>
		</div>
	</footer>
</template>
<script>
export default {
	props: ['company']
}
</script>