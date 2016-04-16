import React from 'react'
import IconButton from 'material-ui/lib/icon-button'
import SkipNextIcon from 'material-ui/lib/svg-icons/av/skip-next'
import PlayArrowIcon from 'material-ui/lib/svg-icons/av/play-arrow'
import PauseIcon from 'material-ui/lib/svg-icons/av/pause'
import SkipPreviousIcon from 'material-ui/lib/svg-icons/av/skip-previous'

const styles = {
    wrapper: {
        display: 'inline-block',
        width: '33%',
        textAlign: 'center'
    },
    button: {
        height: 96,
        width: 96
    },
    icon: {
        height: 64,
        width: 64
    }
}

const button = (Icon) => (
    <IconButton style={styles.button}>
        <Icon style={styles.icon} />
        {' '}
    </IconButton>
)

class Player extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {}
    }

    render() {
        return (
            <div>
                <span style={styles.wrapper}> {button(SkipPreviousIcon)} </span>
                <span style={styles.wrapper}> {button(PlayArrowIcon)} </span>
                <span style={styles.wrapper}> {button(SkipNextIcon)} </span>
            </div>
        )
    }
}

export default Player
