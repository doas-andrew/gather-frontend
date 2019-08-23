import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { getRandomImage } from '../images/events/event_categories_and_images.js'
import '../stylesheets/EventCard.scss'
import DateDiv from '../components/DateDiv'


export default function EventCard (props) {
	let { event } = props
	return (
		<div className='EventCard' style={{backgroundImage: `url(${getRandomImage(event.category)})` }}>
			<DateDiv size='small' date={new Date(event.date)} color='dodgerBlue' />
			<div className='stats'><span>{event.num_attendees}</span> <FaUser/></div>

			<Link to={'/events/'+event.id}>
				<h1 className='title'>{event.title}</h1>
			</Link>
		</div>
	)
}
