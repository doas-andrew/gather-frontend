import React from 'react'
import { Link } from 'react-router-dom'
import { getImgSrc } from '../actions/user_actions'
import { avatars } from '../images/avatar_samples/seed_data_avatars.js'
import '../stylesheets/UserCard.scss'

export default function UserCard (props) {
	let {user} = props
	// console.log(avatarPaths[user.avatar_url])
	return (
		<div className='UserCard'>
			<img src={getImgSrc(user.avatar_url)} />
			<Link to={'/profile/'+user.id}>
				<h1 className='title'>{user.username}</h1>
			</Link>
		</div>
	)
}
