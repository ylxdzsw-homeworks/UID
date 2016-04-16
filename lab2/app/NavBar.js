import React from 'react'
import AppBar from 'material-ui/lib/app-bar'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import MenuItem from 'material-ui/lib/menus/menu-item'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'

class NavBar extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            open: false
        }
    }

    render() {
        const changeSkinMenu = <IconMenu
            iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
            <MenuItem primaryText="蓝白配色" />
            <MenuItem primaryText="绿黑配色" />
            <MenuItem primaryText="红黑配色" />
        </IconMenu>

        return (
            <div>
                <AppBar
                    title="WebOscillator Player"
                    iconElementRight={changeSkinMenu}
                    onLeftIconButtonTouchTap={()=>this.setState({open: true})}
                />
                <Dialog
                    title="关于我们"
                    actions={[<FlatButton label="确定" primary={true} keyboardFocused={true}
                                          onTouchTap={()=>this.setState({open: false})}/>]}
                    open={this.state.open}
                    onRequestClose={()=>this.setState({open: false})}
                >
                    <h3>WebOscillator 音乐播放器</h3>
                    <li>张实唯 1133730117</li>
                    <li>栾云腾 1133730106</li>
                </Dialog>
            </div>
        )
    }
}

export default NavBar
