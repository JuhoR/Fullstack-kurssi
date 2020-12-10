import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const buttonVisible = { display: visible ? 'none' : '' }
    const contentVisible = { display: visible ? '' : 'none' }
    const toggle = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return (
            toggle
        )
    })

    return (
        <div>
            <div style={buttonVisible}>
                <button id='view-button' onClick={toggle}>{props.buttonLabel}</button>
            </div>
            <div style={contentVisible}>
                {props.children}
                <button id='hide-button' onClick={toggle}>cancel</button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable
