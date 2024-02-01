<script setup lang="ts">
	import { formatCurrency } from '../helpers/formatCurrency'
</script>

<template>
	<article class="bg-white rounded-md shadow-md">
		<div>
			<img
				src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/20/c4/5a/5a/hotel-safi-metropolitan.jpg?w=1200&h=-1&s=1%201x,https://dynamic-media-cdn.tripadvisor.com/media/photo-o/20/c4/5a/5a/hotel-safi-metropolitan.jpg?w=1400&h=-1&s=1%202x"
				alt=""
				class="rounded shadow" />
		</div>
		<div class="m-3">
			<div class="flex items-center justify-between gap-2">
				<h2 class="text-xl font-bold">Hotel Safi Metropolitan</h2>
				<div class="flex">
					<svg
						v-for="i in 5"
						:key="i"
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-yellow-500"
						viewBox="0 0 20 20"
						fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M10 3.293l2.146 4.612 4.826.702-3.5 3.407.826 4.818L10 14.159l-4.299 2.772.826-4.818-3.5-3.407 4.826-.702L10 3.293z"
							clip-rule="evenodd" />
					</svg>
				</div>
			</div>
			<div>
				<p class="text-gray-500">Apodaca Nuevo leon</p>

				<p class="truncate mt-2">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
					deserunt libero ab corporis illum dolore aliquam eaque sed dolores
					facilis et fuga repudiandae, ipsam itaque minima quia laboriosam.
					Maxime, quasi.
				</p>
			</div>
			<div class="flex justify-end items-center gap-1 mt-7">
				<p class="border-b-2 border-black font-semibold">
					{{ formatCurrency(1500) }} USD
				</p>
			</div>
		</div>
	</article>
</template>
