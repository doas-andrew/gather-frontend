import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getImgSrc, acceptFriendRequest, destroyFriendRequest } from '../actions/user_actions'


function FriendRequestCard (props) {
	return (
		<div className='friend-request'>
			<img className='avatar' src={ getImgSrc(props.friend.avatar_url) } alt={props.friend.username} />
			<h2>
				{props.friend.full_name} <Link to={'/profile/'+props.friend.id}>(@{props.friend.username})</Link> has sent you a friend request!
			</h2>
			<div className='btn-div'>
				<button onClick={()=> props.dispatch( acceptFriendRequest(props.friend.fr_id, props.friend.id) )} className='btn-green'>Accept</button>
				<button onClick={()=> props.dispatch( destroyFriendRequest(props.friend.fr_id) )} className='btn-red'>Decline</button>
			</div>
		</div>
	)
}

// let mapStateToProps = state => ({ user_id: state.user.id })
export default connect()(FriendRequestCard)