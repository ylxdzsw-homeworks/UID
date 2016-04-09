import React from 'react'
import RaisedButton from 'material-ui/lib/raised-button'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import TextField from 'material-ui/lib/text-field'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'
import RadioButton from 'material-ui/lib/radio-button'
import SelectField from 'material-ui/lib/SelectField'
import MenuItem from 'material-ui/lib/menus/menu-item'
import AutoComplete from 'material-ui/lib/auto-complete'
import LinearProgress from 'material-ui/lib/linear-progress'
import Checkbox from 'material-ui/lib/checkbox'

import Field from './Field.js'

const styles = {
    clear: {
        width: '100%',
        clear: 'both'
    },
    accountInfo: {
        width: '80%',
        float: 'right'
    },
    container: {
        padding: '40px 0 40px 0',
        width: '95%',
        maxWidth: 512,
        margin: 'auto'
    },
    floatingLabelStyle: {
        color: 'rgba(0,0,0,0.6)'
    },
    radioButton: {
        width: 60,
        float: 'left',
        paddingLeft: 30,
        fontSize: 16
    },
    checkbox: {
        display: 'inline-block',
        width: '50%',
        fontSize: 16,
        marginTop: 10
    },
    progress: {
        position: 'fixed',
        top: 0,
        paddingTop: 10,
        width: '95%',
        maxWidth: 512,
        backgroundColor: 'white',
        zIndex: 10086
    }
}

const numtoitem = i => <MenuItem value={i} key={i} primaryText={i} />
const strtoitem = i => <Checkbox label={i} key={i} style={styles.checkbox} />
const years     = Array(47).fill().map((_,x)=>x+1970).map(numtoitem)
const months    = Array(12).fill().map((_,x)=>x+1).map(numtoitem)
const interests = ["IT互联网", "创业", "设计", "体育", "财经", "摄影", "其他"].map(strtoitem)

class Main extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.progress}>
                    <span>已完成7/14</span>
                    <LinearProgress mode="determinate" value={60} />
                </div>
                <h1>账号信息:</h1>
                <TextField
                    type="email"
                    style={styles.accountInfo}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelText="邮箱："
                    hintText="请输入email地址"
                />
                <TextField
                    type="text"
                    style={styles.accountInfo}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelText="昵称："
                    hintText="昵称由字母组成，长度小于12"
                />
                <TextField
                    type="password"
                    style={styles.accountInfo}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelText="密码："
                    hintText="密码长度为6-18"
                />
                <TextField
                    type="password"
                    style={styles.accountInfo}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelText="确认密码："
                    hintText="再次输入密码"
                />
                <div style={styles.clear} />
                <h1 style={{ marginTop: 60 }}>基本信息:</h1>
                <Field title="性别:">
                    <div style={{ height: 36, paddingTop: 14 }}>
                        <RadioButtonGroup name="gender">
                            <RadioButton style={styles.radioButton} value="male" label="男" />
                            <RadioButton style={styles.radioButton} value="female" label="女" />
                        </RadioButtonGroup>
                    </div>
                </Field>
                <Field title="出生年月:">
                    <SelectField maxHeight={300} style={{ width: 120 }}>{years}</SelectField>
                    <span style={{ verticalAlign: '16px', fontSize: 18, margin: '0 10px' }}>年</span>
                    <SelectField maxHeight={300} style={{ width: 120 }}>{months}</SelectField>
                    <span style={{ verticalAlign: '16px', fontSize: 18, marginLeft: '10px' }}>月</span>
                </Field>
                <Field title="专业:">
                    <AutoComplete
                        hintText="请输入或选择你的专业"
                        dataSource={[1,2,3,4,5]}
                        fullWidth={true}
                    />
                </Field>
                <Field title="兴趣领域:">
                    <div style={{ padding: '4px 0 15px 0' }}>{interests}</div>
                </Field>
            </div>
        )
    }
}

export default Main
