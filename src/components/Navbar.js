import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FaUser, FaUsers, FaUserFriends, FaEdit } from 'react-icons/fa'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { IoMdSearch } from 'react-icons/io'
import logo from '../images/banner.png'
import '../stylesheets/Navbar.scss'


function Navbar(props) {
	return (
		<div id="Navbar">

			<div className='left'>
				<Link to='/'><img className='logo' src={logo} alt="name_here logo"/></Link>
			</div>

			<div className='center'>
				{
					props.loggedIn ?
					<Fragment>
						<Link to='/profile' className="item"><FaUser/>&nbsp; Profile</Link>
						<Link to='/events/new' className="item"><FaEdit/>&nbsp; Plan a Gathering!</Link>
					</Fragment>
					:
					<Link to='/events' className="item">Search Gatherings &nbsp;<IoMdSearch/></Link>
				}
			</div>

			<div className='right'>
				{
					props.loggedIn ?
					<Fragment>
						<Link to='/events' className="item">Search Gatherings &nbsp;<IoMdSearch/></Link>
						<Link to='/'
							className="item"
							onClick={()=>{ props.dispatch({type: 'LOG_OUT'}); props.dispatch({type: 'SET_USER'}) }}
						>Logout &nbsp;<FiLogOut/></Link>
					</Fragment>
					:
					<Fragment>
						<Link to='/login' className="item"><FiLogIn/>&nbsp; Login</Link>
						<Link to='/sign-up' className="item"><FaUsers/>&nbsp; Join Us!</Link>
					</Fragment>
				}
			</div>
		</div>
	)
}

let mapStateToProps = state => ({ loggedIn: state.session.loggedIn, user_id: state.user.id })
export default connect(mapStateToProps)(Navbar)
