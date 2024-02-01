import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import HotelsView from '../Views/HotelsView.vue'
import CreateHotelView from '../Views/CreateHotelView.vue'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Hotels',
		component: HotelsView,
	},
	{
		path: '/crear-hotel',
		name: 'crear-hotel',
		component: CreateHotelView,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
