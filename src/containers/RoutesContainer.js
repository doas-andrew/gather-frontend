import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Home from '../views/Home'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import Profile from '../views/Profile'
import EditProfile from '../views/EditProfile'
import ErrorCode from '../views/ErrorCode'
import MessageCenter from '../views/MessageCenter'
import EventSearch from '../views/EventSearch'
import EventForm from '../views/EventForm'
import EventPage from '../views/EventPage'
// {/**/}


class RoutesContainer extends React.Component {

	renderProfile = newProps => {
		if (this.props.loggedIn)
			return <Profile profile_id={ newProps.match.params.id }/>
		else
			return <Redirect to='/login'/>
	}

	render() {
		let { loggedIn } = this.props

		return (
			<div id="RoutesContainer">
				<Switch>
					<Route exact path='/' component={Home} />
					
					<Route path='/login'   render={()=> this.props.loggedIn ? <Redirect to='/profile' /> : <Login /> } />
					<Route path='/sign-up' render={()=> this.props.loggedIn ? <Redirect to='/profile' /> : <SignUp/> } />

					<Route path='/profile/edit' render={()=> this.props.loggedIn ? <EditProfile/> : <Redirect to='/login' /> } />
					<Route path='/profile/:id' render={this.renderProfile} />
					<Route path='/profile' render={()=> <Redirect to={'/profile/'+this.props.user_id}/> }/>

					<Route exact path='/messages/inbox'   render={()=> this.props.loggedIn ? <MessageCenter view='inbox'  /> : <Redirect to='/login'/> } />
					<Route exact path='/messages/sent'    render={()=> this.props.loggedIn ? <MessageCenter view='sent'   /> : <Redirect to='/login'/> } />
					<Route exact path='/messages/compose' render={()=> this.props.loggedIn ? <MessageCenter view='compose'/> : <Redirect to='/login'/> } />
					<Route exact path='/messages/friend-requests'render={()=> this.props.loggedIn ? <MessageCenter view='FRs'/> : <Redirect to='/login'/> } />

					<Route exact path='/events' component={EventSearch} />
					<Route exact path='/events/new' render={()=> loggedIn ? <EventForm/> : <Redirect to='/login'/> } />
					<Route path='/events/:id' component={EventPage} />

		      <Route render={()=> <ErrorCode code='404 - Not Found'/> } />
				</Switch>
			</div>
		)
	}
}

let mapStateToProps = state => ({ loggedIn: state.session.loggedIn, user_id: state.user.id })
export default connect(mapStateToProps)(RoutesContainer)
