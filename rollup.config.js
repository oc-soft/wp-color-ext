


const config = [
  {
    input: 'src/index.js', 
    output: {
      file: 'dist/wp-color-ext.js',
      format: 'umd'
    }
  },
  {
    input: 'src/color.js', 
    output: {
      file: 'dist/color-ext.es.js',
      format: 'es'
    }
  }
]


export { config as default }
// vi: se ts=2 sw=2 et:
