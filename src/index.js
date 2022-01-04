import Color from './color.js'

(()=> {
  const color = new Color()
  color.bind() 

  if (typeof globalThis.addEventListener !== 'function') {
    globalThis.addEventListener('unload', 
      (event)=> { color.unbind() }, 
      {
        once: true
      })
  }
})()
// vi: se ts=2 sw=2 et:
