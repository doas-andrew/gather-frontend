import React from 'react'
import { google_api } from '../api_keys.js'

export default function GoogleMap (props) {
	return (
		<div id='GoogleMap'>
			<iframe
				style={{width: props.width, height: props.height}}
				title='Google Maps'
				src={`https://www.google.com/maps/embed/v1/place?q=${props.location}&key=${google_api}`}
			></iframe>
		</div>
	)
}
