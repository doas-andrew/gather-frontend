const rails_api = 'http://localhost:3000'

//__________________________________________________

export function createMessage (event) {
	event.preventDefault()
	let form = event.target

	return dispatch => {
		fetch(rails_api+'/messages', {
			method: 'POST',
			headers: { Authorization: localStorage.token, Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({
				message: {
					recipient_username: form.recipient_username.value,
					subject: form.subject.value,
					content: form.content.value
				}
			})
		})
		.then(res => res.json())
		.then(res => {

			if (res.errors)
				dispatch({ type: 'ERRORS', errType: 'message', errors: res.errors })
			
			else if (res.message)
				dispatch({ type: 'MESSAGE_SENT', message: res.message })
		})
		form.reset()
	}
}

export function updateSeenMessage (message_id) {
	return dispatch => {
		// console.log('updateSeenMessage INVOKED')
		
		fetch(`${rails_api}/messages/${message_id}/seen`,{
			method: 'PATCH',
			headers: { Authorization: localStorage.token }
		})
		.then(res => res.json())
		.then(res => {
			console.log(res)

			if (res.message)
				dispatch({ type: 'MESSAGE_SEEN', message_id })

			else if (res.errors)
				dispatch({ type: 'ERRORS', errType: 'message', errors: res.errors })
		})
	}
}

export function deleteMessages (messages) {
	return dispatch => {

		if (messages) {
			fetch(rails_api+'/messages/mass-deletion',{
				method: 'DELETE',
				headers: { Authorization: localStorage.token, Accept: 'application/json', 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages })
			})
			.then(res => res.json())
			.then(res => {
				console.log(res)
				if (res.user)
					dispatch({ type: 'SET_USER', user: res.user })

				else if (res.errors)
					dispatch({ type: 'ERRORS', errType: 'pageload', errors: res.errors })
			})
		}
	}
}
