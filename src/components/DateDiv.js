import React from 'react'
import '../stylesheets/DateDiv.scss'

// const monthNames = [
// 	"January", "February", "March", "April", "May", "June",
// 	"July", "August", "September", "October", "November", "December"
// ]

const shortMonthNames = [
	'Jan', 'Feb', 'March', 'April', 'May', 'June',
	'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

export default function DateDiv (props) {
	return (
		<div className={`DateDiv ${props.size}`} style={{ backgroundColor: props.color }}>
			<div className='day'>{ props.date.getDate() }</div>
			<div className='month'>{ shortMonthNames[props.date.getMonth()] }</div>
		</div>
	)
}
