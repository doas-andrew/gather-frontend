import React from 'react'
import { FaWindowClose } from 'react-icons/fa'
import Modal from 'react-modal'
import '../stylesheets/InfoModal.css'


Modal.setAppElement('#root')

export default function InfoModal () {

		return (
			<Modal id='InfoModal' isOpen={true} contentLabel="Info Modal">
		    <h1 className='heading'>{this.props.info}</h1>
		    <button 'green-btn'>Ok!</button>
		  </Modal>
		)
	}
}
