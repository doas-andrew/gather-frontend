import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import EventCard from '../components/EventCard'
import ConfirmModal from '../components/ConfirmModal'
import { postFriendRequest, getImgSrc, destroyFriendship } from '../actions/user_actions'
import { FaCogs, FaUserPlus, FaUserMinus, FaUserCog, FaEnvelope } from 'react-icons/fa';
import { rails_api } from '../constants'
import '../stylesheets/Profile.scss'


class Profile extends Component {

	state = {
		redirect: null,
		user: {},
		isCurrentUser: parseInt(this.props.profile_id) === this.props.user.id,
		showConfirmModal: false
	}

	componentDidMount() {
		if (this.state.isCurrentUser)
			this.setState({ user: this.props.user })

		else {
			fetch(rails_api+'/users/'+this.props.profile_id, {
				headers: { Authorization: localStorage.token }
			})
			.then(res => res.json())
			.then(res => {
				if (res.user)
					this.setState({ user: res.user })
				else if (res.errors || res.error)
					this.setState({ redirect: <Redirect to='/user-not-found'/> })
			})
		}
	}

	newMessageCount = ()=> this.props.user.messages.filter( msg => !msg.seen ).length

	renderProfileButtons = ()=> {
		return this.state.isCurrentUser ?
			<Fragment>
	  		<Link to='/messages/inbox' ><button className="btn-grey" variant="secondary">Message Center &nbsp; {this.newMessageCount()} <FaEnvelope/></button></Link>
	  	</Fragment>
  		:
			<Fragment>
	  		<Link to={ '/messages/compose?recipient='+this.state.user.username }><button className="btn-grey" variant="secondary">Message this User &nbsp; <FaEnvelope/></button></Link>
				{ this.renderFriendButton() }
	  	</Fragment>
	}

	renderFriendButton = ()=> {
		if (this.props.user.friendships.find(f => f.friend.id === this.state.user.id)) {
			return <button onClick={this.confirmRemoveFriend} className="btn-red" variant="secondary">Remove Friend &nbsp; <FaUserMinus/></button>
		}
		else {
			if (this.props.user.all_FR.find(fr => fr.id === this.state.user.id))
				return <button disabled style={{ backgroundColor: 'lightgrey', color: 'grey' }} variant="secondary">Friend Request Pending &nbsp; <FaUserCog/></button>
			else
				return <button onClick={this.confirmFriendRequest} className="btn-green" variant="secondary">Send Friend Request &nbsp; <FaUserPlus/></button>
		}
	}

	closeConfirmModal = ()=> this.setState({ showConfirmModal: false })
	
	confirmFriendRequest = ()=> this.setState({showConfirmModal: <ConfirmModal confirm={this.confirmFriendRequestAction} closeConfirmModal={this.closeConfirmModal} title={`Send a friend request to ${this.state.user.username}?`} />})
	confirmFriendRequestAction = ()=> {
		this.props.dispatch(postFriendRequest(this.state.user.id))
		this.closeConfirmModal()
	}

	confirmRemoveFriend  = ()=> this.setState({showConfirmModal: <ConfirmModal confirm={this.confirmRemoveFriendAction} closeConfirmModal={this.closeConfirmModal} title={`Are you sure you want to remove ${this.state.user.username} from your friends list?`} />})
	confirmRemoveFriendAction = ()=> {
		this.props.dispatch(destroyFriendship(this.props.user.friendships.find(f => f.friend.id === this.state.user.id).id))
		this.closeConfirmModal()
	}

	render() {
		if (!this.state.user.id)
			return null

		return (
			<div id="Profile" className='page'>
				{ this.state.redirect }
				{ this.state.showConfirmModal }
				<h1>{this.state.user.username}'s profile</h1>
				<div className='flex'>
			  	<div id="user-card">
			  		<div className="avatar-container">
				  		{ this.state.isCurrentUser ? <Link to="/profile/edit"><FaCogs className="edit-profile-btn"/></Link> : null }
				  		<img src={ getImgSrc(this.state.user.avatar_url) } alt="avatar" />
				  	</div>
				  	{ this.renderProfileButtons() }
			  	</div>

				  	<div className="events-container">
				  		{ 
				  			this.state.user.events.length > 0 ? 

				  			this.state.user.events.map( event => <EventCard event={event} key={event.id} /> )
				  			:
				  			<div className='empty-message'>[ {this.state.user.first_name} is currently not involved in any gatherings ]</div>
				  		}
						</div>
					</div>
			</div>
		)
	}
}

let mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps)(Profile)
