import React from 'react'
import { Link } from 'react-router-dom'
import MessageModal from './MessageModal'
import { getImgSrc } from '../actions/user_actions'
import { MdNewReleases } from "react-icons/md"

export default class MessageCard extends React.Component {

	state = {
		showMessage: false
	}

	closeModal = ()=> this.setState({ showMessage: false })

	render() {
		if (this.state.showMessage)
			return <MessageModal message={this.state.showMessage} closeModal={this.closeModal} view={this.props.view}/>
		
		let user = this.props.view === 'inbox' ? 'sender' : 'recipient'
		let message = this.props.message
		return (
			<div
				// className='MessageCard'
				className='message'
				onClick={ e => this.props.deleteMode ? this.props.markForDeletion(message.id) : this.setState({ showMessage: this.props.message }) }
				style={ message.seen ? null : { borderColor: 'gold' }}
			>
				{ !message.seen && <MdNewReleases className='new' /> }
				<input readOnly hidden={!this.props.deleteMode} className='checkbox' type='checkbox' checked={this.props.checked} />
				<img className='avatar' src={ getImgSrc(this.props.message[user].avatar_url) } alt={message[user].username} />
				<div className='text-container'>
					<strong>Subject:</strong> {message.subject}
					<br/>
					<strong>{this.props.view === 'inbox' ? 'From' : 'To'}</strong> {message[user].full_name} <Link to={'/profile/'+this.props.message[user].id}>(@{this.props.message[user].username})</Link>
					<p>
						{message.content}
					</p>
				</div>
				<div className='date'>{message.date.full}</div>
			</div>
		)
	}
}
