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

        this.analyser = ac.createAnalyser()

        this.state = {
            playlist: [],
            source: null,
            current: -1,
            playing: false,
            position: 0
        }

        this.dropHandler = this.dropHandler.bind(this)
        this.play        = this.play.bind(this)
        this.next        = this.next.bind(this)
        this.prev        = this.prev.bind(this)
        this.pause        = this.pause.bind(this)
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
                const source = ac.createBufferSource()

                source.connect(ac.destination)
                source.connect(this.analyser)

                this.setState({source: source})

                source.buffer = buffer
                this.play()
            })
        }
    }

    play() {
        if (!this.state.source) return
        this.setState({playing: true})
        this.state.source.start(this.state.position)
    }

    next() {
        console.log('next')
    }

    prev() {
        console.log('prev')
    }

    pause() {
        console.log('pause')
        this.setState({playing: false})
    }

    render() {
        return (
            <div style={styles.container}>
                <NavBar />
                <Visualizer analyser={this.analyser}/>
                <Player play={this.play} next={this.next} prev={this.prev}
                        pause={this.pause} playing={this.state.playing} />
                <PlayList playlist={this.state.playlist} onSelect={this.select} />
            </div>
        )
    }
}

export default Main
