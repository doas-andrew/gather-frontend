import React from 'react'
import { connect } from 'react-redux'
import { deleteMessages } from '../actions/message_actions'
import MessageCard from '../components/MessageCard'
import '../stylesheets/MessageContainer.scss'


class MessageContainer extends React.Component {

	showMessages = ()=> this.props.messages.map( msg => 
		<MessageCard
			key={msg.id}
			message={msg}
			checked={this.props.messagesToDelete.includes(msg.id)}
			view={this.props.view}
			deleteMode={this.props.deleteMode}
			markForDeletion={this.props.markForDeletion}
		/>)

	handleSubmit = event => {
		event.preventDefault()
		this.props.dispatch(deleteMessages(this.props.messagesToDelete))
		this.props.toggleDeleteMode()
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div id='MessageContainer'>
					{
						this.props.messages && this.props.messages.length ?
						this.showMessages() : <div className='empty-tab'>[ Empty ]</div>
					}
				</div>
				{ this.props.deleteMode && <div className='delete-btn-div'><hr/><button type='submit' className='delete-btn btn-red'>Delete {this.props.messagesToDelete.length} messages</button></div> }
			</form>
		)
	}
}

const url_key = { inbox: 'messages', sent: 'sent_messages' }

let mapStateToProps = (state, props) => ({
	messages: state.user[url_key[props.view]]
})

export default connect(mapStateToProps)(MessageContainer)
