import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { FaUser, FaTrash } from 'react-icons/fa'
import { MdNewReleases } from "react-icons/md"
import { GoMail } from "react-icons/go"

import ComposeMessage from '../components/ComposeMessage'
import MessageContainer from '../containers/MessageContainer'
import FriendRequestContainer from '../containers/FriendRequestContainer'
import '../stylesheets/MessageCenter.scss'


class MessageCenter extends React.Component {

	state = {
		deleteMode: false,
		messagesToDelete: []
	}

	markForDeletion = message_id => {
    let newArr = this.state.messagesToDelete.slice()

    if (newArr.includes(message_id))
      newArr.splice(newArr.indexOf(message_id), 1)
    else
      newArr.push(message_id)

    this.setState({ messagesToDelete: newArr })
	}

	toggleDeleteMode = ()=> this.setState({ deleteMode: !this.state.deleteMode, messagesToDelete: [] })

	showContainer = ()=> {
		if(this.props.view === 'inbox' || this.props.view === 'sent')
			return <MessageContainer
							view={this.props.view}
							deleteMode={this.state.deleteMode}
							toggleDeleteMode={this.toggleDeleteMode}
							markForDeletion={this.markForDeletion}
							messagesToDelete={this.state.messagesToDelete}
						/>
		else if (this.props.view === 'compose')
			return <ComposeMessage recipient={ window.location.href.split('/').pop().split('?recipient=')[1] } />

		else if (this.props.view === 'FRs')
			return <FriendRequestContainer/>
	}

	FR_Tab_Text = ()=> {
		if (this.props.user.inc_FR.length > 0)
			return <Fragment>New Friend Requests &nbsp; <MdNewReleases/></Fragment>
		if (this.props.view === 'FRs')
			return <Fragment>Friend Requests &nbsp; <FaUser/></Fragment>
		else
			return <FaUser/>
	}

	tabText = label => this.props.view === label.toLowerCase() ? <Fragment>{label} &nbsp; <GoMail/></Fragment> : label

	render() {
		return (
			<div id='MessageCenter'>

				<div className="tab">
				  <Link to='/messages/inbox'  ><button className={this.props.view === 'inbox'   ? 'active' : 'tab-btn' }>{this.tabText('Inbox')}</button></Link>
				  <Link to='/messages/sent'   ><button className={this.props.view === 'sent'    ? 'active' : 'tab-btn' }>{this.tabText('Sent')}</button></Link>
				  <Link to='/messages/friend-requests'><button className={this.props.view === 'FRs' ? 'FR-active' : 'tab-FR' }>{this.FR_Tab_Text()}</button></Link>
				  <Link to='/messages/compose'><button className={this.props.view === 'compose' ? 'active' : 'tab-btn' }>{this.tabText('Compose')}</button></Link>
				  {
				  	(this.props.view === 'inbox' || this.props.view === 'sent') &&

			  		<button
			  			className={this.state.deleteMode ? 'delete delete-active' : 'delete' }
			  			onClick={this.toggleDeleteMode}
			  		>
			  			{this.state.deleteMode  ? 'Delete Mode' : null} <FaTrash className='trash-icon'/>
			  		</button>
					}
				</div>

				<div className='tabcontent'>
					{ this.showContainer() }
				</div>
			</div>
		)
	}
}

let mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps)(MessageCenter)
