import {TYPE_SILLY_CASE} from './constants.js'

export default function CaseyFacey({children, type, _sillyIndex}) {
  switch (type) {
    case TYPE_SILLY_CASE:
      return sillyCase(children, {index: _sillyIndex ?? 0})
    default:
      return children
  }
}
