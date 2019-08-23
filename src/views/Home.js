import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AwesomeSlider from 'react-awesome-slider'
import EventsContainer from '../containers/EventsContainer'
import 'react-awesome-slider/dist/styles.css'
import '../stylesheets/Home.scss'


class Home extends React.Component {

	render() {
		return (
			<div id="Home" className='page'>
				<div className='welcome'>
					<div className='text'>
						<p className='heading'>Gather</p>
						<p className='subtext'>Join a local group to meet people, try something new, or do more of what you love.</p>
					</div>
					{ !this.props.loggedIn && <Link to='/sign-up'><button className="btn-green">Sign Up</button></Link> }
				</div>

				<AwesomeSlider className="home-slider" organicArrows={false}>
					<div style={{backgroundImage: `url(${require('../images/home1.jpeg')})`}}></div>
					<div style={{backgroundImage: `url(${require('../images/home2.jpeg')})`}}></div>
					<div style={{backgroundImage: `url(${require('../images/home3.jpeg')})`}}></div>
				</AwesomeSlider>

				<h3 className='events-heading'>Recent Gatherings</h3>
				<EventsContainer />
			</div>
		)
	}
}

let mapStateToProps = state => ({ loggedIn: state.session.loggedIn })
export default connect(mapStateToProps)(Home)
