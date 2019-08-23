import React from 'react'

function FriendsContainer() {
	return (
		<div id='FriendsContainer'>
			
		</div>
	)
}

let mapStateToProps = state => ({ friends: state.session.user.friends })
export default connect(mapStateToProps)(FriendsContainer)