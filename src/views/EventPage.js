import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRandomImage } from '../images/events/event_categories_and_images.js'
import DateDiv from '../components/DateDiv'
import Modal from 'react-modal'
import GoogleMap from '../components/GoogleMap'
import UserCard from '../components/UserCard'
import '../stylesheets/EventPage.scss'


class EventPage extends React.Component {

	state = {
		redirect: null,
		event: null,
		showMap: false
	}

	componentDidMount() {
		fetch('http://localhost:3000/events/'+this.props.id)
		.then(res => res.json())
		.then(res => {
			console.log(res)
			if (res.id)
				this.setState({ event: res })
			else
				this.setState({ redirect: <Redirect to='/event-not-found' /> })
		})
	}

	joinClick = ()=> {
		if (!localStorage.token)
			this.setState({ redirect: <Redirect to='/login' /> })
		else {
			fetch('http://localhost:3000/attends', {
				method: 'POST',
				headers: {
					Authorization: localStorage.token,
					'Content-type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({ attend: {event_id: this.state.event.id} })
			})
			.then(res => res.json())
			.then(res => {
				console.log(res)
				if (res.event)
					this.setState({ event: res.event })
			})
		}
	}

	showMapModal = ()=> (
		<Modal id='MapModal' isOpen={this.state.showMap} contentLabel="Google Maps" >
			<GoogleMap width='800px' height='500px' location={`${this.state.event.address}, ${this.state.event.city}, ${this.state.event.state}`} />
			<button className='btn-red' onClick={()=> this.setState({ showMap: false })}>Close</button>
		</Modal>
	)

	render() {

		if (this.state.redirect) return this.state.redirect
		if (!this.state.event)   return null

		let { event } = this.state
		let date = new Date(event.date)

		console.log(event.users)
		return (
			<div id='EventPage' className='page'>
				{ this.showMapModal() }

				<div>
					<img src={getRandomImage(event.category)} alt='event-img' />
				</div>

				<div className='flex'>
					<DateDiv size='large' date={date} color='dodgerBlue' />
					<div className='text-container'>
						<h1>{event.title}</h1> 
						{ !event.users.find( u => u.id === this.props.user_id ) && <button className='btn-vt' onClick={this.joinClick}>Join this Gathering</button>}
						<p>
							<strong>Organizer:</strong> <Link to={'/profile/'+event.organizer.id}>@{event.organizer.username}</Link>
							<br/><br/>
							<strong>Location:</strong> {event.address}, {event.city}, {event.state} <button className='btn-blue' onClick={()=> this.setState({ showMap: true }) }>Need directions?</button>
							<br/><br/>
							<strong>Details:</strong> {event.details}
						</p>
					</div>
				</div>

				<br/><hr/>

				<h2><span>{event.num_attendees}</span> users are attending this gathering</h2>

				<div className='user-container'>
					{event.users.map(u => <UserCard user={u} key={u.id} /> )}
				</div>
			</div>
		)
	}
}

let mapStateToProps = (state, props) => ({ id: props.match.params.id, user_id: state.user.id })
export default connect(mapStateToProps)(EventPage)
