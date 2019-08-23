import React from 'react'
import EventCard from '../components/EventCard'
import '../stylesheets/EventsContainer.scss'
import { rails_api } from '../constants'

export default class EventsContainer extends React.Component {

	state = { events: null }

	componentDidMount() {
		fetch(rails_api+'/events')
		.then(res => res.json())
		.then(res => this.setState({ events: res }))
	}

	render() {
		if (!this.state.events)
			return null

		return (
			<div id='EventsContainer'>
				{
					this.state.events.map( e => <EventCard event={e} key={e.id} /> )
				}
			</div>
		)
	}
}
