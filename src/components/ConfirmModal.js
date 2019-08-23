import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import '../stylesheets/modal.css'

function ConfirmModal (props) {
	let extraMarginTop = null
	if (!props.content)
		extraMarginTop = { marginTop: '70px' }

	return (
		<div className='empty-space' onClick={props.closeConfirmModal}>
			<Modal className='modal' isOpen={true} contentLabel="Confirm Modal">
				<h2 className='title' style={ extraMarginTop }>{props.title}</h2>
				{ props.content && <div className='content'>{props.content}</div> }
				<div className='button-div'>
					<button onClick={props.confirm}  className='btn-green'>Confirm</button>
					<button onClick={props.closeConfirmModal} className='btn-red'>Cancel</button>
				</div>
			</Modal>
		</div>
	)
}

export default connect()(ConfirmModal)
