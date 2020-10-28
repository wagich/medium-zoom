export const isSupported = node => node.tagName === 'IMG'

/* eslint-disable-next-line no-prototype-builtins */
export const isNodeList = selector => NodeList.prototype.isPrototypeOf(selector)

export const isNode = selector => selector && selector.nodeType === 1

export const isSvg = image => {
  const source = image.currentSrc || image.src
  return source.substr(-4).toLowerCase() === '.svg'
}

export const getImagesFromSelector = selector => {
  try {
    if (Array.isArray(selector)) {
      return selector.filter(isSupported)
    }

    if (isNodeList(selector)) {
      // Do not use spread operator or Array.from() for IE support
      return [].slice.call(selector).filter(isSupported)
    }

    if (isNode(selector)) {
      return [selector].filter(isSupported)
    }

    if (typeof selector === 'string') {
      // Do not use spread operator or Array.from() for IE support
      return [].slice
        .call(document.querySelectorAll(selector))
        .filter(isSupported)
    }

    return []
  } catch (err) {
    throw new TypeError(
      'The provided selector is invalid.\n' +
        'Expects a CSS selector, a Node element, a NodeList or an array.\n' +
        'See: https://github.com/francoischalifour/medium-zoom'
    )
  }
}

export const createOverlay = background => {
  const overlay = document.createElement('div')
  overlay.classList.add('medium-zoom-overlay')
  overlay.style.background = background

  return overlay
}

export const createLoadingIndicator = color => {
  const wrapper = document.createElement('div')
  wrapper.classList.add('medium-zoom-loader')

  const colorRgb = parseColor(color)
  const ringColor = `rgba(${colorRgb[0]},${colorRgb[1]},${colorRgb[2]},0.2)`

  const indicator = document.createElement('div')
  indicator.style.borderTopColor = ringColor
  indicator.style.borderRightColor = ringColor
  indicator.style.borderBottomColor = ringColor
  indicator.style.borderLeftColor = color

  wrapper.appendChild(indicator)
  return wrapper
}

// color parsing function from https://stackoverflow.com/a/21966100
const parseColor = colorString => {
  if (colorString.substr(0, 1) == '#') {
    var collen = (colorString.length - 1) / 3
    var fact = [17, 1, 0.062272][collen - 1]
    return [
      Math.round(parseInt(colorString.substr(1, collen), 16) * fact),
      Math.round(parseInt(colorString.substr(1 + collen, collen), 16) * fact),
      Math.round(
        parseInt(colorString.substr(1 + 2 * collen, collen), 16) * fact
      ),
    ]
  } else
    return colorString
      .split('(')[1]
      .split(')')[0]
      .split(',')
      .map(x => +x)
}

export const cloneTarget = template => {
  const { top, left, width, height } = template.getBoundingClientRect()
  const clone = template.cloneNode()
  const scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  const scrollLeft =
    window.pageXOffset ||
    document.documentElement.scrollLeft ||
    document.body.scrollLeft ||
    0

  clone.removeAttribute('id')
  clone.style.position = 'absolute'
  clone.style.top = `${top + scrollTop}px`
  clone.style.left = `${left + scrollLeft}px`
  clone.style.width = `${width}px`
  clone.style.height = `${height}px`
  clone.style.transform = ''

  return clone
}

export const createCustomEvent = (type, params) => {
  const eventParams = {
    bubbles: false,
    cancelable: false,
    detail: undefined,
    ...params,
  }

  if (typeof window.CustomEvent === 'function') {
    return new CustomEvent(type, eventParams)
  }

  const customEvent = document.createEvent('CustomEvent')
  customEvent.initCustomEvent(
    type,
    eventParams.bubbles,
    eventParams.cancelable,
    eventParams.detail
  )

  return customEvent
}
