import React from 'react'
import {stopEvent} from './utils.js'
import NavBar from './NavBar.js'
import Player from './Player.js'
import PlayList from './PlayList.js'
import Visualizer from './Visualizer.js'

const styles = {
    container: {
        paddingTop: 10,
        maxWidth: 600,
        minWidth: 400,
        margin: 'auto'
    }
}

class Main extends React.Component {
    constructor(props, context) {
        super(props, context)

        const acsource = ac.createBufferSource()
        const acanalyser = ac.createAnalyser()

        acsource.connect(ac.destination)
        acsource.connect(acanalyser)

        this.state = {
            playlist: [],
            source: acsource,
            analyser: acanalyser
        }

        this.dropHandler = this.dropHandler.bind(this)
        this.play        = this.play.bind(this)
        this.select      = this.select.bind(this)
    }

    componentDidMount() {
        document.body.addEventListener('dragenter', stopEvent, true)
        document.body.addEventListener('dragover', stopEvent, true)
        document.body.addEventListener('drop', this.dropHandler, true)
    }

    dropHandler(e) {
        stopEvent(e)
        if(!e.dataTransfer.files) return

        const files = e.dataTransfer.files
        const reader = new FileReader()

        this.setState({playlist: this.state.playlist.concat([].slice.call(files))})
    }

    select(n) {
        const file = this.state.playlist[n]
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = () => {
            ac.decodeAudioData(reader.result, buffer => {
                this.state.source.buffer = buffer
                this.play()
            })
        }
    }

    play() {
        this.state.source.start(0)
    }

    render() {
        return (
            <div style={styles.container}>
                <NavBar />
                <Visualizer analyser={this.state.analyser}/>
                <Player />
                <PlayList playlist={this.state.playlist} onSelect={this.select} />
            </div>
        )
    }
}

export default Main
