import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Calendar from 'react-calendar'

import { categories } from '../images/events/event_categories_and_images.js'
import united_states from '../united_states.js'
import { rails_api } from '../constants'

import '../stylesheets/EventForm.scss'

//__________________________________________________


class EventForm extends React.Component {

	state = {
		redirect: null,
		date: null
	}

	handleSubmit = event => {
		event.preventDefault()
		let form = event.target
		let newEvent = {
			title: form.title.value,
			details: form.details.value,
			category: form.category.value,
			address: form.address.value,
			city: form.city.value,
			state: form.state.value,
			date: this.state.date
		}
		fetch(rails_api+'/events',{
			method: 'POST',
			headers: {
				Authorization: localStorage.token,
				'Content-type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ event: newEvent })
		})
		.then(res => res.json())
		.then(res => {
			if (res.errors)
				this.props.dispatch({ type: 'ERRORS', errType: 'events', errors: res.errors })

			else if (res.event) {
				this.props.dispatch({ type: 'NEW_EVENT', event: res.event })
				this.props.dispatch({ type: 'ERRORS' })
				this.setState({ redirect: <Redirect to={'/events/'+res.event.id} /> })
			}
		})
	}

	showErrors = ()=> this.props.errors.map((message, index) => <p className="error" key={index}>{message}</p>)
	checkErrors = field => this.props.errors && this.props.errors.find(e => e.startsWith(field)) ? {borderColor: 'rgb(215, 50, 40)'} : null

	render() {
		if (this.state.redirect)
			return this.state.redirect

		return (
			<div id='EventForm' className='page'>
				<h1>Organize a Gathering</h1>

				<form onSubmit={this.handleSubmit}>
					<div className='flex'>

						<div>
							<input required name='title' type='text' placeholder='Title' style={this.checkErrors('Title')} />
							<br/><br/>

							<select name='category' required defaultValue=''>
								<option disabled value='' >Choose a category</option>
								{categories.map((c, index) => <option key={index} value={c}>{c}</option> )}
							</select>

							<br/><br/>
							<textarea required name='details' placeholder='Details ( Time, attire, parking, etc )' style={this.checkErrors('Details')}></textarea>
						</div>

						<div>
							<input required name='address' type='text' placeholder='Address' style={this.checkErrors('Address')} />
							<br/><br/>

							<input required id='city' name='city' type='text' placeholder='City' style={this.checkErrors('City')} />
							<select required id='united-states' name='state' defaultValue=''>
								<option disabled value=''>State</option>
								{united_states.map((s, index) => <option key={index} value={s.name}>{s.name}</option> )}
							</select>

							<br/><br/>
							<Calendar minDate={new Date()} onChange={ e => this.setState({ date: e }) } />
						</div>
					</div>

					<button type='submit' className='btn-blue submit-btn'>Submit</button>
				</form>
				{
					this.props.errors && false && //turned off for now

					<div>
						<br/><hr/><br/>
						{this.showErrors()}
						<br/><br/><br/>
					</div>
				}
			</div>
		)
	}
}

let mapStateToProps = state => ({ errors: state.session.errors.events })
export default connect(mapStateToProps)(EventForm)
