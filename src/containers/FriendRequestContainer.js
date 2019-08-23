import React from 'react'
import { connect } from 'react-redux'
import FriendRequestCard from '../components/FriendRequestCard'
import '../stylesheets/FriendRequestContainer.scss'

class FriendRequestContainer extends React.Component {

	showFRs = ()=> this.props.user.inc_FR.map( friend =>
		<FriendRequestCard key={friend.id} friend={friend} />
	)

	render() {
		return (
			<div id='FriendRequestContainer'>
				{
					this.props.user.inc_FR.length ?
					this.showFRs() : <div className='empty-tab'>[ Empty ]</div>
				}
			</div>
		)
	}
}

let mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps)(FriendRequestContainer)