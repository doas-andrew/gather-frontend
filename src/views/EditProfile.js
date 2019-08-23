import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { FaChevronCircleLeft } from 'react-icons/fa'
import { rails_api } from '../constants'
import '../stylesheets/EditProfile.scss'


class EditProfile extends React.Component {

	state = {
		redirect: null,
		fileInputLabel: 'Upload a profile picture'
	}

	updateUser = event => {

		event.preventDefault()
		let form = event.target

		let update = { current_password: form.current_password.value }

		if (form.first_name.value)    update.first_name = form.first_name.value
		if (form.last_name.value)     update.last_name = form.last_name.value
		if (form.avatar_url.files[0]) update.avatar_url = URL.createObjectURL(form.avatar_url.files[0])

		if (form.password.value) {
			update.password = form.password.value
			update.confirm = form.confirm.value
		}

		fetch(`${rails_api}/users/${this.props.user_id}`, {
			method: 'PATCH',
			headers: {
				Authorization: localStorage.token,
				'Content-Type':'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ user: update })
		})
		.then(res => res.json())
		.then(res => {
			if(res.errors) {
				form.current_password.value = null
				this.props.dispatch({ type: 'ERRORS', errType: 'updateUser', errors: res.errors })
			}
			else {
				this.props.dispatch({ type: 'SET_USER', user: res.user })
				this.setState({ redirect: <Redirect to={'/profile/'+this.props.user_id} /> })
			}
		})
	}

	showErrors = ()=> {
		if (!this.props.errors)
			return null

		else
			return (
				<Fragment>
					<div className='error-container'>
						{ this.props.errors.map((error, index) => <p key={index} className="error">{error}</p>) }
					</div>
				</Fragment>
			)
	}

	changeFileInputLabel = e => {
		if(e.target.value)
			this.setState({ fileInputLabel: e.target.value })
		else
			this.setState({ fileInputLabel: 'Upload a profile picture' })
	}

	render() {
		return (
			<div id='EditProfile'>
				{ this.state.redirect }

				<div className='edit-profile-card'>
					<Link to='/profile'><FaChevronCircleLeft/></Link>
					<h2>Edit Profile</h2>

					<form onSubmit={this.updateUser}>
						<div className='grid'>
							<div>
								<input type="text" name="first_name" placeholder="Update first name" /><br/><br/>
								<input type="text" name="last_name" placeholder="Update last name"  /><br/><br/>
								
								<input
								 	hidden
								 	type="file"
								 	id='avatar-input'
								 	name="avatar_url"
									onChange={this.changeFileInputLabel}/>
								<label className='btn-grey' htmlFor='avatar-input'>{this.state.fileInputLabel}</label>
							</div>

							<div>
								<input type="password" name="password" placeholder='New password'    /><br/><br/>
								<input type="password" name="confirm"  placeholder='Confirm password'/><br/><br/>
							</div>
						</div>

						<div>
							<input required type="password" name="current_password" placeholder='Current password'/>
							<button type="submit" className='btn-blue'>Update</button>
						</div>

					</form>
					{ this.showErrors() }
				</div>
			</div>
		)
	}
}

let mapStateToProps = state => ({ user_id: state.user.id, errors: state.session.errors.updateUser })
export default connect(mapStateToProps)(EditProfile)
