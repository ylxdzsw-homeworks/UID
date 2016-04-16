import React from 'react'
import {stopEvent} from './utils.js'
import NavBar from './NavBar.js'
import Player from './Player.js'
import PlayList from './PlayList.js'

const styles = {
    container: {
        maxWidth: 600,
        minWidth: 400,
        margin: 'auto'
    }
}

class Main extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            playlist: []
        }

        this.dropHandler = this.dropHandler.bind(this)
        this.play        = this.play.bind(this)
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

    play(n) {
        const file = this.state.playlist[n]
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = () => {
            ac.decodeAudioData(reader.result, buffer => {
                const playSound = ac.createBufferSource()
                playSound.buffer = buffer
                playSound.connect(ac.destination)
                playSound.start(0)
            })
        }
    }

    render() {
        return (
            <div style={styles.container}>
                <NavBar />
                <Player />
                <PlayList playlist={this.state.playlist} onSelect={this.play} />
            </div>
        )
    }
}

export default Main
