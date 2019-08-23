import React from 'react'
import { connect } from 'react-redux'
import { categories } from '../images/events/event_categories_and_images.js'
import united_states from '../united_states.js'
import EventCard from '../components/EventCard'
// import debounce from 'lodash/debounce'
import { IoMdSearch } from 'react-icons/io'
import { rails_api } from '../constants'
import '../stylesheets/EventSearch.scss'


const compare = (a,b, attr) => {
	if (a[attr] < b[attr]) return -1
	if (a[attr] > b[attr]) return  1
	else return 0
}

class EventSearch extends React.Component {

	state = {
		events: null,
		categoryFilter: 'All',
		stateFilter: 'All',
		sort: 'date',
		search: ''
	}

	componentDidMount() {
		fetch(rails_api+'/events')
		.then(res => res.json())
		.then(res => this.setState({ events: res }))
	}

	renderEventCards = ()=> {
		let eventArr = this.state.events.slice()

		if (this.state.categoryFilter !== 'All')
			eventArr = eventArr.filter( event => event.category === this.state.categoryFilter )
		if (this.state.stateFilter !== 'All')
			eventArr = eventArr.filter( event => event.state === this.state.stateFilter )

		switch (this.state.sort) {
			case 'abc': {
				eventArr = eventArr.sort( (a,b) => compare(a,b, 'title') )
				break
			}
			case 'date': {
				eventArr = eventArr.sort( (a,b) => compare(a,b, 'date') )
				break
			}
			case 'pop': {
				eventArr = eventArr.sort( (a,b) => compare(a,b, 'num_attendees') ).reverse()
				break
			}

			default: eventArr = eventArr
		}

		if (this.state.search)
			eventArr = eventArr.filter( event => event.title.toLowerCase().startsWith(this.state.search.toLowerCase()))

		return eventArr.map( event => <EventCard event={event} key={event.id} /> )
	}


	render() {
		if (!this.state.events)
			return null

		return (
			<div id='EventSearch'>
				<div className='search'>
					<h1>Join a gathering!</h1>
					<br/>

				<div className='grid'>
					<div className='filter-sort'>
						<div className='filters'>
							<div className='sub-heading'>Filter</div>
							<div>
								<select defaultValue='All' onChange={ e => this.setState({ categoryFilter: e.target.value }) }>
									<option value='All'>Show all Categories</option>
									{categories.map((c, index) => <option key={index}>{c}</option> )}
								</select>
								<br/>
								<select defaultValue='All' onChange={ e => this.setState({ stateFilter: e.target.value }) }>
									<option value='All'>Show all States</option>
									{united_states.map((s, index) => <option key={index} value={s.name}>{s.name}</option> )}
								</select>
							</div>
						</div>

						<div className='sorts'>
							<div className='sub-heading'>Sort</div>
							<select defaultValue='date' onChange={ e => this.setState({ sort: e.target.value }) }>
								<option value='abc'>Alphabetically</option>
								<option value='date'>Date</option>
								<option value='pop'>Popularity</option>
							</select>
						</div>
					</div>

					<div className='searchbar'>
						<input type='text' onChange={ e => this.setState({ search: e.target.value }) } />
						<button><IoMdSearch/></button>
					</div>
				</div>
			</div>

				<div className='events-container'>
					{ this.renderEventCards() }
				</div>
			</div>
		)
	}
}

export default connect()(EventSearch)
