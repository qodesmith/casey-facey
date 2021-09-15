import React from 'react'
import {TYPE_SILLY_CASE} from './constants.js'
import CaseyFacey from './index.js'

function casify(text, indexObj) {
  return text
    .split('')
    .map(letter => {
      return indexObj.index++ % 2 ? letter.toUpperCase() : letter.toLowerCase()
    })
    .join('')
}

function processChild(child, indexObj) {
  if (child == null || !child.props) return child
  if (typeof child === 'string') return casify(child, indexObj)
  if (Array.isArray(child)) return processChildren(child, indexObj)

  const {type: childType, props} = child
  const {children, ...restProps} = props

  if ({}.toString.call(child) === '[object Object]') {
    if (childType === CaseyFacey && props.type === TYPE_SILLY_CASE) {
      return React.createElement(
        CaseyFacey,
        {...restProps, _sillyIndex: indexObj.index},
        processChild(children, indexObj),
      )
    }
  }

  return React.cloneElement(child, restProps, processChild(children, indexObj))
}

function processChildren(children, indexObj) {
  if (children == null) return children
  if (typeof children === 'string') return casify(children, indexObj)
  if (Array.isArray(children)) {
    return React.Children.map(children, child => processChild(child, indexObj))
  }
  return processChild(children, indexObj)
}

export default function sillyCase(children, indexObj) {
  return children == null ? null : processChildren(children, indexObj)
}
