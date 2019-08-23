import { avatars } from '../images/avatar_samples/seed_data_avatars.js'
const rails_api = 'http://localhost:3000'

//__________________________________________________

export function getImgSrc (key) {
	if ( avatars[key] )
		return avatars[key]
	else
		return avatars.default
}

//__________________________________________________

export function postFriendRequest (recipient_id) {
	return dispatch => {

		fetch(rails_api+'/friend_requests', {
			method: 'POST',
			headers: {
				Authorization: localStorage.token,
				'Content-type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ friend_request: {recipient_id} })
		})
		.then(res => res.json())
		.then(res => {

			if(res.user)
				dispatch({ type: 'SET_USER', user: res.user })
			else if (res.errors)
				dispatch({ type: 'ERRORS', errType: 'friendship', errors: res.errors })
		})
	}
}

export function acceptFriendRequest (fr_id, friend_id) {
	return dispatch => {

		fetch(rails_api+'/friendships', {
			method: 'POST',
			headers: {
				Authorization: localStorage.token,
				'Content-type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ friend_request_id: fr_id, friend_id: friend_id })
		})
		.then(res => res.json())
		.then(res => {

			if(res.user)
				dispatch({ type: 'SET_USER', user: res.user })
			else if (res.errors)
				dispatch({ type: 'ERRORS', errType: 'friendship', errors: res.errors })
		})
	}
}

export function destroyFriendRequest (fr_id) {
	return dispatch => {

		fetch(`${rails_api}/friend_requests/${fr_id}`,{
			method: 'DELETE',
			headers: { Authorization: localStorage.token}
		})
		.then(res => res.json())
		.then(res => {

			if(res.user)
				dispatch({ type: 'SET_USER', user: res.user })
			else if (res.errors)
				dispatch({ type: 'ERRORS', errType: 'friendship', errors: res.errors })
		})
	}
}

export function destroyFriendship (friendship_id) {
	return dispatch => {

		fetch(`${rails_api}/friendships/${friendship_id}`, {
			method: 'DELETE',
			headers: { Authorization: localStorage.token }
		})
		.then(res => res.json())
		.then(res => {

			if(res.user)
				dispatch({ type: 'SET_USER', user: res.user })
			else if (res.errors)
				dispatch({ type: 'ERRORS', errType: 'friendship', errors: res.errors })
		})
	}
}

//__________________________________________________

export function joinEvent (event_id) {
	return dispatch => {
		//
	}
}
