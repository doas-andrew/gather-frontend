// js
import React from 'react'
import { connect } from 'react-redux'
import { createMessage } from '../actions/message_actions'
// css
import '../stylesheets/ComposeMessage.css'


const textAreaPlaceholders = ['Say something nice!', 'Make it a good one!']


class ComposeMessage extends React.Component {

	state = { recipient_username: '' }

	checkErrors = field => this.props.errors && this.props.errors.find( err => err.startsWith(field))

	usernameFieldValue = ()=> {
		if (this.checkErrors('Recipient'))
			return `User "${this.state.recipient_username}" not found`

		else if (this.checkErrors('You'))
			return "You can't message yourself"

		else
			return this.props.recipient
	}

	render() {
		return (
			<div id='ComposeMessage'>
				<form onSubmit={ e => { this.setState({ recipient_username: e.target.recipient_username.value }); this.props.dispatch(createMessage(e)) }}>
					<div className='inputs'>
						<input
							required
							id='recipient'
							name='recipient_username'
							type='text'
							placeholder='Recipient'
							defaultValue = { this.usernameFieldValue() }
							style={ this.checkErrors('Recipient') || this.checkErrors('You') ? {borderColor: 'rgb(222,81,69)'} : null }

							onFocus={ e => e.target.placeholder = 'Enter a username' }
							onBlur ={ e => e.target.placeholder = 'Recipient' }
						/>
						<input
							required
							id='subject'
							name='subject'
							type='text' 
							placeholder='Subject'
							defaultValue = { this.checkErrors('Subject') ? "Subject can't be blank" : null }
							style={ this.checkErrors('Subject') ? {borderColor: 'rgb(222,81,69)'} : null }
						/>
					</div>
					<textarea
						name='content'
						placeholder={textAreaPlaceholders[Math.floor(Math.random()*textAreaPlaceholders.length)]}
						defaultValue = { this.checkErrors('Content') ? "Message can't exceed 999 characters." : null }
						style={ this.checkErrors('Content') ? {borderColor: 'rgb(222,81,69)'} : null }
					/>
					<br/><br/>
					<button className='btn-green'>Send</button>
				</form>
			</div>
		)
	}
}

let mapStateToProps = state => ({ errors: state.session.errors.message })
export default connect(mapStateToProps)(ComposeMessage)
