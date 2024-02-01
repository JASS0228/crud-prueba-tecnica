import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import HotelsView from '../Views/HotelsView.vue'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Hotels',
		component: HotelsView,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
