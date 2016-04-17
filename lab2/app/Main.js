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
            position: 0,
            startTime: 0
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

        if (this.state.playlist.length == files.length) { // first time add files
            this.select(0)
        }
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

                this.setState({source: source, position: 0})

                source.buffer = buffer
                this.play()
            })
        }
        this.state.source && this.state.source.stop()
    }

    play() {
        if (!this.state.source) return alert("请先将音乐文件拖动到页面中以添加到播放列表")
        this.setState({playing: true})
        this.setState({startTime: ac.currentTime})
        this.state.source.start(0, this.state.position)
    }

    next() {
        const n = this.state.playlist.length
        this.select((this.state.current + 1) % n)
    }

    prev() {
        const n = this.state.playlist.length
        this.select((this.state.current || n) - 1)
    }

    pause() {
        this.state.source.stop()
        this.setState({playing: false, position: ac.currentTime - this.state.startTime})
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
