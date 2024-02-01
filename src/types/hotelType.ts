export interface Hotels {
	data: Hotel[]
}

export interface HotelByID {
	data: Hotel
}

export interface Hotel {
	id: number
	image?: string
	name: string
	city: string
	rate: string
	rating: string
	currency: string
	description: string
}
