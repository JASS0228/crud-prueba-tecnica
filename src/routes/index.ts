import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import HotelsView from '../Views/HotelsView.vue'
import CreateHotelView from '../Views/CreateHotelView.vue'
import HotelView from '../Views/HotelView.vue'
import UpdateHotelViewVue from '../Views/UpdateHotelView.vue'

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
	{
		path: '/hotel/:id',
		name: 'hotel',
		component: HotelView,
	},
	{
		path: '/update-hotel/:id',
		name: 'update-hotel',
		component: UpdateHotelViewVue,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
