

/**
 * color extension
 */
class Color {

  /**
   * extend color in global
   */
  extendColorToString() {
    const colorClass = globalThis.Color
    const superToString = colorClass.fn.toString 
    this.superToString = superToString

    colorClass.prototype.toString = function() {
      let result = undefined
      result = superToString.call(this)
      if (this.a() < 1) {
        let aaValue = Math.round(this.a() * 0xff)
        let aa = undefined
        if (aaValue < 0x10) {
          aa = `0${aaValue.toString(16)}` 
        } else {
          aa = aaValue.toString(16)
        }
        result = `${result}${aa}`
      }
      return result
    }
  }

  /**
   * restore toString in global color
   */
  restoreColorToString() {
    if (this.superToString) {
      const colorClass = globalThis.Color
      colorClass.prototype.toString = this.superToString
      delete this.superToString
    }
  }


  /**
   * extend color init procedure in global color
   */
  extendColorFromHex() {
    const colorClass = globalThis.Color
    const superFromHex = colorClass.prototype.fromHex
    this.superFromHex = superFromHex

    colorClass.prototype.fromHex = function(color) {
      const color0 = color.replace(/^#/, '').replace(/^0x/, '')
      let alpha = 1
      let alphaStr = undefined
      
      let colorParam = color
      if (color0.length == 4) {
        alphaStr = `${color0[3]}${color0[3]}`
        colorParam = color0.substring(0, 3)
      } else if (color0.length == 8) {
        alphaStr = color0.substring(6)
        colorParam = color0.substring(0, 6)
      }
      if (alphaStr !== void(0)) {
        alpha = parseInt(alphaStr, 16)
        this.error = isNaN(alpha)
        if (this.error) { 
          alpha = 1
        } else {
          alpha /= 255
          alpha = Math.min(1, Math.max(0, alpha))
        }
      }
      const result = superFromHex.call(this, colorParam)
      if (!this.error) {
        this.a(alpha)
      }
      return result
    }

  }

  /**
   * restore fromHex in global color
   */
  restoreColorFromHex() {
    if (this.superFromHex) {
      const colorClass = globalThis.Color
      colorClass.prototype.fromHex = this.superFromHex
      delete this.superFromHex
    }
  }

  /**
   * attach this object into some objects in environment
   */
  bind() {
    this.extendColorToString()
    this.extendColorFromHex()
  }
  /**
   * detach this object from some objects in environment
   */
  unbind() {
    this.restoreColorFromHex()
    this.restoreColorToString()
  }
}
export { Color as default }
// vi: se ts=2 sw=2 et:
