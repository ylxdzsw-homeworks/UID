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

class Player extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {}
    }

    render() {
        const PlayPauseIcon = this.props.playing ? PauseIcon : PlayArrowIcon

        return (
            <div>
                <span style={styles.wrapper}>
                    <IconButton style={styles.button} onClick={this.props.prev}>
                        <SkipPreviousIcon style={styles.icon} />
                        {' '}
                    </IconButton>
                </span>
                <span style={styles.wrapper}>
                    <IconButton style={styles.button}
                                onClick={this.props.playing?this.props.pause:this.props.play}>
                        <PlayPauseIcon style={styles.icon} />
                        {' '}
                    </IconButton>
                </span>
                <span style={styles.wrapper}>
                    <IconButton style={styles.button} onClick={this.props.next}>
                        <SkipNextIcon style={styles.icon} />
                        {' '}
                    </IconButton>
                </span>
            </div>
        )
    }
}

export default Player
