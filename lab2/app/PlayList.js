import React from 'react'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'

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
            <List subheader="播放列表">
                <ListItem style={styles.listitem} primaryText="fuck" />
            </List>
        )
    }
}

export default PlayList
