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
    }
}

const numtoitem = i => <MenuItem value={i} key={i} primaryText={i} />

class Main extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div style={styles.container}>
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
                    <div style={{ height: 36, paddingTop: 12 }}>
                        <RadioButtonGroup name="gender">
                            <RadioButton
                                style={{ width: 60, float: 'left' }}
                                value="male"
                                label="男"
                            />
                            <RadioButton
                                style={{ width: 60, float: 'left' }}
                                value="female"
                                label="女"
                            />
                        </RadioButtonGroup>
                    </div>
                </Field>
                <Field title="出生年月:">
                    <SelectField maxHeight={300} style={{ width: 120 }}>
                        {Array(47).fill().map((_,x)=>x+1970).map(numtoitem)}
                    </SelectField>
                    <span style={{ verticalAlign: '16px', fontSize: 18, margin: '0 10px' }}>年</span>
                    <SelectField maxHeight={300} style={{ width: 120 }}>
                        {Array(12).fill().map((_,x)=>x+1).map(numtoitem)}
                    </SelectField>
                    <span style={{ verticalAlign: '16px', fontSize: 18, marginLeft: '10px' }}>月</span>
                </Field>
                <Field title="专业:">
                    <AutoComplete
                        hintText="请输入或选择你的专业"
                        dataSource={[1,2,3,4,5]}
                        fullWidth={true}
                    />
                </Field>
            </div>
        )
    }
}

export default Main
