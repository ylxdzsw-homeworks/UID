import React from 'react'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'
import TextField from 'material-ui/lib/text-field'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'
import RadioButton from 'material-ui/lib/radio-button'
import SelectField from 'material-ui/lib/SelectField'
import MenuItem from 'material-ui/lib/menus/menu-item'
import AutoComplete from 'material-ui/lib/auto-complete'
import LinearProgress from 'material-ui/lib/linear-progress'
import Checkbox from 'material-ui/lib/checkbox'
import Snackbar from 'material-ui/lib/snackbar'

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
    label: {
        fontSize: 18,
        margin: '0 10px',
        lineHeight: '56px'
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
    button: {
        float: 'left',
        textAlign: 'left',
        width: '50%'
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

const formula = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    name: /^[a-zA-Z]{1,12}$/,
    password: /^.{6,18}$/
}
const numtoitem = i => <MenuItem value={i} key={i} primaryText={i} />
const strtoitem = function(i){
    return (
        <Checkbox label={i} key={i} style={styles.checkbox}
            checked={this.state.interest[i]}
            onCheck={(e,v) => {
                this.state.interest[i] = v
                this.setState({interest: this.state.interest})
            }}
        />
    )
}
const years     = Array(47).fill().map((_,x)=>x+1970).map(numtoitem)
const months    = Array(12).fill().map((_,x)=>x+1).map(numtoitem)
const interests = ["IT互联网", "创业", "设计", "体育", "财经", "摄影", "其他"]
const majors    = ["经济学", "金融学", "国际经济与贸易", "法学", "社会学", "思想政治教育", "汉语言文学", "英语", "俄语", "日语", "广告学", "数学与应用数学", "信息与计算科学", "应用物理学", "核物理", "应用化学", "空间科学与技术", "生物技术", "生物信息学", "理论与应用力学", "工程力学", "机械设计制造及其自动化", "材料成型及控制工程", "工业设计", "测控技术与仪器", "材料科学与工程", "材料物理", "材料化学", "高分子材料与工程", "复合材料与工程", "焊接技术与工程", "能源与动力工程", "电气工程及其自动化", "电子信息工程", "电子科学与技术", "通信工程", "光电信息科学与工程", "电子封装技术", "电磁场与无线技术", "电子信息科学与技术", "自动化"]
const actions   = function(i){
    return [
        <FlatButton label="取消" secondary={true} onTouchTap={_=>this.setState({confirming: false})} />,
        <FlatButton label="确定" primary={true} keyboardFocused={true} onTouchTap={_=>document.body.innerHTML = "<h1>提交成功</h1>"} />
    ]
}

class Main extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = this.getInitialState()

        this.validate = this.validate.bind(this)
        this.reset    = this.reset.bind(this)
    }

    getInitialState(lastState) {
        return {
            email: '',
            emailerr: '',
            name: '',
            nameerr: '',
            password: '',
            passworderr: '',
            repassword: '',
            repassworderr: '',
            gender: '',
            year: 0,
            month: 0,
            major: '',
            interest: (_=>{let p={};interests.forEach(x=>p[x]=false);return p})(),
            confirming: false,
            lastState: lastState
        }
    }

    validate() {
        this.setState({
            emailerr: formula.email.test(this.state.email.trim()) && "电子邮箱格式不正确",
            nameerr: formula.name.test(this.state.name.trim()) && "昵称必须全为字母，并且不超过12个字符",
            passworderr: formula.password.test(this.state.password) && "密码长度必须为6-18",
            repassworderr: (this.state.password == this.state.repassword && "两次输入密码不一致")
                           || (formula.password.test(this.state.password) && "密码长度必须为6-18"),
        })
    }

    reset() {
        this.setState(this.getInitialState(this.state))
    }

    finished() {
        return +
            (!this.state.emailerr && !!this.state.email) +
            (!this.state.nameerr && !!this.state.name) +
            (!this.state.passworderr && !!this.state.password) +
            (!this.state.repassworderr && !!this.state.repassword) +
            !!this.state.gender +
            !!(this.state.year && this.state.month) +
             +
            !!this.state.major +
            Object.keys(this.state.interest)
                  .map(x=>this.state.interest[x])
                  .some(x=>x)
    }

    render() {
        return (
            <div style={styles.container}>
                <div style={Object.assign(styles.progress, {display: this.state.confirming ? 'none' : 'block'})}>
                    <span>已完成{this.finished()}/8</span>
                    <LinearProgress mode="determinate" value={this.finished()} min={0} max={8} />
                </div>
                <h1>账号信息:</h1>
                <TextField
                    type="email"
                    style={styles.accountInfo}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelText="邮箱："
                    hintText="请输入email地址"
                    errorText={this.state.email && this.state.emailerr}
                    onChange={e=>this.setState({email: e.target.value})}
                    onFocus={e=>this.setState({emailerr: ''})}
                    onBlur={this.validate}
                    value={this.state.email}
                />
                <TextField
                    type="text"
                    style={styles.accountInfo}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelText="昵称："
                    hintText="昵称由字母组成，长度小于12"
                    errorText={this.state.name && this.state.nameerr}
                    onChange={e=>this.setState({name: e.target.value})}
                    onFocus={e=>this.setState({nameerr: ''})}
                    onBlur={this.validate}
                    value={this.state.name}
                />
                <TextField
                    type="password"
                    style={styles.accountInfo}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelText="密码："
                    hintText="密码长度为6-18"
                    errorText={this.state.password && this.state.passworderr}
                    onChange={e=>this.setState({password: e.target.value})}
                    onFocus={e=>this.setState({passworderr: ''})}
                    onBlur={this.validate}
                    value={this.state.password}
                />
                <TextField
                    type="password"
                    style={styles.accountInfo}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelText="确认密码："
                    hintText="再次输入密码"
                    errorText={this.state.repassword && this.state.repassworderr}
                    onChange={e=>this.setState({repassword: e.target.value})}
                    onFocus={e=>this.setState({repassworderr: ''})}
                    onBlur={this.validate}
                    value={this.state.repassword}
                />
                <div style={styles.clear} />
                <h1 style={{ marginTop: 60 }}>基本信息:</h1>
                <Field title="性别:">
                    <div style={{ height: 36, paddingTop: 14 }}>
                        <RadioButtonGroup name="gender" onChange={(e,v)=>this.setState({gender: v})} valueSelected={this.state.gender}>
                            <RadioButton style={styles.radioButton} value="male" label="男" />
                            <RadioButton style={styles.radioButton} value="female" label="女" />
                        </RadioButtonGroup>
                    </div>
                </Field>
                <Field title="出生年月:">
                    <div style={{ verticalAlign: 'center' }}>
                        <SelectField
                            maxHeight={300}
                            style={{ width: 120, verticalAlign: 'top' }}
                            labelStyle={{ textAlign: 'center' }}
                            value={this.state.year}
                            onChange={(e,i,v)=>this.setState({year: v})}
                        >
                            {years}
                        </SelectField>
                        <span style={styles.label}>年</span>
                        <SelectField
                            maxHeight={300}
                            style={{ width: 120, verticalAlign: 'top' }}
                            labelStyle={{ textAlign: 'center' }}
                            value={this.state.month}
                            onChange={(e,i,v)=>this.setState({month: v})}
                        >
                            {months}
                        </SelectField>
                        <span style={styles.label}>月</span>
                    </div>
                </Field>
                <Field title="专业:">
                    <AutoComplete
                        hintText="请输入或选择你的专业"
                        dataSource={majors}
                        fullWidth={true}
                        filter={(pattern, text)=>text.includes(pattern)}
                        openOnFocus={true}
                        searchText={this.state.major}
                        onUpdateInput={v=>this.setState({major: v})}
                        onNewRequest={v=>this.setState({major: v})}
                    />
                </Field>
                <Field title="兴趣领域:">
                    <div style={{ padding: '4px 0 15px 0' }}>{interests.map(strtoitem.bind(this))}</div>
                </Field>
                <Field title="">
                    <div style={styles.button}>
                        <RaisedButton
                            label="清空"
                            style={{ width: '80%' }}
                            secondary={true}
                            onTouchTap={this.reset}
                        />
                    </div>
                    <div style={styles.button}>
                        <RaisedButton
                            label="提交"
                            style={{ width: '80%' }}
                            primary={true}
                            onTouchTap={_=>this.setState({confirming: true})}
                            disabled={this.finished() < 8}
                        />
                    </div>
                </Field>
                <Snackbar
                    open={Boolean(this.state.lastState)}
                    message="所有字段已清空"
                    action="撤销"
                    autoHideDuration={3000}
                    onActionTouchTap={_=>this.setState(this.state.lastState)}
                    onRequestClose={_=>this.setState({lastState:null})}
                />
                <Dialog
                    title="确认提交"
                    actions={actions.call(this)}
                    modal={true}
                    open={this.state.confirming}
                >
                    是否确认提交当前填写的信息?
                </Dialog>
            </div>
        )
    }
}

export default Main
