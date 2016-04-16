import React from 'react'
import {stop_event} from './utils.js'
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
    }

    dropHandler(e) {
        stop_event(e)
        if(!e.dataTransfer.files) return

        const file = e.dataTransfer.files[0]
        const reader = new FileReader()

    }

    render() {
        return (
            <div style={styles.container}>
                <NavBar />
                <Player />
                <PlayList />
            </div>
        )
    }
}

export default Main
