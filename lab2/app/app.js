import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import jquery from 'jquery'
import tuna from 'tunajs'
import Main from './Main'

injectTapEventPlugin()

window.$ = jquery

ReactDOM.render(<Main />, document.getElementById('app'))


