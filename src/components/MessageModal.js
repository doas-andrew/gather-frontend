import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateSeenMessage } from '../actions/message_actions'
import Modal from 'react-modal'
import { FaWindowClose, FaReply } from 'react-icons/fa'
import '../stylesheets/MessageModal.css'


class MessageModal extends React.Component {

	componentDidMount() {
		if (!this.props.message.seen)
			this.props.dispatch(updateSeenMessage(this.props.message.id))
	}

	closeModal = ()=> this.props.dispatch({type: 'CLOSE_MODAL'}) 

	render() {
		let user = this.props.view === 'inbox' ? 'sender' : 'recipient'
		let sent = this.props.view === 'sent'
		let replyRoute = '/messages/compose?recipient='+this.props.message[user].username
		return (
			<Modal
				id='MessageModal'
			  isOpen={!!this.props.message}
			  contentLabel="Message Modal"
	    >
		    <FaWindowClose className='close' onClick={this.props.closeModal}/>
		    <h1 className='heading'>{this.props.message.subject}</h1>
		    <h3>{sent ? 'To' : 'From'} {this.props.message[user].full_name} <Link to={'/profile/'+this.props.message[user].id}>(@{this.props.message[user].username})</Link></h3>
		    <div className='content'>
		    	<p>{this.props.message.content ? this.props.message.content : '[ No message ]'}</p>
		    </div>
		    { !sent && <Link to={replyRoute}><div onClick={this.closeModal} className='btn-blue'><FaReply/> &nbsp; Reply</div></Link> }
		  </Modal>
		)
	}
}

export default connect()(MessageModal)
