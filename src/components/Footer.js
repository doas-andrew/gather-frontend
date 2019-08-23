import React from 'react'
import { DiRor, DiReact } from 'react-icons/di'

import '../stylesheets/Footer.css'

export default function Footer() {
	return (
		<div id='Footer'>
			<div className='left'>Powered by <DiRor/> + <DiReact/></div>
			<div className='right'>A S A</div>
		</div>
	)
}
