import { rails_api } from '../constants'

//__________________________________________________

export function onPageLoad() {
	return test => {

		if(localStorage.token) {
			fetch(rails_api+'/init-state', {
				headers: { Authorization: localStorage.token }
			})
			.then(res => res.json())
			.then(res => {
				if (res.user) {
	  			test({ type: 'SET_USER', user: res.user })
	  			test({ type: 'ERRORS' })
				}

				else if (res.errors)
					test({ type: 'ERRORS', errType: 'pageload', errors: res.errors })
			})
		}
		else
			test({ type: 'NO_ACTION' })
	}
}

//__________________________________________________

export function handleLogin(event) {
	event.preventDefault()
	let form = event.target
	let credentials = {
	  username: form.username.value,
	  password: form.password.value
	}

	return dispatch => {

	  fetch(rails_api+'/login', {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
	    body: JSON.stringify({ session: credentials })
	  })
	  .then(res => res.json())
	  .then(res => {
	  	if (res.token) {
	  		dispatch({ type: 'SET_USER', user: res.user })
	  		dispatch({ type: 'LOG_IN', token: res.token })
				dispatch({ type: 'ERRORS', errType: 'pageload', errors: res.errors })
	  	}
	  	else if (res.errors) {
	  		form.password.value = ''
	  		dispatch({type: 'ERRORS', errType: 'login', errors: res.errors})
	  	}
	  })
	}
}

//__________________________________________________

export function handleSignUp(event) {
	event.preventDefault()
	let form = event.target
	let newUser = {
		first_name: form.first_name.value,
		last_name: form.last_name.value,
		username: form.username.value,
		password: form.password.value,
		confirm_password: form.confirm.value
	}

	return dispatch => {
		
		fetch(rails_api+'/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ user: newUser })
		})
		.then(res => res.json())
		.then(res => {

			if (res.errors) {
				form.password.value = ''
				form.confirm.value = ''
				dispatch({ type: 'ERRORS', errType: 'signup', errors: res.errors })
			}
			else if (res.token) {
  			localStorage.setItem('token', res.token)
	  		dispatch({ type: 'SET_USER', user: res.user })
	  		dispatch({ type: 'LOG_IN', token: res.token })
			}
		})
	}
}
