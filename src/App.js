import React from 'react'
import { onPageLoad } from './actions/session_actions'
import { connect } from 'react-redux'

import Navbar from './components/Navbar'
import RoutesContainer from './containers/RoutesContainer'
import Footer from './components/Footer'
import ErrorCode from './views/ErrorCode'

import './stylesheets/App.css'
import './stylesheets/button.scss'



class App extends React.Component {

	componentDidMount() { this.props.dispatch(onPageLoad()) }

	renderView = ()=> {
		if (this.props.errors)
			return <ErrorCode code='401 - Unauthorized' messages={['Bad token detected.', `Please click "logout" or clear your browser cache.`]}/>
		
		else if (localStorage.token && !this.props.user_id)
			return null
		
		else
			return <RoutesContainer/>
	}

	render() {
	  return (
	  	<div id="App">
	  		<Navbar/>
	  		<div id='View'>
	  			{ this.renderView() }
	  			<div className='remaining-space'></div>
	  		</div>
	  		<Footer/>
	  	</div>
	  )
	}
}

let mapStateToProps = state => ({ errors: state.session.errors.pageload, user_id: state.user.id })
export default connect(mapStateToProps)(App)
