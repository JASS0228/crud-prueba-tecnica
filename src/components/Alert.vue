<script setup lang="ts">
	const props = defineProps({
		message: String,
		type: Boolean,
	})
</script>

<template>
	<div
		v-if="props.message"
		:class="`${
			props.type
				? 'bg-red-100 border-red-500 text-red-700'
				: 'bg-green-100 border-green-500 text-green-700'
		} border-l-4 b p-4 mt-5 w-full md:w-1/3`"
		role="alert">
		<p class="font-bold">Error</p>
		<p>{{ props.message }}</p>
	</div>
</template>
