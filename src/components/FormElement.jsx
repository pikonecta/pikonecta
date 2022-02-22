import React from 'react'
import PropTypes from 'prop-types'

function FormElement({ content, children }) {
  return (
    <div className="rounded border border-gray-400 p-3 ">
      <h1 htmlFor="product name" className="block text-lg font-bold text-gray-600">
        {content}
      </h1>
      {children}
    </div>
  )
}

FormElement.propTypes = {
  content: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}

export default FormElement
