import React from 'react'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Subheader from 'material-ui/lib/Subheader'
import VolumeUpIcon from 'material-ui/lib/svg-icons/av/volume-up'

const styles = {
    listitem: {
        borderTop: 'solid 1px rgba(0,0,0,0.1)',
        fontSize: 18
    }
}

class PlayList extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {}
    }

    render() {
        return (
            <List>
                <Subheader>{this.props.playlist.length ? "播放列表" : "将文件拖拽至此处以添加到播放列表"}</Subheader>
                {this.props.playlist.map((x,i) =>
                    <ListItem style={styles.listitem} key={i} primaryText={x.file.name} onClick={()=>this.props.onSelect(i)}
                              rightIcon={i==this.props.current ? <VolumeUpIcon /> : null} />)}
            </List>
        )
    }
}

PlayList.contextTypes = {
    muiTheme: React.PropTypes.object,
}

export default PlayList
