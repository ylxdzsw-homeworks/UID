import React from 'react'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import {stopEvent} from './utils.js'
import NavBar from './NavBar.js'
import Player from './Player.js'
import PlayList from './PlayList.js'
import Visualizer from './Visualizer.js'
import {brightBlueTheme, darkRedTheme, darkGreenTheme} from './Themes.js'

const styles = {
    container: {
        paddingTop: 10,
        maxWidth: 600,
        minWidth: 400,
        margin: 'auto',
        position: 'relative'
    }
}

class Main extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.analyser = ac.createAnalyser()

        this.state = {
            playlist: [],
            source: null,
            loading: 0,
            current: 0,
            playing: false,
            position: 0,
            startTime: 0,
            muiTheme: brightBlueTheme
        }

        this.dropHandler = this.dropHandler.bind(this)
        this.play        = this.play.bind(this)
        this.next        = this.next.bind(this)
        this.prev        = this.prev.bind(this)
        this.pause       = this.pause.bind(this)
        this.select      = this.select.bind(this)
        this.changeTheme = this.changeTheme.bind(this)
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme(this.state.muiTheme)
        }
    }

    componentDidMount() {
        document.body.addEventListener('dragenter', stopEvent, true)
        document.body.addEventListener('dragover', stopEvent, true)
        document.body.addEventListener('drop', this.dropHandler, true)
    }

    changeTheme(x) {
        switch (x) {
            case 'brightBlue':
                this.setState({muiTheme: brightBlueTheme})
                document.body.style.backgroundColor = "white"
                break
            case 'darkRed':
                this.setState({muiTheme: darkRedTheme})
                document.body.style.backgroundColor = "rgb(48,48,48)"
                break
            case 'darkGreen':
                this.setState({muiTheme: darkGreenTheme})
                document.body.style.backgroundColor = "rgb(48,48,48)"
                break
        }
    }

    dropHandler(e) {
        stopEvent(e)
        if(!e.dataTransfer.files) return

        const files = e.dataTransfer.files;

        [].forEach.call(files, (file) => {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            this.setState({loading: this.state.loading + 1})
            reader.onload = () => {
                ac.decodeAudioData(reader.result, buffer => {
                    this.state.playlist.push({file: file, buffer: buffer})
                    this.setState({playlist: this.state.playlist, loading: this.state.loading - 1})
                })
            }
        })
    }

    select(n) {
        this.setState({position: 0, current: n})

        setTimeout(this.play, 0)
    }

    play() {
        if (!this.state.playlist.length) return alert("请先将音乐文件拖动到页面中以添加到播放列表")

        this.state.source && this.state.source.stop()

        const source = ac.createBufferSource()
        source.buffer = this.state.playlist[this.state.current].buffer

        source.connect(ac.destination)
        source.connect(this.analyser)

        source.start(0, this.state.position)
        this.setState({source: source, playing: true, startTime: ac.currentTime})
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
        this.setState({playing: false, position: this.state.position + ac.currentTime - this.state.startTime})
    }

    render() {
        return (
            <div style={styles.container}>
                <RefreshIndicator size={50} left={275} top={100} status={this.state.loading>0?'loading':'hide'}/>
                <NavBar onSelect={this.changeTheme}/>
                <Visualizer analyser={this.analyser}/>
                <Player play={this.play} next={this.next} prev={this.prev}
                        pause={this.pause} playing={this.state.playing} />
                <PlayList playlist={this.state.playlist} onSelect={this.select}
                          current={this.state.current} />
            </div>
        )
    }
}

Main.childContextTypes = {
    muiTheme: React.PropTypes.object
}

export default Main
