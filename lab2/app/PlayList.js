import React from 'react'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Subheader from 'material-ui/lib/Subheader'

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
                <Subheader>播放列表</Subheader>
                {this.props.playlist.map((x,i) =>
                    <ListItem style={styles.listitem} key={i} primaryText={x.name}
                              onClick={()=>this.props.onSelect(i)} />)}
            </List>
        )
    }
}

export default PlayList
