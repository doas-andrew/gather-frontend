const images = {
	'Art': [ require('./art1.jpeg') ],
	'Culinary Arts & Dining': [ require('./food1.jpeg'),  require('./dining2.jpeg') ],
	'Health & Fitness': [ require('./nature2.jpeg') ],
	'Outdoors & Nature': [ require('./nature1.jpeg'), require('./nature2.jpeg') ],
	'Pets': [ require('./dog1.jpeg') ],
	'Sports': [ require('./sports1.jpeg'), require('./sports2.jpeg') ]
}

export function getRandomImage (category) {
	let upperBound = images[category].length
	let index = Math.floor(Math.random() * upperBound)
	return images[category][index]
}

export const categories = Object.keys(images)
