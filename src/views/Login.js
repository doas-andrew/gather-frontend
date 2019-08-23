import React from 'react'
import { connect } from 'react-redux'
import { handleLogin } from '../actions/session_actions'
import '../stylesheets/Login.scss'


const showErrors = (errors = []) => errors.map((message, index) => <p className="error" key={index}>{message}</p>)

function Login (props) {
	return (
		<div id="Login">
			<div className="card">
				<img src={require('../images/banner.png')} alt="banner" />
				{ showErrors(props.errors) }

				<form onSubmit={ e => props.dispatch( handleLogin(e) ) }>
					<input required type="text" name="username" placeholder="Username" />
					<br/>
					<input required type="password" name="password" placeholder="Password" />
					<br/>
					<button className="btn-blue" type="submit">Enter</button>
				</form>
			</div>
		</div>
	)
}

let mapStateToProps = state => ({ errors: state.session.errors.login })
export default connect(mapStateToProps)(Login)
