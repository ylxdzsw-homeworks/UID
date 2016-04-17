import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import tuna from 'tunajs'
import Main from './Main'

injectTapEventPlugin()

window.ac = new (window.AudioContext || window.webkitAudioContext)()

ReactDOM.render(<Main />, document.getElementById('app'))
