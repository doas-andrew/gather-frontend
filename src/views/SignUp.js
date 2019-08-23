import React from 'react'
import { connect } from 'react-redux'
import { handleSignUp } from '../actions/session_actions'
import '../stylesheets/SignUp.scss'


class SignUp extends React.Component {

	// state = {}

	showErrors = () => this.props.errors && this.props.errors.map((message, index) => <li className="error" key={index}>{message}</li>)
	checkErrors = field => this.props.errors && this.props.errors.find( error => error.startsWith(field)) ? {borderColor: 'rgb(215, 50, 40)'} : null

	render() {
		return (
			<div id="SignUp">
				<div className="card">
					<div className="form-container">
						<img src={require('../images/banner.png')} alt="banner" />

						<form onSubmit={ e => this.props.dispatch( handleSignUp(e) ) }>
							<input required type="text" name="first_name" style={ this.checkErrors('First') } placeholder="First name" />
							<input required type="text" name="last_name" style={ this.checkErrors('Last') } placeholder="Last name" />

							<br/><br/>

							<input required id="username" type="text" name="username" style={ this.checkErrors('User') } placeholder="Username" />
							<p>You can use letters, numbers, and underscores.</p>

							<br/><br/>
						
							<input required type="password" name="password" style={ this.checkErrors('Pass') } placeholder="Enter Password" />
							<input required type="password" name="confirm" style={ this.checkErrors('Pass') } placeholder="Confirm Password" />
							<p>Use 3 or more characters with a mix of letters, numbers, and symbols.</p>

							<button className="btn-blue" type="submit">Sign Up</button>
						</form>
					</div>

					<div className="side-image"></div>
				</div>
				{
					this.props.errors &&

					<div className="error-container">
						Please change the following to complete sign-up:
						<ul>
							{ this.showErrors() }
						</ul>
					</div>
				}
			</div>
		)
	}
}

let mapStateToProps = state => ({ errors: state.session.errors.signup })
export default connect(mapStateToProps)(SignUp)
